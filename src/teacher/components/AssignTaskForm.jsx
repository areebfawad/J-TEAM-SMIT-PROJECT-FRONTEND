import React, { useState, useContext } from 'react';
import { TaskContext } from './Context/TaskContext';

function AssignTaskForm() {
    const { addTask } = useContext(TaskContext); // Access the addTask function
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedStudents, setAssignedStudents] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            deadline,
            assignedStudents,
        };
        addTask(newTask); // Save task in context
        setTitle('');
        setDescription('');
        setDeadline('');
        setAssignedStudents([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Assign Task</h3>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <button type="submit">Assign Task</button>
        </form>
    );
}

export default AssignTaskForm;
