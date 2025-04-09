import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsModal.css';
import { RxCross2 as CrossIcon } from "react-icons/rx";
import {ReactComponent as LogoutIcon} from '../assets/logout.svg';
import {ReactComponent as SystemThemeIcon} from '../assets/sys_theme_image.svg';
import {ReactComponent as LightThemeIcon} from '../assets/light_theme_image.svg';
import {ReactComponent as DarkThemeIcon} from '../assets/dark_theme_image.svg';
import { useNotification } from '../NotificationContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialNote: string;
  onSave: (note: string, images: File[]) => void;
  email: string;
  onLogout: () => void;
  setNotification: (message: string | null) => void;
  setNotificationClass: (className: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, email, onLogout }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [emailState, setEmail] = useState(email);
  const [password, setPassword] = useState('');
  const [initialEmail, setInitialEmail] = useState(email);
  const [theme, setTheme] = useState('system');
  const { setNotification, setNotificationClass } = useNotification();

  const applySystemTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.body.setAttribute('data-theme', systemTheme);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          onLogout();
          return;
      }

      try {
          const response = await fetch('https://arve.onrender.com/user', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });

          if (response.status === 403 || response.status === 401) {
              // Token is invalid or expired
              localStorage.removeItem('token');
              onLogout();
              return;
          }

          if (response.ok) {
              const data = await response.json();
              setEmail(data.email);
              setInitialEmail(data.email);
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    
    if (savedTheme === 'system') {
      applySystemTheme();
    } else {
      document.body.setAttribute('data-theme', savedTheme);
    }

    // Add system theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = () => {
      if (theme === 'system') {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(initialEmail);
    setPassword('');
    onClose();

    if (emailState === initialEmail && password === '') {
        setNotification('Nothing changed'); // Set notification for no changes
        setNotificationClass('notification-info'); // Set info class
        return; // Exit early if nothing has changed
    }

    const response = await fetch('https://arve.onrender.com/user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email: emailState, password }),
    });

    if (response.ok) {
        let notificationMessage = '';
        if (emailState !== initialEmail) {
            notificationMessage = 'Email updated successfully';
        }
        if (password !== '') {
            notificationMessage = 'Password updated successfully';
        }
        setNotification(notificationMessage); // Set the appropriate notification message
        setNotificationClass('notification-success'); // Set success class
    } else {
        setNotification('Failed to update settings.');
        setNotificationClass('notification-error');
    }
  };

  const handleCancel = () => {
    setEmail(initialEmail);
    setPassword('');
    onClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate("/signin");
  };

  const handleThemeChange = (selectedTheme: string) => {
    if (theme === selectedTheme) return;
    
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    
    if (selectedTheme === 'system') {
      applySystemTheme();
    } else {
      document.body.setAttribute('data-theme', selectedTheme);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal" ref={modalRef}>
            <button className="close-button" onClick={onClose}><CrossIcon/></button>
            <div className="settings-modal-content">
              <div className="settings_container">
                <div className='block-header'>
                  <p>Settings</p>
                </div>
                <div className='settings_content'>
                  <p>Theme</p>
                  <p className='theme_description'>Select your UI theme</p>
                  <div className="theme-selector">
                    
                    <div 
                      className={`theme-block ${theme === 'light' ? 'active' : ''}`} 
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className='theme_image_block'>
                        <LightThemeIcon/>      
                      </div>
                      <div className="theme_label">Light theme</div>
                    </div>
                    
                    <div 
                      className={`theme-block ${theme === 'system' ? 'active' : ''}`} 
                      onClick={() => handleThemeChange('system')}
                    >
                      <div className='theme_image_block'>
                        <SystemThemeIcon/>      
                      </div>
                      <div className="theme_label">System theme</div>
                    </div>

                    <div 
                      className={`theme-block ${theme === 'dark' ? 'active' : ''}`} 
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className='theme_image_block'>
                        <DarkThemeIcon/>      
                      </div>
                      <div className="theme_label">Dark theme</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='profile-container'>
                <div className='block-header'>        
                  <p>Profile</p>
                  <button className="logout-button" onClick={handleLogout}>
                    <LogoutIcon className='logout_icon'/>
                    <p>Log Out</p>
                  </button>
                </div>
                
                <form className='profile-form' onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <div className="lable_input">Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={emailState}
                            onChange={(e) => setEmail(e.target.value)}
                            className='input-field'
                        />
                    </div>
                    <div className='input-container'>
                      <div className="lable_input">Password</div>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='input-field'
                        />
                    </div>
                    <div className="note-modal-footer">
                        <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
                        <button className="save-note-button" onClick={handleSubmit} type="submit">Update</button>
                    </div>
                </form>
              </div>
            </div>      
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;