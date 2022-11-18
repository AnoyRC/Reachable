import React , {useState} from 'react'
import axios from 'axios';

export default function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState();

    async function registerUser(event){
        event.preventDefault()
        console.log("Register")

        const payload = {
            name,email,password
        }


        axios.post('http://localhost:5000/api/users',payload)
        .then( res => console.log(res))
        .catch(function(err){
            if(Array.isArray(err.response.data.errors)){
                setErrorMessage(err.response.data.errors)
            }
            else{
                setErrorMessage(err.response.data.error)
            }
        })
    }

   

  return (
    <div>
        <h1> Register </h1>
        <form onSubmit={registerUser}>
            <input value = {name} onChange = {(e) => setName(e.target.value)} type ='text' placeholder='Name'/>
            <input value = {email} onChange = {(e) => setEmail(e.target.value)} type ='text' placeholder='Email'/>
            <input value = {password} onChange = {(e) => setPassword(e.target.value)} type ='text' placeholder='Password'/>
            <input type = "submit" value="Register" />
        </form>
        {errorMessage && 
        <div>
            {errorMessage.map(error => <li>{error.msg}</li>)} 
        </div>}
    </div>
  )
}
