import React, { useContext, useState } from 'react';
import { InstructorContext } from '../Context/InstructorContext';

const Notifications = () => {
    const { notifications, addNotification,deleteNotification, students } = useContext(InstructorContext);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('');
    const [type, setType] = useState('General');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    
    const filteredNotifications = notifications.filter((notification) => {
        return (
            (!searchQuery || notification.recipient.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (!filterType || notification.type === filterType)
        );
    });
    
    const handleSendNotification = () => {
        if (message && recipient && type) {
            addNotification({ message, recipient, type });
            setMessage('');
            setRecipient('');
            setType('General');
            alert('Notification sent successfully!');
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Send Notification</h2>
            

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
    <input
        type="text"
        placeholder="Search by recipient"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
    />
    <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
    >
        <option value="">All Types</option>
        <option value="General">General</option>
        <option value="Reminder">Reminder</option>
        <option value="Alert">Alert</option>
    </select>
</div>



            <div style={{ marginBottom: '10px' }}>
                <label>
                    <strong>Recipient:</strong>
                    <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px',color:"black" }}
                    >
                        <option value="">Select a student</option>
                        {students.map((student, index) => (
                            <option key={index} value={student.name} style={{color:"blue"}}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    <strong>Type:</strong>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="General">General</option>
                        <option value="Reminder">Reminder</option>
                        <option value="Alert">Alert</option>
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    <strong>Message:</strong>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter notification message"
                        style={{ width: '100%', padding: '8px', height: '100px', marginTop: '5px' }}
                    ></textarea>
                </label>
            </div>

            <button
                onClick={handleSendNotification}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Send Notification
            </button>

            <h3 style={{ marginTop: '30px' }}>Notification History</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredNotifications.map((notification) => (
                    <li
                        key={notification.id}
                        style={{
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <p>
                            <strong>To:</strong> {notification.recipient}
                        </p>
                        <p>
                            <strong>Type:</strong> {notification.type}
                        </p>
                        <p>
                            <strong>Message:</strong> {notification.message}
                        </p>
                        <p style={{ fontSize: '12px', color: '#555' }}>
                            <strong>Date:</strong> {notification.date}
                        </p>
                        <button
    onClick={() => deleteNotification(notification.id)}
    style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
    }}
>
    Delete
</button>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
