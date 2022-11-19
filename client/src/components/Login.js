import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [token,setToken] = useState('')

    //Delay function
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    //loginUser Post Route
    async function loginUser(event){
        event.preventDefault()
        console.log("Login")

        const payload = {
            email,password
        }

        
        axios.post('http://localhost:5000/api/auth',payload)
        .then(await function(res){
            setToken(res.data.token)
        })
        .catch(function(err){
            if(Array.isArray(err.response.data.errors)){
                setErrorMessage(err.response.data.errors)
            }
            else{
                setErrorMessage(err.response.data.error)
            }
        })
    }

    //Set Token
    useEffect(() =>{
        if(token){
            localStorage.setItem('x-auth-token',token)
            setErrorMessage('')
            alert('Login Sucessful')
            window.location.href ='/home'
        }
    },[token])

    //Delete Errors after delay
    useEffect(() =>{
        async function removeErrors(){
            await delay(5000)
            setErrorMessage('')
        }

        removeErrors()
    },[errorMessage])

return (
    <div>
        <h1> Login </h1>
        <form onSubmit={loginUser}>
            <input value = {email} onChange = {(e) => setEmail(e.target.value)} type ='text' placeholder='Email'/>
            <input value = {password} onChange = {(e) => setPassword(e.target.value)} type ='text' placeholder='Password'/>
            <input type = "submit" value="Login" />
        </form>

        {errorMessage && 
        <div>
            {errorMessage.map(error => <li>{error.msg}</li>)} 
        </div>}
    </div>
  )
}
