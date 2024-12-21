import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function DashboardCard({ title, count }) {
    return (
        <Card style={{ width: '200px' }}>
            <CardContent>
                <Typography variant="h5">{count}</Typography>
                <Typography variant="subtitle1">{title}</Typography>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;
