import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://blog-app-api-mu.vercel.app/posts/${id}`
      const options = {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      setPost(data);
    };

    fetchPosts();
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (

    <div className='post-detail'>
      <Header/>
      <div className='post-card'> <h2>{post.title}</h2>
        <p>{post.content}</p></div>
      <Footer/>
    </div>

  );
}

export default PostDetail;
