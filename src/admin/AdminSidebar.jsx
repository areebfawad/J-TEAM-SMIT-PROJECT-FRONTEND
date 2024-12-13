import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        isOpen ? "w-64" : "w-16"
      } bg-gray-900 text-white h-screen p-4 transition-all duration-300 flex flex-col`}
    >
      <button
        className="text-xl mb-6 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? "←" : "→"}
      </button>
      <h2
        className={`text-2xl font-bold mb-6 ${
          isOpen ? "block" : "hidden"
        } transition-all`}
      >
        Admin Panel
      </h2>
      <ul className="space-y-4">
        {/* Course Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleParent("courses")}
          >
            <span className={isOpen ? "block" : "hidden"}>Course Management</span>
            {isOpen && <span>{openParent === "courses" ? "▲" : "▼"}</span>}
          </div>
          {openParent === "courses" && isOpen && (
            <ul className="pl-4 space-y-2">
              <li>
                <Link to="/admin/courses">View Courses</Link>
              </li>
              <li>
                <Link to="/admin/courses/add">Add Course</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Student Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleParent("students")}
          >
            <span className={isOpen ? "block" : "hidden"}>
              Student Management
            </span>
            {isOpen && <span>{openParent === "students" ? "▲" : "▼"}</span>}
          </div>
          {openParent === "students" && isOpen && (
            <ul className="pl-4 space-y-2">
              <li>
                <Link to="/admin/students">View Students</Link>
              </li>
              <li>
                <Link to="/admin/students/merge">Merge Students</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Teacher Management */}
        <li>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleParent("teachers")}
          >
            <span className={isOpen ? "block" : "hidden"}>
              Teacher Management
            </span>
            {isOpen && <span>{openParent === "teachers" ? "▲" : "▼"}</span>}
          </div>
          {openParent === "teachers" && isOpen && (
            <ul className="pl-4 space-y-2">
              <li>
                <Link to="/admin/teachers">View Teachers</Link>
              </li>
              <li>
                <Link to="/admin/teachers/reports">View Reports</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Notifications */}
        <li>
          <Link to="/admin/notifications">
            <span className={isOpen ? "block" : "hidden"}>
              Notifications
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
