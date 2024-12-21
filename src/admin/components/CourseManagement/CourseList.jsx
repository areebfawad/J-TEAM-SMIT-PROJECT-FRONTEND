import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]); // Course data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [itemsPerPage] = useState(5); // Courses per page

  // Fetch courses
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("/api/courses"); // Use "/api" if proxy is configured
          if (Array.isArray(response.data)) {
            setCourses(response.data);
          } else {
            console.error("API response is not an array:", response.data);
            setError("Unexpected API response format.");
          }
        } catch (err) {
          console.error("Error fetching courses:", err);
          setError("Failed to load courses. Please check the API.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCourses();
    }, []);

  // Filter courses by search query
  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) =>
        course.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  // Pagination logic
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Course List</h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center my-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="text-gray-500 mt-2">Loading courses...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {/* Course List */}
      {!loading && !error && currentCourses.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {currentCourses.map((course) => (
            <li key={course.id} className="p-4 hover:bg-gray-100 transition-all rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
                  <p className="text-sm text-gray-600">Duration: {course.duration}</p>
                </div>
                <button
                  onClick={() => alert(`Details of ${course.name}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {!loading && !error && currentCourses.length === 0 && (
        <p className="text-gray-500">No courses found.</p>
      )}

      {/* Pagination */}
      {!loading && !error && sortedCourses.length > 0 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
