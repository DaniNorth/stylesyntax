import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/StyleSyntaxLogo.svg'
import './Landing.css';
import backgroundVideo from '../../assets/LandingBanner.mp4';


const Landing = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  {/* make scroll smoother for better UE */}
  const handleScroll = () => {
    document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="landing-container">

      {/* adds banner from the assetss folder through import*/}
      <video className="video-banner" autoPlay muted loop playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>


      {/* easy scroll button*/}
      <div className="arrow-down" onClick={handleScroll} aria-label="Scroll to next section">
        ▼
      </div>

      {/* Placeholder text build out later */}
      <section id="next-section" className="section">

        

        <h1 className="hero-title">Welcome to <span>StyleSyntax</span></h1>

        <p className="hero-subtitle">Your personalized style journey starts here.</p>
        <div className="landing-logo-container">
          <img src={logo} alt="StyleSyntax Logo" className="landing-logo" />
        </div>
        {/* Wait for Randall to build out profile and link */}
        {user ? (
          <button className="get-started-btn" onClick={() => navigate('/profile')}>
            Go to Profile
          </button>
        ) : (
          <div className="btn-group">
            <Link to="/sign-in" className="get-started-btn">Sign In</Link>
            <Link to="/sign-up" className="get-started-btn">Sign Up</Link>
          </div>
        )}
      </section>
      <section className="features-section">
        <h2 className="section-title">Why Choose StyleSyntax?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Tailored Recommendations</h3>
            <p>Discover fashion that speaks to your personality, body, and vibe. Create a 100% free account for full access.</p>
          </div>
          <div className="feature-card">
            <h3>Style Insights</h3>
            <p>A currated expeirence from real stylists enhanced with on-demand AI-driven suggestions.</p>
          </div>
          <div className="feature-card">
            <h3>Save & Share</h3>
            <p>Create your lookbook lists, comment on your favorite styles, and connect with friends.</p>
          </div>
        </div>
      </section>

    <section className="testimonials-section">
      <h2 className="section-title">What Our Users Say</h2>
      <div className="testimonial">
        <p>“StyleSyntax completely transformed how I shop. It's like having a stylist in my pocket!”</p>
        <span>– Jamie L.</span>
      </div>
      <div className="testimonial">
        <p>“It’s smart, fun, and finally gets my style.”</p>
        <span>– River M.</span>
      </div>
    </section>
    </main>
  );
};

export default Landing;