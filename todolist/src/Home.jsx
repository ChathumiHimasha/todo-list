import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

function Home() {
    const [todos, setTodos] = useState([]);

    // Fetch todos from backend
    const fetchTodos = useCallback(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Toggle done status
    const handleEdit = (id, done) => {
        axios.put(`http://localhost:3001/update/${id}`, { done: !done }) 
            .then(() => fetchTodos()) // Update state after editing
            .catch(err => console.log(err));
    };

    // Delete task
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => fetchTodos()) // Update state after deletion
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <Create fetchTodos={fetchTodos} />
            {todos.length === 0 ? (
                <div><h2>No Record</h2></div>
            ) : (
                todos.map(todo => (
                    todo._id && (
                        <div className='task' key={todo._id}> 
                            <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                                {todo.done ? (
                                    <BsFillCheckCircleFill className='icon' />
                                ) : (
                                    <BsCircleFill className='icon' />
                                )}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div> 
                            <div>
                                <span onClick={() => handleDelete(todo._id)}>
                                    <BsFillTrashFill className='icon' />
                                </span>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    );
}

export default Home;



