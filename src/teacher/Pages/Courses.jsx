import React, { useContext } from 'react';
import { InstructorContext } from '../Context/InstructorContext';
import AddCourseForm from '../components/AddCourseForm';

function Courses() {
    const { courses } = useContext(InstructorContext);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Manage Courses</h2>
            <AddCourseForm />
            <div>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div key={course.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <small>Syllabus: {course.syllabus}</small>
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
         
        </div>
    );
}

export default Courses;
