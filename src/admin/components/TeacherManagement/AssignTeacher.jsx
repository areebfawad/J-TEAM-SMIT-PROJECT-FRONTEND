import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../axiosConfig";

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]); // List of teachers
  const [courses, setCourses] = useState([]); // List of courses
  const [assignments, setAssignments] = useState([]); // Current assignments
  const [selectedTeacher, setSelectedTeacher] = useState(""); // Selected teacher
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch teachers, courses, and assignments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axios.get("http://localhost:3000/teachers");
        const coursesResponse = await axios.get("http://localhost:3000/courses");
        const assignmentsResponse = await axios.get("http://localhost:3000/assignments");

        setTeachers(teachersResponse.data);
        setCourses(coursesResponse.data);
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        toast.error("Failed to load data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle teacher assignment
  const handleAssign = async () => {
    if (!selectedTeacher || !selectedCourse) {
      toast.error("Please select both a teacher and a course.");
      return;
    }

    try {
      const newAssignment = {
        teacherId: selectedTeacher,
        courseId: selectedCourse,
        assignedAt: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/assignments", newAssignment);
      setAssignments([...assignments, { ...newAssignment, id: Date.now() }]);
      toast.success("Teacher assigned successfully!");

      // Reset dropdown selections
      setSelectedTeacher("");
      setSelectedCourse("");
    } catch (error) {
      console.error("Error assigning teacher:", error);
      toast.error("Failed to assign teacher.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <Toaster /> {/* Toast notifications */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Assign Teachers to Courses</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading data...</p>
      ) : (
        <>
          {/* Form to Assign Teacher */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Teacher:
              </label>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Course:
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAssign}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            >
              Assign Teacher
            </button>
          </div>

          {/* Current Assignments */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">Current Assignments</h3>
            {assignments.length > 0 ? (
              <table className="w-full bg-gray-100 rounded shadow">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">Teacher</th>
                    <th className="p-4 text-left">Course</th>
                    <th className="p-4 text-left">Assigned Date</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment) => {
                    const teacher = teachers.find((t) => t.id === assignment.teacherId);
                    const course = courses.find((c) => c.id === assignment.courseId);
                    return (
                      <tr key={assignment.id} className="hover:bg-gray-50">
                        <td className="p-4">{teacher?.name || "Unknown"}</td>
                        <td className="p-4">{course?.name || "Unknown"}</td>
                        <td className="p-4">
                          {new Date(assignment.assignedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No assignments yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AssignTeacher;
