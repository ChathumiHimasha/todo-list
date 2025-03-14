const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({ 
    task: { type: String, required: true },
    done: { type: Boolean, default: false }
}, { timestamps: true }); // Adds createdAt & updatedAt fields

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
