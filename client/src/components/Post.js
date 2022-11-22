import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';

const Post = (props) => {
    const post = props.post
    const [likes, setLikes] = useState(post.likes)
    const [comment , setComment] = useState()
    const [showComment , setShowComment] = useState(false)
    const [newComment , setNewComment] = useState('')

    //Update Likes on startup/DOM reset
    useEffect(()=>{
        setLikes(post.likes);
    },[post.likes])
   
    //Update Comment on startup/DOM reset
    useEffect(()=>{
        setComment(post.comments);
    },[post.comments])

    //Like/Unlike Post
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

    //Show Comments
    async function commentPost(event){
        event.preventDefault()
        setShowComment(!showComment);

    }

    //Delete Post
    async function deletePost(event){
        event.preventDefault()
        
        axios.delete(`http://localhost:5000/api/posts/${post._id}`,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        })
        .then(await function(res){
            console.log(res)
            alert('Post Deleted')
            window.location = '/Home'
        })
        .catch(err => console.log(err))
        
    }

    //Post Comment
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

    //Delete Comment
    async function deleteComment(event , commentId){
        event.preventDefault()

        await axios.delete(`http://localhost:5000/api/posts/comment/${post._id}/${commentId}`,{
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
                    <button type="button" onClick={((e) => deleteComment(e,comment._id))}>Delete</button> 
                </Fragment>
            )}
        </ul>
        }
    </Fragment>
  )
}

export default Post