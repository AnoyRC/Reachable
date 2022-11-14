const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/' , [auth, [
    check('text','Text is required').not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text:req.body.text,
            user:req.user.id,
            name:user.name
        })

        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// @route   GET api/posts
// @desc    GET all posts
// @access  public
router.get('/' , async(req,res) =>{
    try {
        const posts = await Post.find().sort({ date:-1 })

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// @route   GET api/posts/:id
// @desc    GET post by ID
// @access  public
router.get('/:id', async(req,res)=>{
    try {
        const post = await Post.findById({ _id:req.params.id})

        if(!post){
            return res.status(404).json({ msg:'Post not found' })
        }

        res.json(post)
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg:'Post not found' })
        }
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  private
router.delete('/:id', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg:'Post not found' })
        }

        //Check User
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "User not authorized" })
        }

        await post.remove();

        res.json({ msg:'Post Removed' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like / Unlike a post
// @access  private
router.put('/like/:id', auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post is already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex,1)
        }
        else{
            post.likes.unshift({ user:req.user.id })
        }

        await post.save();
        
        res.json(post.likes);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


module.exports = router;