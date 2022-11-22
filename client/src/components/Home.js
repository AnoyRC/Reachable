import React, { Fragment, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Post from './Post'


const Home = () => {
    //Log In status
    const [status , setStatus] = useState(false);
    const [posts ,setPosts] = useState()
    const [newPost ,setNewPost] = useState('')

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

    //Add Post
    async function addPost(event){
        event.preventDefault()
        const payload = {
            "text" : newPost
        }

        axios.post(`http://localhost:5000/api/posts/`,payload,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => setPosts(res.data))
        .catch(err => console.log(err))

        
    }

  return (
    <div>
        <form onSubmit={addPost}>
                <input value = {newPost} onChange = {(e) => setNewPost(e.target.value)} type ='text' placeholder='Add a Post'/>
                <input type = "submit" value="Add" />
        </form>
        {status && posts && 
        <Fragment>
            {posts.map((post,index) => <li key={index}><Post post = {post} /></li>)}
        </Fragment>} 
    </div>
  )
}


export default Home