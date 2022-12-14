const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 8 or more characters').isLength({min:8}),
], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try {
        //If user exists
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({ error: [{ msg:'User already exists' }] })
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();

        let profile = new Profile({
            user : user.id,
        })

        await profile.save();

        //Return jsonwebtoken
        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn: 360000
        },(err,token) => {
            if(err) throw err;
            res.json( {token} );
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;