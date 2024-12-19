import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBell,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle
  const [hovered, setHovered] = useState(false); // Hover state for auto-slide
  const [openParent, setOpenParent] = useState(""); // Track dropdown visibility
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Show logout confirmation popup
  const navigate = useNavigate(); // For navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleParent = (parentName) => {
    setOpenParent(openParent === parentName ? "" : parentName);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage
    setShowLogoutPopup(false); // Close popup
    navigate("/"); // Redirect to login page
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setIsOpen(true); // Auto-expand on hover
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setIsOpen(false); // Auto-collapse when hover ends
  };

  return (
    <div
      className={`flex h-screen`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white transition-all duration-300 ease-in-out flex flex-col fixed h-full z-50`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white m-auto py-2 mt-4 p-2 rounded-full hover:bg-gray-600"
        >
          <FaBars />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center py-6">
          {isOpen ? (
            <h2 className="text-2xl font-bold tracking-wider">Admin Panel</h2>
          ) : (
            <MdAdminPanelSettings size={24} />
          )}
        </div>

        {/* Sidebar Links */}
        <ul className="flex-1 overflow-y-auto space-y-4">
          {/* Dashboard */}
          <li>
            <Link
              to="/admin"
              className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 ease-in-out"
            >
              <FaHome className="text-lg ml-2" />
              {isOpen && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>

          {/* Course Management */}
          <li>
            <div
              onClick={() => toggleParent("courses")}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center">
                <FaBook className="text-lg ml-2" />
                {isOpen && <span className="ml-3">Course Management</span>}
              </div>
              {isOpen &&
                (openParent === "courses" ? <FaChevronUp /> : <FaChevronDown />)}
            </div>
            {openParent === "courses" && isOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/courses"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
                    View Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/courses/add"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
                    Add Course
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/courses/edit"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
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
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center">
                <FaUserGraduate className="text-lg m-2" />
                {isOpen && <span className="ml-3">Student Management</span>}
              </div>
              {isOpen &&
                (openParent === "students" ? <FaChevronUp /> : <FaChevronDown />)}
            </div>
            {openParent === "students" && isOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/students"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
                    View Students
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/students/approve"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
                    Approve Enrollment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/students/merge"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
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
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center">
                <FaChalkboardTeacher className="text-lg m-2" />
                {isOpen && <span className="ml-3">Teacher Management</span>}
              </div>
              {isOpen &&
                (openParent === "teachers" ? <FaChevronUp /> : <FaChevronDown />)}
            </div>
            {openParent === "teachers" && isOpen && (
              <ul className="pl-6 space-y-2">
                <li>
                  <Link
                    to="/admin/teachers"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
                    View Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/teachers/reports"
                    className="flex items-center p-2 hover:text-gray-300 transition-transform duration-200 ease-in-out"
                  >
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
              className="flex items-center hover:bg-gray-700 p-3 rounded-lg transition-all duration-200 ease-in-out"
            >
              <FaBell className="text-lg m-2" />
              {isOpen && <span className="ml-3">Notifications</span>}
            </Link>
          </li>
        </ul>

        {/* Logout */}
        <div className="mt-auto flex items-center justify-center py-4">
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="flex items-center text-red-500 hover:text-red-400 transition-all"
          >
            <FaSignOutAlt className="mr-2" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Logout Confirmation Popup */}
        {showLogoutPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
              <h2 className="text-lg text-black font-semibold mb-4">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-around">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={() => setShowLogoutPopup(false)} // Close popup
                  className="bg-gray-300 px-8 py-2 rounded hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Wrapper */}
      <div
        className={`flex-1 ml-${isOpen ? "64" : "16"} transition-all duration-300`}
      >
        {/* Add Content Here */}
      </div>
    </div>
  );
};

export default AdminSidebar;
