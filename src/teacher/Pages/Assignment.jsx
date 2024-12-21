import React, { useContext } from 'react';
import { InstructorContext } from '../Context/InstructorContext';
import AddAssignmentForm from '../components/AddAssignmentForm';

function Assignments() {
    const { assignments } = useContext(InstructorContext);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Manage Assignments</h2>
            <AddAssignmentForm />
            <div>
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <div key={assignment.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                            <h3>{assignment.title}</h3>
                            <p>Deadline: {assignment.deadline}</p>
                        </div>
                    ))
                ) : (
                    <p>No assignments available.</p>
                )}
            </div>
        </div>
    );
}

export default Assignments;
