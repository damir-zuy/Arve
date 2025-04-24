import React, { useState } from 'react';
import { ReactComponent as Doodles } from '../assets/doodles_welcome.svg';
import Light from '../assets/light_welcome.png';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isOpen, onClose }) => {
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (accepted) {
      localStorage.setItem('welcomeScreenSeen', 'true');
      onClose();
    }
  };

  return (
    <div className="welcome-modal-overlay">
      <div className="welcome-modal">
        <div className="bg_welcom">
            <Doodles className="doodles" />
            <img src={Light} alt="" className='light' />
        </div>
        <div className="welcome-modal-content">
            <h2 className='trust-text'>We don`t share your data</h2>
          <p className="welcome-text">
          You can be completely confident that your data is safe with us. We take your privacy very seriously and have implemented strict measures to ensure that your information remains confidential. Rest assured, we will never share your data with any third parties without your explicit consent. Our commitment to protecting your privacy is unwavering, and we continuously monitor our systems to safeguard your information. Your trust is paramount, and we are dedicated to maintaining it.
          </p>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="custom-checkbox"></span>
              <span>I trust Arve and don’t show it again</span>
            </label>
          </div>
          <button 
            className={`continue-button ${accepted ? 'active' : ''}`}
            disabled={!accepted}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
