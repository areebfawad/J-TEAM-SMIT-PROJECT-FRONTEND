import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MergeStudents = () => {
  const [students, setStudents] = useState([]); // List of students
  const [student1, setStudent1] = useState(""); // Selected student 1
  const [student2, setStudent2] = useState(""); // Selected student 2
  const [studentDetails1, setStudentDetails1] = useState(null); // Preview of Student 1
  const [studentDetails2, setStudentDetails2] = useState(null); // Preview of Student 2
  const [loading, setLoading] = useState(true); // Loading state
  const [mergeLoading, setMergeLoading] = useState(false); // Merge action loading

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        setStudents(response.data);
      } catch (err) {
        toast.error("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Update student details for preview
  useEffect(() => {
    if (student1) {
      const selected = students.find((s) => s.id === parseInt(student1));
      setStudentDetails1(selected);
    } else {
      setStudentDetails1(null);
    }
  }, [student1, students]);

  useEffect(() => {
    if (student2) {
      const selected = students.find((s) => s.id === parseInt(student2));
      setStudentDetails2(selected);
    } else {
      setStudentDetails2(null);
    }
  }, [student2, students]);

  // Handle the merge action
  const handleMerge = async () => {
    if (student1 === student2) {
      toast.error("You cannot merge the same student.");
      return;
    }

    const confirmation = window.confirm(
      `Are you sure you want to merge ${studentDetails1.name} and ${studentDetails2.name}?`
    );
    if (!confirmation) return;

    setMergeLoading(true);
    try {
      await axios.post("http://localhost:3000/students/merge", {
        student1,
        student2,
      });
      toast.success("Students merged successfully!");

      // Refresh the student list
      const response = await axios.get("http://localhost:3000/students");
      setStudents(response.data);

      // Reset states
      setStudent1("");
      setStudent2("");
      setStudentDetails1(null);
      setStudentDetails2(null);
    } catch (err) {
      console.error("Error merging students:", err);
      toast.error("Failed to merge students.");
    } finally {
      setMergeLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500 text-center">Loading students...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <Toaster /> {/* Toast Notifications */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Merge Students</h2>
      <p className="mb-6 text-gray-600">
        Select two students to merge. This action will combine their records and remove duplicates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student 1 Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Select Student 1</label>
          <select
            value={student1}
            onChange={(e) => setStudent1(e.target.value)}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Student 1 --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          {studentDetails1 && (
            <div className="mt-4 p-3 border rounded bg-gray-50">
              <p className="font-semibold">Name: {studentDetails1.name}</p>
              <p>Email: {studentDetails1.email}</p>
            </div>
          )}
        </div>

        {/* Student 2 Dropdown */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Select Student 2</label>
          <select
            value={student2}
            onChange={(e) => setStudent2(e.target.value)}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Student 2 --</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          {studentDetails2 && (
            <div className="mt-4 p-3 border rounded bg-gray-50">
              <p className="font-semibold">Name: {studentDetails2.name}</p>
              <p>Email: {studentDetails2.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Merge Button */}
      <div className="mt-6">
        <button
          onClick={handleMerge}
          className={`w-full text-white font-bold py-2 rounded ${
            !student1 || !student2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 transition-all"
          }`}
          disabled={!student1 || !student2 || mergeLoading}
        >
          {mergeLoading ? "Merging..." : "Merge Students"}
        </button>
      </div>
    </div>
  );
};

export default MergeStudents;
