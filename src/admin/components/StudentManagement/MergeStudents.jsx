import React, { useState } from "react";
import axios from "axios";

const MergeStudents = () => {
  const [student1, setStudent1] = useState("");
  const [student2, setStudent2] = useState("");

  const handleMerge = () => {
    axios
      .post("/api/students/merge", { student1, student2 })
      .then((response) => {
        alert("Students merged successfully!");
      });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Merge Students</h2>
      <label className="block mb-4">
        Student 1:
        <input
          type="text"
          value={student1}
          onChange={(e) => setStudent1(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </label>
      <label className="block mb-4">
        Student 2:
        <input
          type="text"
          value={student2}
          onChange={(e) => setStudent2(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </label>
      <button
        onClick={handleMerge}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Merge Students
      </button>
    </div>
  );
};

export default MergeStudents;
