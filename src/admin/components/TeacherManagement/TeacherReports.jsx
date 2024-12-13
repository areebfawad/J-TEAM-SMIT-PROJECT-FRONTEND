import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/api/teachers/reports").then((response) => setReports(response.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Monthly Teacher Reports</h2>
      <ul className="space-y-2">
        {reports.map((report) => (
          <li key={report.id} className="border p-2 rounded">
            <h3 className="font-semibold">{report.teacherName}</h3>
            <p>{report.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherReports;
