import React, { useState } from "react";
import axios from "axios";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    category: "",
    instructor: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // Error state

  const categories = ["Web Development", "Data Science", "Machine Learning", "Design"];
  const instructors = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    if (formData.duration <= 0) {
      setError("Duration must be greater than zero.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/courses", formData);
      console.log("API Response:", response.data);
      setSuccess(true);
      setFormData({ name: "", description: "", duration: "", category: "", instructor: "" });
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add the course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Course</h2>

      {/* Success Message */}
      {success && (
        <p className="bg-green-100 text-green-800 p-2 rounded mb-4">
          Course added successfully!
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter course name"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter course description"
            rows="3"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          ></textarea>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Duration (in hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter course duration"
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Instructor</label>
          <select
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="">-- Select Instructor --</option>
            {instructors.map((inst, index) => (
              <option key={index} value={inst}>
                {inst}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full p-2 text-white font-semibold rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
