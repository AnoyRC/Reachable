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

module.exports = router;

