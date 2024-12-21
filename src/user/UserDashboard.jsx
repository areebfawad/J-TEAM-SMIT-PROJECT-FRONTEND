import React from "react";
import TaskSubmission from "./TaskSubmission";
import Grades from "./Grades";
import Notifications from "./Notifications";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <TaskSubmission />
      <Grades />
      <Notifications />
    </div>
  );
};

export default UserDashboard;
