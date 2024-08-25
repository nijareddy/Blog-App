
import React from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import './index.css'

const PostCard = ({ eachItem }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/create-post/${eachItem.id}`)
    }
   const handleDelete= async () => {
    const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://blog-app-api-mu.vercel.app/posts/${eachItem.id}`
      const options = {
        method: 'DELETE',
        headers:
        {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${jwtToken}`,
        },
      }
      await fetch(apiUrl, options);
   }
    return (

        <li key={eachItem.id} className='post-item'>
            <div className='title-card'>
                <h3 className='card-title'>{eachItem.title}</h3>
                <p className='card-content'>Created at {eachItem.created_at}</p>
            </div>
            <hr className='seperator' />
            <Link to={`/posts/${eachItem.id}`} className='link'>
                <p className='card-content'>{eachItem.content.slice(0, 150)}...<span >Read More</span></p>
            </Link>
            <div className='title-card'>
                <button className='logout-btn' onClick={handleClick}>Update Post</button>
                <button className='delete-btn' onClick={handleDelete}><MdDelete/></button>
            </div>

        </li>

    )
}

export default PostCard
