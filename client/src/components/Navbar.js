import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';

const Navbar = () => {

    const [status , setStatus] = useState(false);

    //Logout User
    async function logoutUser(event){
        localStorage.removeItem('x-auth-token');
        window.location = '/login'
    }

    //Check if the user is logged in or redirect to /login
    useEffect(()=>{
        const token = localStorage.getItem('x-auth-token')
        if(token){
            const user = jwt_decode(token);
            if(!user){
                localStorage.removeItem('x-auth-token')
                setStatus(false)
            }
            else{
                setStatus(true);
                console.log(user)
            }
        }else{
            setStatus(false)
        }
    },[])

    const AuthLinks = (
        <ul>
            <h1>Logged In</h1>
            <li>
                <Link to = "/home">Home</Link>
            </li>
            <li>
                <Link to = "/profile">Profile</Link>
            </li>
            <li>
                <a onClick={logoutUser} href = "/login">
                    Logout
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to = "/register">Register</Link>
            </li>
            <li>
                <Link to = "/Login">Login</Link>
            </li>
        </ul>
    )

  return (
    <div>{(status && AuthLinks) || guestLinks}</div>
  )
}

export default Navbar