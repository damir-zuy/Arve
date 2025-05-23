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
import { UpdateNotification } from './components/UpdateNotification';
import WelcomeScreen from './components/WelcomeScreen';

import './App.css';
import './styles/theme.css';

declare global {
    interface Window {
        electronAPI: {
            onUpdateAvailable(callback: () => void): void;
            onUpdateDownloaded(callback: () => void): void;
            onUpdateError(callback: (err: Error) => void): void;
            restartApp(): void;
        };
    }
}

const AppContent: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
    const navigate = useNavigate();
    const { setNotification, setNotificationClass } = useNotification();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [email] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const publicPaths = ['/signin', '/signup'];
        const token = localStorage.getItem('token');
        const currentPath = window.location.hash.replace('#', '');
        
        if (!token && !publicPaths.includes(currentPath)) {
            navigate('/signin');
        }
    }, [navigate]);

    useEffect(() => {
        const handleUpdateAvailable = () => {
            alert('A new update is available. Downloading now...');
        };
    
        const handleUpdateDownloaded = () => {
            const confirmed = confirm('Update downloaded. Restart now to apply?');
            if (confirmed) {
                window.electronAPI.restartApp();
            }
        };
    
        const handleUpdateError = (err: Error) => {
            console.error('Update error:', err);
            alert('There was an error during the update process.');
        };
    
        window.electronAPI.onUpdateAvailable(handleUpdateAvailable);
        window.electronAPI.onUpdateDownloaded(handleUpdateDownloaded);
        window.electronAPI.onUpdateError(handleUpdateError);
    
        return () => {
            // You could clean up listeners manually if you exposed `off` versions too
        };
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

    const handleCloseWelcomeScreen = () => {
        setIsWelcomeModalOpen(false);
        localStorage.setItem('welcomeScreenSeen', 'true');
    };

    return (
        <>
            <NotificationDisplay />
            <WelcomeScreen 
                isOpen={isWelcomeModalOpen} 
                onClose={handleCloseWelcomeScreen} 
            />
            <Routes>
                <Route path="/" element={isLoggedIn ?
                    <MonthView
                        setNotification={setNotification}
                        setNotificationClass={setNotificationClass}
                        currentDate={currentDate}
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
                        onViewChange={handleViewChange}
                    /> :
                    <Navigate to="/signin" />
                } />
                <Route path="/welcome" element={
                    isLoggedIn ? <WelcomeScreen /> : <Navigate to="/signin" />
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
            <UpdateNotification />
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