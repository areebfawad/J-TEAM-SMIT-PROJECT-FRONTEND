import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from "./teacher/components/Sidebar";
import Navbar from "./teacher/components/Navbar";
import Dashboard from "./teacher/Pages/Dashboard";
import Courses from "./teacher/Pages/Courses";
import Assignments from "./teacher/Pages/Assignment";
import Students from "./teacher/Pages/Students";
import TaskSubmissions from "./teacher/Pages/TaskSubmissions";

function App() {

  return (
    <BrowserRouter>
        <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1 }}>
                    <Navbar />
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/assignments" element={<Assignments />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/tasksubmission" element={<TaskSubmissions />} />
                    </Routes>
                </div>
            </div>
    </BrowserRouter>
  );
}

export default App;
