import React, { useState, useEffect } from "react";
import axios from "axios";

const MergeStudents = () => {
  const [students, setStudents] = useState([]); // List of students
  const [student1, setStudent1] = useState(""); // Selected student 1
  const [student2, setStudent2] = useState(""); // Selected student 2
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle the merge action
  const handleMerge = async () => {
    if (student1 === student2) {
      alert("You cannot merge the same student.");
      return;
    }

    try {
      const confirmation = window.confirm(
        `Are you sure you want to merge ${student1} and ${student2}?`
      );
      if (!confirmation) return;

      await axios.post("/api/students/merge", { student1, student2 });
      alert("Students merged successfully!");
      setStudent1("");
      setStudent2("");
    } catch (err) {
      console.error("Error merging students:", err);
      alert("Failed to merge students.");
    }
  };

  if (loading) {
    return <div className="bg-white p-6 rounded shadow">Loading students...</div>;
  }

  if (error) {
    return <div className="bg-white p-6 rounded shadow text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Merge Students</h2>
      <p className="mb-4 text-gray-600">
        Select two students to merge. Merging will combine their records and delete the duplicate entry.
      </p>

      {/* Student 1 Dropdown */}
      <label className="block mb-4">
        <span className="font-semibold">Select Student 1:</span>
        <select
          value={student1}
          onChange={(e) => setStudent1(e.target.value)}
          className="border w-full p-2 rounded mt-2"
        >
          <option value="">-- Select Student 1 --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </label>

      {/* Student 2 Dropdown */}
      <label className="block mb-4">
        <span className="font-semibold">Select Student 2:</span>
        <select
          value={student2}
          onChange={(e) => setStudent2(e.target.value)}
          className="border w-full p-2 rounded mt-2"
        >
          <option value="">-- Select Student 2 --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleMerge}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
        disabled={!student1 || !student2}
      >
        Merge Students
      </button>
    </div>
  );
};

export default MergeStudents;
