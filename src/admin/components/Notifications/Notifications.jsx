import React, { useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("students");

  const handleSend = () => {
    axios.post("/api/notifications", { message, recipient }).then((response) => {
      alert("Notification sent!");
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
      <label className="block mb-2">
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full p-2 rounded mt-1"
        ></textarea>
      </label>
      <label className="block mb-4">
        Recipient:
        <select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border w-full p-2 rounded"
        >
          <option value="students">Students</option>
          <option value="teachers">Teachers</option>
        </select>
      </label>
      <button
        onClick={handleSend}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Send Notification
      </button>
    </div>
  );
};

export default Notifications;
