import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Celaya Live API Console</h1>
        <p>Your intelligent chat interface for API interactions</p>
        
        <div className="cta-buttons">
          {user ? (
            <Link to="/chat" className="primary-button">
              Go to Sign In
            </Link>
          ) : (
            <>
              <Link to="/signin" className="primary-button">
                Sign In
              </Link>
              <Link to="/signin" className="secondary-button">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 