import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './teacher/Context/TaskContext';
import { InstructorProvider } from './teacher/Context/InstructorContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <InstructorProvider>
        <TaskProvider>
            <App />
        </TaskProvider>
        </InstructorProvider>
       
    </React.StrictMode>
);
