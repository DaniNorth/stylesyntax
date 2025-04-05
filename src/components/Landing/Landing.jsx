import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import NavBar from '../NavBar/NavBar';
import './Landing.css';

const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  {/* make scroll smoother for better UE */}
  const handleScroll = () => {
    document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="landing-container">
      {/* <NavBar /> we have 2 navs showing up*/} 

      {/* adds banner from the assetss folder */}
      <video className="video-banner" autoPlay muted loop>
        <source src="/assets/BannerLanding.mp4" type="video/mp4" />
      </video>

      {/* easy scroll button*/}
      <div className="arrow-down" onClick={handleScroll}>▼</div>

      {/* Placeholder text build out later */}
      <section id="next-section" className="section">
        <h1>Welcome to StyleSyntax</h1>
        <p>Your personalized style journey starts here.</p>

        {/* Wait for Randall to build out profile and link */}
        {user ? (
          <button className="get-started-btn" onClick={() => navigate('/profile')}>
            Go to Profile
          </button>
        ) : (
          <>
            <Link to="/sign-in" className="get-started-btn" style={{ marginRight: '1rem' }}>
              Sign In
            </Link>
            <Link to="/sign-up" className="get-started-btn">
              Sign Up
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

export default Landing;
