import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // For dynamic routing and navigation

const EditCourse = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const navigate = useNavigate(); // For redirection after successful update
  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
    category: "",
  });
  const [initialData, setInitialData] = useState(null); // For resetting the form
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const categories = ["Web Development", "Data Science", "Machine Learning", "UI/UX Design"];

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setError("Course ID is missing. Please check the URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/courses/${courseId}`);
        setCourse(response.data);
        setInitialData(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch course details. Please check the course ID or try again.");
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.name || !course.description || !course.duration || !course.category) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/courses/${courseId}`, course);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setError("Failed to update the course. Please try again.");
      console.error("Error updating course:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  // Reset form to initial state
  const handleReset = () => {
    setCourse(initialData);
    setError("");
    setSuccess(false);
  };

  // Navigate back to the course list
  const handleBack = () => {
    navigate("/admin/courses");
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={handleBack}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Edit Course</h2>

      {/* Success Message */}
      {success && (
        <p className="text-green-500 bg-green-100 p-2 rounded mb-4">
          Course updated successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Course Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            placeholder="Enter course name"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Enter course description"
            rows="3"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="duration">
            Duration (in hours)
          </label>
          <input
            id="duration"
            type="number"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="Enter duration"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={course.category}
            onChange={handleChange}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Update Course
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
