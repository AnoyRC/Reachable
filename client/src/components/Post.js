import React, {  useState } from 'react'
import axios from 'axios';

const Post = (props) => {
    const post = props.post
    const [likes, setLikes] = useState(post.likes)

    async function likePost(event){
        event.preventDefault()

        axios.put(`http://localhost:5000/api/posts/like/${post._id}`,{},{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        })
        .then(res => setLikes(res.data))
        .catch(err => console.log(err))
       
    }

    async function commentPost(event){
        
    }

    async function deletePost(event){
        
    }

  return (
    <div>
        <hr/>
            {post.text}
        <hr/>
        <button type="button" onClick={likePost}>Like</button> 
        <p>{likes && likes.length} likes</p>
        <button type="button" onClick={commentPost}>Comment</button> 
        <button type="button" onClick={deletePost}>Delete</button> 
    </div>
  )
}

export default Post