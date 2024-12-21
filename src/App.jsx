import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./admin/admin";
import User from "./user/user";
import Teacher from "./teacher/teacher";
import { Signup } from "./signup";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/admin/*" element={<Admin />} /> {/* Updated this line */}
        <Route path="/user" element={<User />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
