import React, { useContext, useState } from 'react';
import { InstructorContext } from '../Context/InstructorContext';

const AssignmentManagement = () => {
    const { assignments, addAssignment, deleteAssignment, courses } = useContext(InstructorContext);
    const [newAssignment, setNewAssignment] = useState({ title: '', courseId: '', deadline: '' });

    const handleAddAssignment = () => {
        if (newAssignment.title && newAssignment.courseId && newAssignment.deadline) {
            addAssignment({
                ...newAssignment,
                courseId: parseInt(newAssignment.courseId), // Ensure the courseId matches the type of course.id
            });
            setNewAssignment({ title: '', courseId: '', deadline: '' });
        }
    };

    return (
        <div>
            <h2 style={{fontSize:"20px",fontWeight :"bold", margin:"20px"}}>Assignment Management</h2>
            <div>
                <select
                    value={newAssignment.courseId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Assignment Title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
                <input
                    type="date"
                    value={newAssignment.deadline}
                    onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                />
                <button onClick={handleAddAssignment}>Add Assignment</button>
            </div>

            <h3>Existing Assignments</h3>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>
                        <strong>{assignment.title}</strong> - {assignment.deadline} 
                        (Course: {courses.find((course) => course.id === parseInt(assignment.courseId))?.title || 'Unknown'})
                        <button onClick={() => deleteAssignment(assignment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentManagement;
