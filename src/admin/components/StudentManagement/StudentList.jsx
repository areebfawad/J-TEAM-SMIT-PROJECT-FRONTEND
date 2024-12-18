import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [viewStudent, setViewStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setStudents(response.data);
      } catch (error) {
        toast.error("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this student?");
    if (!confirmation) return;

    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, {
        name: editName,
        email: editEmail,
      });
      const updatedStudents = students.map((student) =>
        student.id === id ? { ...student, name: editName, email: editEmail } : student
      );
      setStudents(updatedStudents);
      setEditingId(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error("Failed to update student.");
    }
  };

  const handleViewDetails = (student) => {
    setViewStudent(student);
  };

  const closeModal = () => {
    setViewStudent(null);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name && // Ensure name exists
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-6xl mx-auto mt-8">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Student List</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border w-full p-2 rounded mb-4 focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <>
          <table className="w-full bg-gray-100 rounded shadow-md">
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
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4">{student.id}</td>
                  <td className="p-4">
                    {editingId === student.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      student.name || "Unnamed Student"
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === student.id ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border p-1 rounded"
                      />
                    ) : (
                      student.email || "No Email Provided"
                    )}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    {editingId === student.id ? (
                      <button
                        onClick={() => handleEdit(student.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(student.id);
                            setEditName(student.name || "");
                            setEditEmail(student.email || "");
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          View
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}

      {viewStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm">
            <h3 className="text-2xl font-bold mb-4">Student Details</h3>
            <p>
              <strong>Name:</strong> {viewStudent.name}
            </p>
            <p>
              <strong>Email:</strong> {viewStudent.email}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
