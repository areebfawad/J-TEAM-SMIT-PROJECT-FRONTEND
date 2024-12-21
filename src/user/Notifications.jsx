import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./user.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/user/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
