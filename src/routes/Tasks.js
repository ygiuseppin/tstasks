const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../middlewares/check_auth');
const TasksController = require('../controllers/Tasks');

// Get all posts
router.get('/', TasksController.getAllTasks);

// Create a nwe post
router.post('/new', checkAuth, TasksController.createNewTask);

// Get one post by id
router.get('/get/:id', TasksController.getTaskById);

// Delete post 
router.delete('/delete/:id', checkAuth, TasksController.deleteTask);

// Update post 
router.patch('/update/:id', checkAuth, TasksController.updateTask);

module.exports = router;