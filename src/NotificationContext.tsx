import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
    notification: string | null;
    notificationClass: string;
    setNotification: (message: string | null) => void;
    setNotificationClass: (className: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<string | null>(null);
    const [notificationClass, setNotificationClass] = useState<string>('');

    return (
        <NotificationContext.Provider value={{ notification, notificationClass, setNotification, setNotificationClass }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}; 