import React, { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';
import jsPDF from 'jspdf';

const MonthlyReport = () => {
    const { generateReportData } = useContext(TaskContext);

    const handleGeneratePDF = () => {
        const reportData = generateReportData();

        // Initialize jsPDF
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text('Monthly Class Report', 10, 10);

        // Add content
        doc.setFontSize(12);
        doc.text(`Total Tasks: ${reportData.totalTasks}`, 10, 20);
        doc.text(`Total Submissions: ${reportData.totalSubmissions}`, 10, 30);
        doc.text(`Graded Submissions: ${reportData.gradedSubmissions}`, 10, 40);
        doc.text(`Ungraded Submissions: ${reportData.ungradedSubmissions}`, 10, 50);
        doc.text(`Average Grade: ${reportData.averageGrade}`, 10, 60);

        // Save PDF
        doc.save('Monthly_Class_Report.pdf');
    };

    return (
        <div>
            <h2 style={{fontSize:"20px",fontWeight:"bold",margin:"20px"}}>Generate Monthly Report</h2>
            <button onClick={handleGeneratePDF}>Download PDF Report</button>
        </div>
    );
};

export default MonthlyReport;
