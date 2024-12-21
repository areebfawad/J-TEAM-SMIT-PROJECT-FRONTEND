import React from 'react';
import DashboardCard from '../components/DashboardCard';
import CourseManagement from '../components/CourseManagement';
import AssignmentManagement from '../components/AssignmentManagement';
import SubmissionsManagement from '../components/SubmissionsManagement';
import MonthlyReport from '../components/MonthlyReport';
import Notifications from '../components/Notifications';

function Dashboard() {
    const data = [
        { title: 'Total Courses', count: 5 },
        { title: 'Enrolled Students', count: 120 },
        { title: 'Assignments Uploaded', count: 15 },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {data.map((item, index) => (
                    <DashboardCard key={index} title={item.title} count={item.count} />
                ))}
            </div>
            <CourseManagement />
            <AssignmentManagement />
            <SubmissionsManagement />
            <MonthlyReport />
            <Notifications />
        </div>
    );
}

export default Dashboard;
