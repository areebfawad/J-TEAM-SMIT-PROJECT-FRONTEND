import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

function TaskSubmissions() {
    const { submissions, updateSubmission } = useContext(TaskContext);

    const handleGradeChange = (id, grade) => {
        updateSubmission(id, grade, ''); // Update grade only
    };

    const handleFeedbackChange = (id, feedback) => {
        updateSubmission(id, '', feedback); // Update feedback only
    };

    return (
        <div>
            <h2>Task Submissions</h2>
            {submissions.length > 0 ? (
                submissions.map((submission) => (
                    <div key={submission.id}>
                        <h4>Student: {submission.studentName}</h4>
                        <p>Submission Date: {submission.submissionDate}</p>
                        <input
                            type="text"
                            placeholder="Grade"
                            value={submission.grade || ''}
                            onChange={(e) => handleGradeChange(submission.id, e.target.value)}
                        />
                        <textarea
                            placeholder="Feedback"
                            value={submission.feedback || ''}
                            onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                        />
                    </div>
                ))
            ) : (
                <p>No submissions yet.</p>
            )}
        </div>
    );
}

export default TaskSubmissions;
