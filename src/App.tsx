import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import DayView from './DayView';
import MonthView from './MonthView';
import YearView from './YearView';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import SettingsModal from './components/SettingsModal';
import { NotificationProvider, useNotification } from './NotificationContext';
import NotificationDisplay from './NotificationDisplay';

import './App.css';
import './styles/theme.css';

declare global {
    interface Window {
        ipcRenderer: {
            on(channel: string, func: (...args: any[]) => void): void;
            off(channel: string, func: (...args: any[]) => void): void;
            send(channel: string, ...args: any[]): void;
            invoke(channel: string, ...args: any[]): Promise<any>;
        };
    }
}

const ipcRenderer = window.ipcRenderer;

const AppContent: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const { setNotification, setNotificationClass } = useNotification();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [email] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
            navigate('/signin');
        }
    }, [navigate]);

    useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.on('update_available', () => {
                alert('A new update is available. Downloading now...');
            });

            ipcRenderer.on('update_downloaded', () => {
                const confirmed = confirm('Update downloaded. Restart now to apply?');
                if (confirmed) {
                    ipcRenderer.send('restart_app');
                }
            });
        }
    }, []);

    useEffect(() => {
        const handleDateChange = (e: CustomEvent) => {
            setCurrentDate(e.detail);
        };

        window.addEventListener('dateChange', handleDateChange as EventListener);
        return () => {
            window.removeEventListener('dateChange', handleDateChange as EventListener);
        };
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';

        const applyTheme = () => {
            if (savedTheme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.body.setAttribute('data-theme', systemTheme);
            } else {
                document.body.setAttribute('data-theme', savedTheme);
            }
        };

        applyTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem('theme') === 'system') {
                document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    const handlePrevDay = () => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        const today = new Date();
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 1);
            return newDate <= today ? newDate : prev;
        });
    };

    const handleYearChange = (year: number) => {
        setCurrentDate(prev => new Date(year, prev.getMonth(), prev.getDate()));
    };

    const handleMonthChange = (monthIndex: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), monthIndex, prev.getDate()));
    };

    const handleViewChange = (view: 'Day' | 'Month' | 'Year') => {
        switch (view) {
            case 'Day':
                navigate('/day');
                break;
            case 'Month':
                navigate('/');
                break;
            case 'Year':
                navigate('/year');
                break;
        }
    };

    return (
        <>
            <NotificationDisplay />
            <Routes>
                <Route path="/" element={isLoggedIn ?
                    <MonthView
                        setNotification={setNotification}
                        setNotificationClass={setNotificationClass}
                        currentDate={currentDate}
                        selectedDate={selectedDate}
                        onViewChange={handleViewChange}
                    /> :
                    <Navigate to="/signin" />
                } />
                <Route path="/day" element={isLoggedIn ?
                    <DayView
                        setNotification={setNotification}
                        setNotificationClass={setNotificationClass}
                        currentDate={currentDate}
                        onPrevDay={handlePrevDay}
                        onNextDay={handleNextDay}
                        onViewChange={handleViewChange}
                        onYearChange={handleYearChange}
                        onMonthChange={handleMonthChange}
                    /> :
                    <Navigate to="/signin" />
                } />
                <Route path="/signin" element={<SignIn
                    setNotification={setNotification}
                    setNotificationClass={setNotificationClass}
                />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/year" element={isLoggedIn ?
                    <YearView
                        setNotification={setNotification}
                        setNotificationClass={setNotificationClass}
                        currentDate={currentDate}
                        setSelectedDate={setSelectedDate}
                        onViewChange={handleViewChange}
                    /> :
                    <Navigate to="/signin" />
                } />
            </Routes>
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                initialNote=""
                onSave={(note, images) => {
                    console.log('Note saved:', note, images);
                    setIsSettingsModalOpen(false);
                }}
                email={email}
                onLogout={handleLogout}
                setNotification={setNotification}
                setNotificationClass={setNotificationClass}
            />
        </>
    );
};

const App: React.FC = () => {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    );
};

export default App;