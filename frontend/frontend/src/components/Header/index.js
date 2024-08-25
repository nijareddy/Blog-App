import React from 'react';
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom';
import './index.css'


function Header() {

  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <div className='header'>
      <h1 className='heading'>My Blog</h1>
      <div className='tab-cont'> 
        <Link to='/create-post'> <button className='tab-btn' >Create Post</button></Link>
        <Link to='/'> <button className='tab-btn' >Posts</button></Link>
        <button className='logout-btn' onClick={handleLogout}>Logout</button></div>

    </div>
  );
}

export default Header;