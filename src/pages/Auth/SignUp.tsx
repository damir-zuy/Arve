import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css'; // Use the new CSS file for styling
import { ReactComponent as Logo } from '../../assets/Logo.svg'; // Import the logo
import { ReactComponent as EyeIcon } from '../../assets/eye.svg'; // Import your eye icon
import { ReactComponent as EyeOffIcon } from '../../assets/eye-off.svg'; // Import your eye-off icon
import signupImage from '../../assets/signup_image.avif'; // Import your image

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://arve.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 
                localStorage.setItem('email', email);
                navigate('/');  // This will handle the navigation correctly
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    };
    
    return (
        <div className="sign_up_bg">
        <div className="signup-container">
            <div className="signup-content">
                {errorMessage && (
                    <div className={`error-message ${isHiding ? 'hide' : ''}`}>
                        {errorMessage}
                    </div>
                )}
                <div className="logo_title">
                    <div className="logo_auth">
                        <Logo /> {/* Display the logo */}
                    </div>
                    <h2>Sign Up to Arve</h2> {/* Update the heading */}
                </div>
                
                <form className='signup-form' onSubmit={handleSubmit}> {/* Use the same form class */}
                    <div className="input_auth-container">
                        <p className='input-label'>Email address</p> {/* Update label */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='input-field_sign_in' // Use the same input class
                        />
                    </div>
                    <div className="input_auth-container">
                        <p className='input-label'>Password</p>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle input type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='input-field_sign_in' // Use the same input class
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                {showPassword ? <EyeIcon /> : <EyeOffIcon />} {/* Toggle icon */}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className='button_auth_in'>Sign Up</button> {/* Use the same button class */}
                </form>
                
                <div className="auth_footer">
                    <p>
                    Already have an account? <Link className='link_auth_footer' to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
            <div className="signup_image-container">
                <img src={signupImage} alt="Sign Up" className="signup-image" /> {/* Image element */}
            </div>
        </div>
        </div>
    );
};

export default SignUp;