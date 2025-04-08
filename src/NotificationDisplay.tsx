import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const NotificationDisplay: React.FC = () => {
    const { notification, notificationClass, setNotification } = useNotification();
    
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 4000);
            
            return () => clearTimeout(timer);
        }
    }, [notification, setNotification]);

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    className={`notification ${notificationClass}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                        position: 'fixed', 
                        top: '-10px', 
                        left: '0', 
                        right: '0', 
                        transform: 'translateX(-50%)', 
                        zIndex: 10000 
                    }}
                >
                    {notification}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationDisplay;