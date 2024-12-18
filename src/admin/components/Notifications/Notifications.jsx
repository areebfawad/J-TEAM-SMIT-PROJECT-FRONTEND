import React, { useState, useEffect } from "react";
import axios from "axios";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("students");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch Notification History
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/notifications");
        setHistory(response.data || []); // Default to empty array if no data
      } catch (err) {
        console.error("Failed to fetch notifications history:", err);
      }
    };
    fetchHistory();
  }, []);

  // Handle Send Notification
  const handleSend = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post("http://localhost:3000/notifications", { message, recipient });
      setSuccess(true);
      setMessage("");
      setRecipient("students");

      // Update Notification History
      setHistory((prev) => [
        ...prev,
        { id: Date.now(), message, recipient, timestamp: new Date().toLocaleString() },
      ]);
    } catch (err) {
      console.error("Error sending notification:", err);
      setError("Failed to send notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Send Notification</h2>

      {/* Success Message */}
      {success && (
        <p className="text-green-500 bg-green-100 p-2 rounded mb-4">
          Notification sent successfully!
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>
      )}

      {/* Notification Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            rows="3"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Recipient</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="all">All</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full text-white font-bold py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 transition-all"
            }`}
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </div>
      </div>

      {/* Notification History */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">Notification History</h3>
        {history.length > 0 ? (
          <ul className="space-y-2">
            {history.map((note) => (
              <li
                key={note.id}
                className="p-3 bg-gray-100 rounded shadow hover:bg-gray-200 transition-all"
              >
                <p>
                  <strong>Recipient:</strong>{" "}
                  {note.recipient
                    ? note.recipient.charAt(0).toUpperCase() + note.recipient.slice(1)
                    : "Unknown"}
                </p>
                <p className="mt-1">
                  <strong>Message:</strong> {note.message || "No message provided"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Sent on: {note.timestamp || "Unknown date"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications sent yet.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
