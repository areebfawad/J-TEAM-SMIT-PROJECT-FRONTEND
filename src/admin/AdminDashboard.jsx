import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalAssignments: 0,
    totalQuizzes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, coursesRes, assignmentsRes, quizzesRes] = await Promise.all([
          axios.get("/api/students"),
          axios.get("/api/teachers"),
          axios.get("/api/courses"),
          axios.get("/api/assignments"),
          axios.get("/api/quizzes"),
        ]);

        setData({
          totalStudents: studentsRes.data.length,
          totalTeachers: teachersRes.data.length,
          totalCourses: coursesRes.data.length,
          totalAssignments: assignmentsRes.data.length,
          totalQuizzes: quizzesRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching data:", err.response || err.message);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-100 p-4 rounded">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>
              <p className="text-gray-600">Overview of recent activities.</p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard title="Total Students" value={data.totalStudents} color="green" />
              <DashboardCard title="Total Teachers" value={data.totalTeachers} color="blue" />
              <DashboardCard title="Total Courses" value={data.totalCourses} color="orange" />
              <DashboardCard title="Total Assignments" value={data.totalAssignments} color="red" />
              <DashboardCard title="Total Quizzes" value={data.totalQuizzes} color="purple" />
            </div>

            {/* Render Child Components */}
            <Outlet />
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color }) => (
  <div
    className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105`}
  >
    <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
    <p className={`text-3xl font-bold text-${color}-500`}>{value}</p>
  </div>
);

export default AdminDashboard;
