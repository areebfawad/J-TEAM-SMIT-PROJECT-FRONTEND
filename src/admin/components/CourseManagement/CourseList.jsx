import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("/api/courses").then((response) => setCourses(response.data));
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
