import React, { useState } from "react";
import axios from "../axiosConfig";
import "./user.css";

const TaskSubmission = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("task", file);

    try {
      const response = await axios.post("/user/submit-task", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Task Submitted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Task Submission Failed.");
    }
  };

  return (
    <div className="task-container">
      <h2>Submit Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload Task</button>
      </form>
    </div>
  );
};

export default TaskSubmission;
