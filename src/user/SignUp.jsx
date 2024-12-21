import React, { useState } from "react";
import axios from "../axiosConfig";
import "./user.css";

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", cnic: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/signup", formData);
      alert("Sign-Up Successful!");
    } catch (error) {
      console.error(error);
      alert("Sign-Up Failed. Try Again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Student Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cnic"
          placeholder="CNIC"
          value={formData.cnic}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
