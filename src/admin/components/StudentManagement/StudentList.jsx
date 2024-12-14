import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]); // List of students
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [studentsPerPage] = useState(5); // Number of students per page
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Delete a student
  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this student?");
      if (!confirmation) return;

      await axios.delete(`/api/students/${id}`);
      alert("Student deleted successfully!");
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  // Search filter
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded shadow">Loading students...</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border w-full p-2 rounded mb-4"
      />

      {/* Student List Table */}
      <table className="w-full bg-gray-100 rounded shadow">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="p-4">{student.id}</td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.email}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
