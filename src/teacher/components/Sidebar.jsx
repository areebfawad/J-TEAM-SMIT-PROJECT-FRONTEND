import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div style={{ width: '250px', height: '100vh', background: '#f4f4f4' }}>
            <List>
                <ListItem>
                    <ListItemText primary="Instructor Panel" />
                </ListItem>
                <Divider />
                <ListItem button={"true"}>
                    <Link to="/dashboard">Dashboard</Link>
                </ListItem>

                <ListItem button={"true"}>
                    <Link to="/courses">Courses</Link>
                </ListItem>
                <ListItem button={"true"}>
                    <Link to="/assignments">Assignments</Link>
                </ListItem>
                <ListItem button={"true"}>
                    <Link to="/students">Students</Link>
                </ListItem>
                <ListItem button={"true"}>
                    <Link to="/tasksubmission">TaskSubmissions</Link>
                </ListItem>
            </List>
        </div>
    );
}

export default Sidebar;
