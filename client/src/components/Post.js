import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';

const Post = (props) => {
    const post = props.post
    const [likes, setLikes] = useState(post.likes)
    const [comment , setComment] = useState()
    const [showComment , setShowComment] = useState(false)
    const [newComment , setNewComment] = useState('')

    useEffect(()=>{
        setComment(post.comments);
    },[post.comments])

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
        event.preventDefault()
        setShowComment(!showComment);

    }

    async function deletePost(event){
        
    }

    async function postComment(event){
        event.preventDefault()

        const payload = {
            "text" : newComment
        }

        axios.post(`http://localhost:5000/api/posts/comment/${post._id}`,payload,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => setComment(res.data))
        .catch(err => console.log(err))

        setShowComment(true)
    }

    async function deleteComment(event , commentId){
        event.preventDefault()

        axios.delete(`http://localhost:5000/api/posts/comment/${post._id}/${commentId}`,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => setComment(res.data))
        .catch(err => console.log(err))

    }

  return (
    <Fragment>
        <hr/>
            {post.text}
        <hr/>
        <button type="button" onClick={likePost}>Like</button> 
        <p>{likes && likes.length} likes</p>
        <button type="button" onClick={commentPost}>Comment</button> 
        <button type="button" onClick={deletePost}>Delete</button> 
        <form onSubmit={postComment}>
                <input value = {newComment} onChange = {(e) => setNewComment(e.target.value)} type ='text' placeholder='Say something'/>
                <input type = "submit" value="Comment" />
        </form>
        {comment && showComment && 
        <ul>
            {comment.map((comment,index) => <Fragment key={index}>
                    <li>{comment.text}</li>
                    <button type="button" onClick={(e) => deleteComment(e,comment._id)}>Delete</button> 
                </Fragment>
            )}
        </ul>
        }
    </Fragment>
  )
}

export default Post