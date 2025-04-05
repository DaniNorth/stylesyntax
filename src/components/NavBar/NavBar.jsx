import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css'
//******** These Do Not Exist Yet ********* */
// import Home from './pages/Home';
// import StyleQuiz from './pages/StyleQuiz'
// import Outfits from './pages/Outfits'
// import Profile from './pages/Profile'

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      <div className="nav-container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quiz">Style Quiz</Link></li>
          <li><Link to="/outfits">Browse Outfits</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
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
