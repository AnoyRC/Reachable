import React, { Fragment, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Post from './Post'


const Home = () => {
    //Log In status
    const [status , setStatus] = useState(false);
    const [posts ,setPosts] = useState()

    //Check if the user is logged in or redirect to /login
    useEffect(()=>{
        const token = localStorage.getItem('x-auth-token')
        if(token){
            const user = jwt_decode(token);
            if(!user){
                localStorage.removeItem('x-auth-token')
                window.location.href = '/login'
                setStatus(false)
            }
            else{
                setStatus(true);
                console.log(user)
            }
        }else{
            window.location.href = '/login'
            setStatus(false)
        }
    },[])

    //Get All Posts
    useEffect(()=>{
        axios.get('http://localhost:5000/api/posts')
        .then(res=>setPosts(res.data))
        .catch(err => console.log(err))
    },[setPosts])

  return (
    <div>
        {status && posts &&
        <Fragment>
            <h1>Logged In</h1>
            {posts.map((post,index) => <li key={index}><Post post = {post} /></li>)}
        </Fragment>} 
    </div>
  )
}


export default Home