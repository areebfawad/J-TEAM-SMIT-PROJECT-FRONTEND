import React, { createContext, useState } from 'react';

// Create the context
export const TaskContext = createContext();

// TaskContext Provider
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Math Homework', description: 'Complete exercises 1-10' },
        { id: 2, title: 'Science Project', description: 'Prepare a volcano model' },
    ]);
    
    

    const [submissions, setSubmissions] = useState([
        { id: 1, taskId: 1, student: 'John Doe', grade: 85, feedback: 'Good work!' },
        { id: 2, taskId: 2, student: 'Jane Smith', grade: 67, feedback: 'Pass' },
    ]);
    
    

    // Add a new task
    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
    };

    // Add a submission
    const addSubmission = (submission) => {
        setSubmissions((prevSubmissions) => [...prevSubmissions, submission]);
    };

    // Update submission with grade and feedback
    const updateSubmission = (id, grade, feedback) => {
        setSubmissions((prevSubmissions) =>
            prevSubmissions.map((sub) =>
                sub.id === id ? { ...sub, grade, feedback } : sub
            )
        );
    };

    const generateReportData = () => {
        const totalTasks = tasks.length;
        const totalSubmissions = submissions.length;
        const gradedSubmissions = submissions.filter((sub) => sub.grade).length;
        const ungradedSubmissions = totalSubmissions - gradedSubmissions;
        const averageGrade =
            gradedSubmissions > 0
                ? (
                      submissions
                          .filter((sub) => sub.grade)
                          .reduce((sum, sub) => sum + parseFloat(sub.grade), 0) /
                      gradedSubmissions
                  ).toFixed(2)
                : 'N/A';

        return {
            totalTasks,
            totalSubmissions,
            gradedSubmissions,
            ungradedSubmissions,
            averageGrade,
        };
    };
        

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                submissions,
                addSubmission,
                updateSubmission,
                setTasks,
                setSubmissions,
                generateReportData,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
