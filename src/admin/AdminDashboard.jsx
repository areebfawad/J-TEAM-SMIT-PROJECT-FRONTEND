import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaTasks } from "react-icons/fa"; // Icons
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="p-6 bg-white rounded shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Students */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <FaUserGraduate className="text-4xl mb-4" />
              <h2 className="text-lg font-semibold">Total Students</h2>
              <p className="text-3xl font-bold">500</p>
            </div>

            {/* Total Teachers */}
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <FaChalkboardTeacher className="text-4xl mb-4" />
              <h2 className="text-lg font-semibold">Total Teachers</h2>
              <p className="text-3xl font-bold">50</p>
            </div>

            {/* Total Courses */}
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <FaBook className="text-4xl mb-4" />
              <h2 className="text-lg font-semibold">Total Courses</h2>
              <p className="text-3xl font-bold">20</p>
            </div>

            {/* Pending Assignments */}
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <FaTasks className="text-4xl mb-4" />
              <h2 className="text-lg font-semibold">Pending Assignments</h2>
              <p className="text-3xl font-bold">10</p>
            </div>
          </div>
        </div>

        {/* Additional Dashboard Features */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <button className="p-6 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 hover:shadow-2xl transition-all">
              <FaUserGraduate className="text-4xl mb-4" />
              <p>Manage Students</p>
            </button>
            <button className="p-6 bg-indigo-500 text-white rounded-lg shadow-lg hover:bg-indigo-600 hover:shadow-2xl transition-all">
              <FaChalkboardTeacher className="text-4xl mb-4" />
              <p>Manage Teachers</p>
            </button>
            <button className="p-6 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 hover:shadow-2xl transition-all">
              <FaBook className="text-4xl mb-4" />
              <p>Manage Courses</p>
            </button>
            <button className="p-6 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-2xl transition-all">
              <FaTasks className="text-4xl mb-4" />
              <p>Approve Enrollments</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
