
import React, { useState, useEffect } from 'react';

import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import Cookies from 'js-cookie'
import PostCard from '../PostCard'


function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'http://localhost:3004/posts'
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
      setPosts(data);
    };

    fetchPosts();
  }, [posts]);
  useEffect(() => {
    const fetchPosts = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = 'http://localhost:3004/posts'
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
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className='post-list'>
      <Header />
      <div className='posts'>
        <h2 className='heading'>Posts</h2>
        <ul className='list'>
          {posts.map((eachItem) => (
             <PostCard eachItem={eachItem}/>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default PostList;