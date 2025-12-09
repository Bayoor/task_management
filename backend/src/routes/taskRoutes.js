const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const transformTask = (task) => {
  const taskObj = task.toObject();
  taskObj.id = taskObj._id.toString();
  delete taskObj._id;
  delete taskObj.__v;
  return taskObj;
};

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    const transformedTasks = tasks.map(transformTask);
    res.json(transformedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(transformTask(task));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const newTask = await task.save();
    res.status(201).json(transformTask(newTask));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    task.updatedAt = new Date().toISOString();

    const updatedTask = await task.save();
    res.json(transformTask(updatedTask));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
