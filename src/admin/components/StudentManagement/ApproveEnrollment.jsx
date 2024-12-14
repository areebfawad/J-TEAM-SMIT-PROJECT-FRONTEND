import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproveEnrollment = () => {
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrollment requests
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("/api/enrollments");
        setEnrollmentRequests(response.data);
      } catch (error) {
        console.error("Error fetching enrollment requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Approve enrollment
  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/enrollments/${id}/approve`);
      alert("Enrollment approved successfully!");
      setEnrollmentRequests(enrollmentRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error approving enrollment:", error);
    }
  };

  // Reject enrollment
  const handleReject = async (id) => {
    try {
      await axios.put(`/api/enrollments/${id}/reject`);
      alert("Enrollment rejected successfully!");
      setEnrollmentRequests(enrollmentRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error rejecting enrollment:", error);
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded shadow">Loading enrollment requests...</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Approve Enrollments</h2>
      {enrollmentRequests.length > 0 ? (
        <table className="w-full bg-gray-100 rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Requested Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentRequests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-4">{request.studentName}</td>
                <td className="p-4">{request.courseName}</td>
                <td className="p-4">{new Date(request.requestedDate).toLocaleDateString()}</td>
                <td className="p-4 flex justify-center space-x-4">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No enrollment requests at the moment.</p>
      )}
    </div>
  );
};

export default ApproveEnrollment;
