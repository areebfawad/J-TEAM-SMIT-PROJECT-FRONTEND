import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./admin/admin";
import User from "./user/UserDashboard";
import Signup from "./signup";
<<<<<<< Updated upstream

=======
// import Teacher from "./teacher/teacher";
>>>>>>> Stashed changes

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} /> {/* Updated this line */}
        <Route path="/user" element={<User />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
