import React, { useState } from 'react';
import axios from 'axios';

function Create({ fetchTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return; // Prevent empty tasks
    
    axios.post('http://localhost:3001/add', { task })
      .then(() => {
        setTask("");  // Clear input after adding
        fetchTodos(); // Update the task list in Home.js
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='create_form'>
      <input 
        type="text"  
        placeholder='Enter Task' 
        value={task}
        onChange={(e) => setTask(e.target.value)}
      /> 
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
