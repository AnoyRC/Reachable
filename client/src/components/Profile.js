import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Profile = () => {

    const [profile,setProfile] = useState()
    const [bio, setBio] = useState('')
    const [youtube, setYoutube] = useState('')
    const [twitter, setTwitter] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')

    //Get your profile at startup
    useEffect(() => {
        axios.get('http://localhost:5000/api/profile/me',{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        }).then(res => setProfile(res.data))
        .catch(err => console.log(err))        
    },[setProfile])
    
    //Update Bio Data
    useEffect(() => {
        if(profile){
            setBio(profile.bio === undefined ? 'Set Bio' : profile.bio)
            if(profile.socials === undefined){
                setYoutube('Set Youtube Link')
                setTwitter('Set Twitter Link')
                setFacebook('Set Facebook Link')
                setInstagram('Set Instagram Link')
            }
            else{
                setYoutube(profile.socials.youtube === undefined ? 'Set Youtube Link' : profile.socials.youtube)
                setTwitter(profile.socials.twitter === undefined ? 'Set Twitter Link' : profile.socials.twitter)
                setFacebook(profile.socials.facebook === undefined ? 'Set Facebook Link' : profile.socials.facebook)
                setInstagram(profile.socials.instagram === undefined ? 'Set Instagram Link' : profile.socials.instagram)
            }
        }
    },[profile])

    //Update Profile
    async function updateProfile(event){
        event.preventDefault()

        const payload = {
            bio,youtube,twitter,facebook,instagram
        }

        axios.post(`http://localhost:5000/api/profile/`,payload,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        })
        .then(res => setProfile(res.data))
        .catch(err => console.log(err))
    }

    async function deleteProfile(event){
        event.preventDefault()
        
        axios.delete(`http://localhost:5000/api/profile`,{
            headers: {
                'x-auth-token' : localStorage.getItem('x-auth-token')
            }
        })
        .then(await function(res){
            console.log(res)
            alert('Profile Deleted')
            localStorage.removeItem('x-auth-token')
            window.location = '/'
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <form onSubmit={updateProfile}>
            Bio : <input value = {bio} onChange = {(e) => setBio(e.target.value)} type ='text' placeholder={bio} /><br/><br/>
            Youtube Username : <input value = {youtube} onChange = {(e) => setYoutube(e.target.value)} type ='text' placeholder={youtube}/><br/><br/>
            Twitter Username : <input value = {twitter} onChange = {(e) => setTwitter(e.target.value)} type ='text' placeholder={twitter}/><br/><br/>
            Facebook Username : <input value = {facebook} onChange = {(e) => setFacebook(e.target.value)} type ='text' placeholder={facebook} /><br/><br/>
            Instagram Username : <input value = {instagram} onChange = {(e) => setInstagram(e.target.value)} type ='text' placeholder={instagram}/><br/><br/>
            <input type = "submit" value="Update Profile" />
            <button type="button" onClick={deleteProfile}>Delete Profile</button> 
        </form>
    </div>
  )
}

export default Profile