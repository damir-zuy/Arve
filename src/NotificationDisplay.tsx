import React from 'react';
import { useNotification } from './NotificationContext';
import './NotificationDisplay.css';

const NotificationDisplay: React.FC = () => {
    const { notification, notificationClass } = useNotification();
    
    if (!notification) return null;

    return (
        <div className={`notification ${notificationClass}`}>
            {notification}
        </div>
    );
};

export default NotificationDisplay;