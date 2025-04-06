import { Link } from 'react-router-dom';
import { useContext } from 'react';
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
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/outfits">Browse Outfits</Link></li>
              <li><Link to="/outfits/new">Add Outfit</Link></li>
              <li><Link to="/userList"> Browse Users</Link></li>
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
