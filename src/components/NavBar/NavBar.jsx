import { useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/StyleSyntaxLogo.svg';
import './NavBar.css'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/landing');
  }
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
    <div className="nav-container">

    <div className="logo-section">
     <Link to="/landing" className="logo-link">
    <img
      src={logo}
      alt="StyleSyntax Logo"
      className="logo"
    />
  </Link>
    </div>
  
      <ul className="nav-links">
        <li><span onClick={handleHomeClick} className="nav-link">Home</span></li>
        <li><Link to="/quiz">Style Quiz</Link></li>
        <li><Link to="/outfits">Browse Outfits</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/outfits/new">Add Outfit</Link></li>
            <li><Link to="/userList">Browse Users</Link></li>
            <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
          </>
        )}
      </ul>
    </div>
  </nav>
  );
};


export default NavBar;
