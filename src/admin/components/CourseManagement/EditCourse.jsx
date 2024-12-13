import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCourse = ({ courseId }) => {
  const [course, setCourse] = useState({ name: "", description: "" });

  useEffect(() => {
    // Fetch course details by ID
    axios.get(`/api/courses/${courseId}`).then((response) => {
      setCourse(response.data);
    });
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update course details
    axios.put(`/api/courses/${courseId}`, course).then((response) => {
      alert("Course updated successfully!");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
      <label className="block mb-2">
        Course Name:
        <input
          type="text"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          className="border w-full p-2 rounded mt-1"
        />
      </label>
      <label className="block mb-4">
        Description:
        <textarea
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
          className="border w-full p-2 rounded mt-1"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Course
      </button>
    </form>
  );
};

export default EditCourse;
