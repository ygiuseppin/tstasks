const Post = require('../models/Posts');
const PromClient = require('../utils/prom-client');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        PromClient.counter('getAllPosts', 1, { type: 'get' });
        res.json(posts);    
    } catch(err) {
        console.log()
        res.status(500).send({error: err});
    }            
    
}

exports.createNewPost = async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save(); 
    res.json(savedPost);
}

exports.getPostById = async (req, res) => {
    const post = await Post.findById({ _id: req.params.id });
    res.json(post);
}

exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete({ _id: req.params.id });
    res.json(post);
}

exports.updatePost = async (req, res) => {
    const post = await Post.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(post);
}