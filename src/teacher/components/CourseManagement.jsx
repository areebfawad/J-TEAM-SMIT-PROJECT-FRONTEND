import React, { useContext, useState } from 'react';
import { InstructorContext } from '../Context/InstructorContext';

const CourseManagement = () => {
    const { courses, addCourse, updateCourse, deleteCourse } = useContext(InstructorContext);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', syllabus: '' });

    const handleAddCourse = () => {
        if (newCourse.title && newCourse.description) {
            addCourse(newCourse);
            setNewCourse({ title: '', description: '', syllabus: '' });
        }
    };

    const handleUpdateCourse = (id) => {
        const updatedTitle = prompt('Enter new course title:');
        if (updatedTitle) {
            updateCourse(id, { title: updatedTitle });
        }
    };

    return (
        <div >
            <h2 style={{fontSize:"20px",fontWeight :"bold"}}>Course Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <textarea
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
                <button onClick={handleAddCourse}>Add Course</button>
            </div>

            <h3>Existing Courses</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <strong>{course.title}</strong>
                        <p>{course.description}</p>
                        <button onClick={() => handleUpdateCourse(course.id)}>Edit</button>
                        <button onClick={() => deleteCourse(course.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
