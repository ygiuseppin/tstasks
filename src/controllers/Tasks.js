const Task = require('../models/Tasks');
// const PromClient = require('../utils/prom-client');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.userData.userId });
        // PromClient.counter('getAllTasks', 1, { type: 'get' });
        res.json(tasks);    
    } catch(err) {
        res.status(500).send({error: err});
    }            
}

exports.createNewTask = async (req, res) => {
    try {
        const newTask = new Task({
            content: req.body.content,
            owner: req.userData.userId,
            completed: false,
            created: new Date(),
            expires: new Date(req.body.expires),
        });
        const savedTask = await newTask.save(); 
        res.json({
            message: 'Task created',
            task: savedTask
        });
    } catch(err) {
        res.status(500).send({error: err});
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById({ _id: req.params.id });
        if (!task) {
            res.status(404).send({ message: 'Task not found' });
        } else {
            res.json(task);
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id });
        if (!task) {
            res.status(404).send({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted' });
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.updateOne({ _id: req.params.id }, { $set: req.body });
        if (!task) {
            res.status(404).send({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task updated' });
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
}