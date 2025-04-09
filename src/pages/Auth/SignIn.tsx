import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';
import {ReactComponent as Logo} from '../../assets/Logo.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg';

interface SignInProps {
    setNotification: (message: string | null) => void;
    setNotificationClass: (className: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ setNotification, setNotificationClass }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://arve.onrender.com/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('loginDate', new Date().toISOString());  // Store login date
                setNotification('Successfully signed in!');
                setNotificationClass('notification-success');
                navigate('/');
            } else {
                const error = await response.json();
                setNotification(error.message || 'Failed to sign in');
                setNotificationClass('notification-error');
            }
        } catch (error) {
            setNotification('Network error occurred');
            setNotificationClass('notification-error');
        }
    };

    return (
        <div className="sign_in_bg">
        <div className="signin-container">
            <div className="signin-content">
                <div className="logo_title">
                <div className="logo_auth">
                    <Logo />
                </div>
                <h2>Sign In to Arve</h2>
                </div>
                
                <form className='signin-form' onSubmit={handleSubmit}>
                    <div className="input_auth-container">
                        <p className='input-label'>Email address</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='input-field_sign_in'
                        />
                    </div>
                    <div className="input_auth-container">
                        <div className="lable_forgot-password">
                            <p className='input-label'>Password</p>
                            <a href='/forgot-password' className='forgot-password'>Forgot password?</a>
                        </div>
                        
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='input-field_sign_in'
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className='button_auth_in'>Sign In</button>
                </form>
                
                <div className="auth_footer">
                    <p>
                    New Arve? <Link className='link_auth_footer' to="/signup">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignIn;