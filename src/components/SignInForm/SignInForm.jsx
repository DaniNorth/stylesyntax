import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import './SignInForm.css';
import { signIn } from '../../services/authService';
import * as userService from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      localStorage.setItem('userId', signedInUser._id);

      const fullUser = await userService.getUserById(signedInUser._id);
  
      setUser(fullUser.user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="sign-in-form-container">
    <h1>Sign In</h1>
    <p>{message}</p>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          name="username"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      <div className="sign-in-form-buttons">
        <button type="submit">Sign In</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  </main>
  );
};

export default SignInForm;
