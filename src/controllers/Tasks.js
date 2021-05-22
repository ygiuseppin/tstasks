const Task = require('../models/Tasks');
const PromClient = require('../utils/prom-client');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Post.find();
        PromClient.counter('getAllTasks', 1, { type: 'get' });
        res.json(tasks);    
    } catch(err) {
        console.log()
        res.status(500).send({error: err});
    }            
}

exports.createNewTask = async (req, res) => {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save(); 
    res.json(savedTask);
}

exports.getTaskById = async (req, res) => {
    const task = await Task.findById({ _id: req.params.id });
    res.json(task);
}

exports.deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    res.json(task);
}

exports.updateTask = async (req, res) => {
    const task = await Task.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(task);
}