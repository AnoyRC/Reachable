const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth')
const config = require('config');

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth , async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',['name','email']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }
        
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// @route   POST api/profile/
// @desc    Update user profile
// @access  Private
router.post('/', auth , async(req,res)=>{
    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.bio) profileFields.bio = req.body.bio;

    profileFields.socials = {}
    if(req.body.youtube) profileFields.socials.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.socials.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.socials.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.socials.instagram = req.body.instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id })
        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate(
                { user : req.user.id },
                { $set : profileFields },
                { new : true }
            ).then(profile => res.json(profile));
        }else{
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server erro')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    get profile by user id
// @access  Public
router.get('/user/:user_id' , async(req,res)=>{
    try {
        const profile = await Profile.findOne({ user : req.params.user_id }).populate('user',['name','email'])

        if(!profile){
            return res.status(400).json({ msg:'Profile not found' })
        }

        res.json(profile)
        
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectID'){
            return res.status(400).json({ msg:'Profile not found' })
        }
        res.status(500).send('Server error')
    }
})


// @route   DELETE api/profile/
// @desc    DELETE user & profile
// @access  Private
router.delete('/', auth , async (req,res)=>{
    try {
        //Delete Profile
        await Profile.findOneAndRemove({ user: req.user.id })
        //Delete User 
        await User.findOneAndRemove({ _id:req.user.id })
        res.json({ msg: 'User removed' })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;

