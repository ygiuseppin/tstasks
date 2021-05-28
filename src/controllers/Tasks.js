const Task = require('../models/Tasks');

exports.getAllTasks = async (req, res) => {
    try {
        const filter = { owner: req.userData.userId };

        // Query params
        if (req.query.completed) {
            filter.completed = req.query.completed;
        }
        let sort = req.query.sort || '-completed';
        let limit = parseInt(req.query.limit) || 100;

        // Find in DB
        const tasks = await Task.find(filter)
            .sort(sort)
            .limit(limit)
            .select('-owner')
            .exec();

        // Format
        const formatTasks = tasks.map(t => {
            return {
                id: t._id,
                title: t.title,
                description: t.description,
                created: t.created,
                expires: t.expires,
                completed: t.completed
            }
        });

        res.json(formatTasks);    
    } catch(err) {
        res.status(500).send({error: err});
    }            
}

exports.createNewTask = async (req, res) => {
    try {
        if(!req.body.title) {
            res.status(400).send({error: "Bad request: title is required"});
        }

        const taskInfo = {
            title: req.body.title,
            owner: req.userData.userId,
            completed: false,
            created: new Date(),
            description: req.body.description || null,
            expires: req.body.expires ? new Date(req.body.expires) : null
        };

        const newTask = new Task(taskInfo);
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