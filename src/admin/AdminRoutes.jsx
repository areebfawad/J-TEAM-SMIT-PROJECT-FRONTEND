import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CourseList from "./components/CourseManagement/CourseList";
import AddCourse from "./components/CourseManagement/AddCourses";
import StudentList from "./components/StudentManagement/StudentList";
import ApproveEnrollment from "./components/StudentManagement/ApproveEnrollment";
import MergeStudents from "./components/StudentManagement/MergeStudents";
import AssignTeacher from "./components/TeacherManagement/AssignTeacher";
import TeacherReports from "./components/TeacherManagement/TeacherReports";
import Notifications from "./components/Notifications/Notifications";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route path="courses" element={<CourseList />} />
        <Route path="courses/add" element={<AddCourse />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/approve" element={<ApproveEnrollment />} />
        <Route path="students/merge" element={<MergeStudents />} />
        <Route path="teachers" element={<AssignTeacher />} />
        <Route path="teachers/reports" element={<TeacherReports />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;