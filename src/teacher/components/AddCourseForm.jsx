import React, { useState, useContext } from 'react';
import { InstructorContext } from '../Context/InstructorContext';

function AddCourseForm() {
    const { courses, setCourses } = useContext(InstructorContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [syllabus, setSyllabus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCourse = { id: Date.now(), title, description, syllabus };
        setCourses([...courses, newCourse]);
        setTitle('');
        setDescription('');
        setSyllabus('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Add New Course</h3>
            <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <textarea placeholder="Syllabus" value={syllabus} onChange={(e) => setSyllabus(e.target.value)} required />
            <button type="submit">Add Course</button>
        </form>
    );
}

export default AddCourseForm;
