const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../../middlewares/check_auth');
const PostsController = require('../controllers/Posts');

// Get all posts
router.get('/', PostsController.getAllPosts);

// Create a nwe post
router.post('/new', checkAuth, PostsController.createNewPost);

// Get one post by id
router.get('/get/:id', PostsController.getPostById);

// Delete post 
router.delete('/delete/:id', checkAuth, PostsController.deletePost);

// Update post 
router.patch('/update/:id', checkAuth, PostsController.updatePost);

module.exports = router;