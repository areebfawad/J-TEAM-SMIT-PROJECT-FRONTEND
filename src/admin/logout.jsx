import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    // Clear session or token storage
    localStorage.clear(); // Or remove specific tokens: localStorage.removeItem("token");
    sessionStorage.clear();
    // Redirect to login
    navigate("/");
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
