const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Get all tasks
app.get('/get', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update (toggle done status)
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await TodoModel.findById(id);
        if (!todo) return res.status(404).json({ error: "Task not found" });

        todo.done = !todo.done; // Toggle the 'done' status
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await TodoModel.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: "Task not found" });

        res.json({ message: "Task deleted", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new task
app.post('/add', async (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === "") {
        return res.status(400).json({ error: "Task cannot be empty" });
    }
    try {
        const newTask = await TodoModel.create({ task, done: false });
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
