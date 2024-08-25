import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header';
import Footer from '../Footer'

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, content };
    const jwtToken = Cookies.get('jwt_token')
    
    let response

    if (id) {

      response= await fetch(`http://localhost:3004/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${jwtToken}` },
        body: JSON.stringify(postData)
      });
    } else {
      console.log('hey')
     response= await fetch('http://localhost:3004/posts',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'authorization':`Bearer ${jwtToken}`},
        body: JSON.stringify(postData),
      });
     
    }
    navigate('/')
    const data=await response.json()
    console.log(data)
    setData(data)
    setTitle('')
    setContent('')
  };

  return (
    <div className='create-post'>
      <Header />
      <div className='form-card'>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor="title" className='label-ele'>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input-box'
          />
          <label htmlFor="content" className='label-ele'>Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='input-box'
          />
          <button type="submit" className='logout-btn btn'>{id ? 'Update Post' : 'Create Post'}</button>
          <p>{data}</p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default PostForm;