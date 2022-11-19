import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";


const Home = () => {
    //Log In status
    const [status , setStatus] = useState(false);

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

  return (
    <div>
        {status && <h1> Logged In </h1> }
    </div>
  )
}


export default Home