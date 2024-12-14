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
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State for sidebar toggle
  const [openParent, setOpenParent] = useState(""); // State for parent-child dropdown

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
      {/* Toggle Sidebar Button */}
      <button
        className="text-xl mb-6 focus:outline-none flex items-center"
        onClick={toggleSidebar}
      >
        <FaBars className="mr-2" />
        <span className={isOpen ? "block" : "hidden"}>Menu</span>
      </button>

      {/* Sidebar Header */}
      <h2
        className={`text-2xl font-bold mb-6 flex items-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        Admin Panel
      </h2>

      {/* Sidebar Options */}
      <ul className="space-y-4">
        {/* Course Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
            onClick={() => toggleParent("courses")}
          >
            <div className="flex items-center">
              <FaBook className="text-lg mr-3" />
              <span className={isOpen ? "block" : "hidden"}>
                Course Management
              </span>
            </div>
            {isOpen &&
              (openParent === "courses" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              ))}
          </div>
          {openParent === "courses" && isOpen && (
            <ul className="pl-8 space-y-2">
              <li className="hover:text-gray-300">
                <Link to="/admin/courses">View Courses</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/admin/courses/add">Add Course</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Student Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
            onClick={() => toggleParent("students")}
          >
            <div className="flex items-center">
              <FaUserGraduate className="text-lg mr-3" />
              <span className={isOpen ? "block" : "hidden"}>
                Student Management
              </span>
            </div>
            {isOpen &&
              (openParent === "students" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              ))}
          </div>
          {openParent === "students" && isOpen && (
            <ul className="pl-8 space-y-2">
              <li className="hover:text-gray-300">
                <Link to="/admin/students">View Students</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/admin/students/merge">Merge Students</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/admin/students/approve">Approve Enrollments</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Teacher Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded"
            onClick={() => toggleParent("teachers")}
          >
            <div className="flex items-center">
              <FaChalkboardTeacher className="text-lg mr-3" />
              <span className={isOpen ? "block" : "hidden"}>
                Teacher Management
              </span>
            </div>
            {isOpen &&
              (openParent === "teachers" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              ))}
          </div>
          {openParent === "teachers" && isOpen && (
            <ul className="pl-8 space-y-2">
              <li className="hover:text-gray-300">
                <Link to="/admin/teachers">View Teachers</Link>
              </li>
              <li className="hover:text-gray-300">
                <Link to="/admin/teachers/reports">Teacher Reports</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Notifications */}
        <li className="hover:bg-gray-800 p-2 rounded">
          <Link to="/admin/notifications" className="flex items-center">
            <FaBell className="text-lg mr-3" />
            <span className={isOpen ? "block" : "hidden"}>Notifications</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
