import React, { useState, useContext } from 'react';
import { InstructorContext } from '../Context/InstructorContext';

function AddAssignmentForm() {
    const { assignments, setAssignments } = useContext(InstructorContext);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAssignment = { id: Date.now(), title, deadline };
        setAssignments([...assignments, newAssignment]);
        setTitle('');
        setDeadline('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Add New Assignment</h3>
            <input type="text" placeholder="Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            <button type="submit">Add Assignment</button>
        </form>
    );
}

export default AddAssignmentForm;
