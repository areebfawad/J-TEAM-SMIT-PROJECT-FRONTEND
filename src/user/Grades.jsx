import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./user.css";

const Grades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get("/user/grades");
        setGrades(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGrades();
  }, []);

  return (
    <div className="grades-container">
      <h2>Your Grades</h2>
      <ul>
        {grades.map((grade, index) => (
          <li key={index}>
            {grade.course}: {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grades;
