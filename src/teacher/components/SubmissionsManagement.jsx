import React, { useContext, useState } from 'react';
import { TaskContext } from '../Context/TaskContext';

const SubmissionsManagement = () => {
    const { } = useContext(TaskContext);
    const {tasks, submissions, updateSubmission } = useContext(TaskContext);
    const [editingSubmission, setEditingSubmission] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [grade, setGrade] = useState('');

    const handleEdit = (submission) => {
        setEditingSubmission(submission);
        setFeedback(submission.feedback || '');
        setGrade(submission.grade || '');
    };

    const handleSave = () => {
        if (editingSubmission) {
            updateSubmission(editingSubmission.id, grade, feedback);
            setEditingSubmission(null);
            setFeedback('');
            setGrade('');
        }
    };

    return (
        <div>
            <h2 style={{fontSize:"20px",
                fontWeight :"bold", margin:"20px"}}
                >Submissions Manage</h2>
            <ul>
            {submissions.map((submission) => {
                    const task = tasks.find((task) => task.id === submission.taskId);

                    return (
                        <li key={submission.id}>
                            <p><strong>Task:</strong> {task ? task.title : 'Unknown Task'}</p>
                            <p><strong>Student:</strong> {submission.student}</p>
                            <p><strong>Grade:</strong> {submission.grade || 'Not graded yet'}</p>
                            <p><strong>Feedback:</strong> {submission.feedback || 'No feedback yet'}</p>
                            <button>Edit</button>
                        </li>
                    );    })}
            </ul>

            {editingSubmission && (
                <div>
                    <h3>Grading Submission</h3>
                    <p>
                        <strong>Task:</strong> {editingSubmission.taskTitle}
                    </p>
                    <input
                        type="text"
                        placeholder="Grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                    <textarea
                        placeholder="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingSubmission(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default SubmissionsManagement;
