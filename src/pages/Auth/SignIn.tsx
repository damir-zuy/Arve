import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import {ReactComponent as Logo} from '../../assets/Logo.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isHiding, setIsHiding] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store token in local storage
            window.location.href = data.redirectUrl; // Redirect to MonthView
        } else {
            setErrorMessage('Login failed. Please check your credentials.'); // Set error message
        }
    };

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setIsHiding(true);
                setTimeout(() => {
                    setErrorMessage('');
                    setIsHiding(false);
                }, 500);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    return (
        <div className="sign_in_bg">
        <div className="signin-container">
            <div className="signin-content">
                {errorMessage && (
                    <div className={`error-message ${isHiding ? 'hide' : ''}`}>
                        {errorMessage}
                    </div>
                )}
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