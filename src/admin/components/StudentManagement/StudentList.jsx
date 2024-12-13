import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("/api/students").then((response) => setStudents(response.data));
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
