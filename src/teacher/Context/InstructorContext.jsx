import React, { createContext, useState } from 'react';

export const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [students, setStudents] = useState([
        {name:"Ali",email:"ali@gmail.com"},
        {name:"All",email:"all@gmail.com"}
    ]);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { ...notification, id: Date.now(), date: new Date().toLocaleString() },
        ]);
    };
    const deleteNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };
    
    

    // Add a new course
    const addCourse = (course) => {
        setCourses((prevCourses) => [...prevCourses, { ...course, id: Date.now() }]);
    };

    // Update an existing course
    const updateCourse = (id, updatedData) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) => (course.id === id ? { ...course, ...updatedData } : course))
        );
    };

    // Delete a course
    const deleteCourse = (id) => {
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    };

    // Add a new assignment
    const addAssignment = (assignment) => {
        setAssignments((prevAssignments) => [...prevAssignments, { ...assignment, id: Date.now() }]);
    };

    // Delete an assignment
    const deleteAssignment = (id) => {
        setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment.id !== id));
    };

    return (
        <InstructorContext.Provider
            value={{
                courses,
                setCourses,
                addCourse,
                updateCourse,
                deleteCourse,
                assignments,
                setAssignments,
                addAssignment,
                deleteAssignment,
                students,
                setStudents,
                notifications,
                addNotification,
                deleteNotification,
            }}
        >
            {children}
        </InstructorContext.Provider>
    );
};
