import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBell,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaHome,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle
  const [openParent, setOpenParent] = useState(""); // Track dropdown visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleParent = (parentName) => {
    setOpenParent(openParent === parentName ? "" : parentName);
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 text-white h-screen p-4 transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center mb-6 ml-2 text-lg focus:outline-none"
      >
        <FaBars className="mr-2" />
        {isOpen && <span className="ml-1">Menu</span>}
      </button>

      {/* Sidebar Links */}
      <ul className="space-y-4 flex-1 overflow-y-auto">
        {/* Dashboard */}
        <li>
          <Link
            to="/admin"
            className="flex items-center hover:bg-gray-800 p-2 rounded"
          >
            <FaHome className="mr-3" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>

        {/* Course Management */}
        <li>
          <div
            onClick={() => toggleParent("courses")}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <div className="flex items-center">
              <FaBook className="mr-3" />
              {isOpen && <span>Course Management</span>}
            </div>
            {isOpen && (openParent === "courses" ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
          {openParent === "courses" && isOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/courses" className="hover:text-gray-300">
                  View Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/courses/add" className="hover:text-gray-300">
                  Add Course
                </Link>
              </li>
              <li>
                <Link to="/admin/courses/edit" className="hover:text-gray-300">
                  Edit Course
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Student Management */}
        <li>
          <div
            onClick={() => toggleParent("students")}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <div className="flex items-center">
              <FaUserGraduate className="mr-3" />
              {isOpen && <span>Student Management</span>}
            </div>
            {isOpen && (openParent === "students" ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
          {openParent === "students" && isOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/students" className="hover:text-gray-300">
                  View Students
                </Link>
              </li>
              <li>
                <Link to="/admin/students/approve" className="hover:text-gray-300">
                  Approve Enrollment
                </Link>
              </li>
              <li>
                <Link to="/admin/students/merge" className="hover:text-gray-300">
                  Merge Students
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Teacher Management */}
        <li>
          <div
            onClick={() => toggleParent("teachers")}
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-3" />
              {isOpen && <span>Teacher Management</span>}
            </div>
            {isOpen && (openParent === "teachers" ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
          {openParent === "teachers" && isOpen && (
            <ul className="pl-6 space-y-2">
              <li>
                <Link to="/admin/teachers" className="hover:text-gray-300">
                  View Teachers
                </Link>
              </li>
              <li>
                <Link to="/admin/teachers/reports" className="hover:text-gray-300">
                  Teacher Reports
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Notifications */}
        <li>
          <Link
            to="/admin/notifications"
            className="flex items-center hover:bg-gray-800 p-2 rounded"
          >
            <FaBell className="mr-3" />
            {isOpen && <span>Notifications</span>}
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="mt-auto text-sm text-gray-400">
        {isOpen ? <p>Admin Panel © 2024</p> : <span>©</span>}
      </div>
    </div>
  );
};

export default AdminSidebar;
