import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ApproveEnrollment = () => {
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch enrollment requests
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/enrollments");
        setEnrollmentRequests(response.data);
        setFilteredRequests(response.data);
      } catch (error) {
        console.error("Error fetching enrollment requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = enrollmentRequests.filter(
      (req) =>
        req.studentName.toLowerCase().includes(query) ||
        req.courseName.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // Approve enrollment
  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:3000/enrollments/${id}/approve`);
      toast.success("Enrollment approved successfully!");
      setFilteredRequests(filteredRequests.filter((req) => req.id !== id));
    } catch (error) {
      toast.error("Failed to approve enrollment.");
      console.error("Error approving enrollment:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject enrollment
  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:3000/enrollments/${id}/reject`);
      toast.success("Enrollment rejected successfully!");
      setFilteredRequests(filteredRequests.filter((req) => req.id !== id));
    } catch (error) {
      toast.error("Failed to reject enrollment.");
      console.error("Error rejecting enrollment:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <Toaster /> {/* Toast notifications */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Approve Enrollments</h2>

      {/* Search Box */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by student or course name..."
        className="border p-2 rounded w-full mb-4 focus:ring-2 focus:ring-blue-500"
      />

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500">Loading enrollment requests...</p>
      ) : currentRequests.length > 0 ? (
        <>
          {/* Enrollment Table */}
          <table className="w-full bg-gray-100 rounded shadow-md">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-4 text-left">Student Name</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Requested Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-4">{request.studentName}</td>
                  <td className="p-4">{request.courseName}</td>
                  <td className="p-4">
                    {new Date(request.requestedDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-center space-x-4">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                      disabled={actionLoading === request.id}
                    >
                      {actionLoading === request.id ? "Approving..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      disabled={actionLoading === request.id}
                    >
                      {actionLoading === request.id ? "Rejecting..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No enrollment requests at the moment.</p>
      )}
    </div>
  );
};

export default ApproveEnrollment;
