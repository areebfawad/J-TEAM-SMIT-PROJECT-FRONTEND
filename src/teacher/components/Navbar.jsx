import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Instructor Panel
                </Typography>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
