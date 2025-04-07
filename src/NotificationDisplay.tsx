import React from 'react';
import { useNotification } from './NotificationContext';
import { motion } from 'framer-motion';

const NotificationDisplay: React.FC = () => {
    const { notification, notificationClass, setNotification } = useNotification();

    if (!notification) return null;

    return (
        <motion.div
            className={`notification ${notificationClass}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', top: '-10px', left: '0', right: '0', transform: 'translateX(-50%)', zIndex: 10000 }}
            onAnimationComplete={() => setTimeout(() => setNotification(null), 3000)} // Clear after 3 seconds
        >
            {notification}
        </motion.div>
    );
};

export default NotificationDisplay; 