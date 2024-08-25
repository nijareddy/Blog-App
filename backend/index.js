const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite')
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json())

app.use(cors(
   {
    origin: 'https://blog-app-react-pi-blush.vercel.app', // Replace with your frontend origin
    methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}
));

const dbpath = path.join(__dirname, 'database.db');
let db

// Database connection

const initializeConnection = async () => {

  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database
    })

    app.listen(3004, () => {
      console.log('Server listening at http://localhost:3004');
    });
  }
  catch (e) {
    console.log(`The error message is ${e}`);
  }

}

initializeConnection()







app.post('/register', async (request, response) => {
  const { username, password } = request.body
  const hashedPassword = await bcrypt.hash(password, 10);

  const userExist = `
   SELECT * FROM users WHERE username='${username}';
  `

  const queryRes = await db.get(userExist);


  if (queryRes === undefined) {

    const createUser = `
        INSERT INTO users (username,password)
        VALUES('${username}','${hashedPassword}')
      `
    await db.run(createUser)

    response.send('User created')
  }
  else {
    response.status(400)
    response.send('User already exists')
  }
})


app.post("/login", async (request, response) => {
  const { username, password } = request.body;


  const selectUserQuery = `SELECT * FROM users WHERE username LIKE '${username}'`;

  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(password,
      dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        userId: dbUser.id
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      response.send({ jwtToken });

    } else {
      response.status(400);
      response.send("Invalid Password");

    }
  }
});

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }


  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");

  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");

      } else {
        request.userId = payload.userId;

        next();


      }
    });
  }
};


//Routes


app.get('/posts', authenticateToken, async (request, response) => {
  const userId = request.userId;



  const getQuery = `SELECT * FROM posts WHERE user_id LIKE ${userId};`
  const dbResponse = await db.all(getQuery)

  if (dbResponse) {
    response.send(dbResponse)
  } else {
    response.status(500).send('Internal server error');
  }
});


app.get('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  const userId = req.userId;


  const getQuery = `SELECT * FROM posts WHERE user_id LIKE ${userId} AND id LIKE ${id};`
  const dbResponse = await db.get(getQuery)
  if (dbResponse) {
    res.send(dbResponse)

  } else {
    res.status(500).send('Internal server error');

  }
});

app.post('/posts', authenticateToken, async (req, res) => {
  const userId = req.userId;
  console.log(userId)
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send('Missing title or content');
    return;
  }
  const insertQuery = `INSERT INTO posts (title, content, user_id) VALUES ('${title}','${content}', ${userId});`;

  await db.run(insertQuery)
  res.status(201)
  res.send('Post Created Succesfully')
});

app.put('/posts/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send('Missing title or content');
    return;
  }
  const updateQuery = `UPDATE posts SET title = '${title}', content = '${content}' WHERE id = '${postId}';`

  await db.run(updateQuery);
  res.send('Post updated successfully');

});

app.delete('/posts/:id', authenticateToken,async (req, res) => {
  const { id } = req.params
  const userId = req.userId;
   console.log(id)
   console.log(userId)

  const getQuery = `DELETE FROM posts WHERE user_id LIKE ${userId} AND id LIKE ${id};`
  const dbResponse = await db.run(getQuery)
  if (dbResponse) {
    res.send(dbResponse)

  } else {
    res.status(500).send('Internal server error');

  }
});



