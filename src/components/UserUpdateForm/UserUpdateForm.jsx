import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';


const UserUpdateForm = () => {

  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email
  });

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const updatedUser = await userService.updateUser(user._id, formData);
      setUser(updatedUser);
      console.log(formData.username);
      console.log("updated username and email!")
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect( () => {
    const fetchUser = async () => {
      const userData = await userService.getUserById(user._id);
      setFormData(userData);
    }
    if (user) fetchUser();
  }, [user]);



  return(
    <main>
      <h1>Edit {formData.username}</h1>
      <form className="user-update-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          
          />
        <label htmlFor="email">Email:</label>
        <input
          required 
          type="email"
          name="email"
          id="email"
          // value={formData.email}
          onChange={handleChange}
        />
        
        <button 
        type="submit"
        disabled={!formData.username || !formData.email}>
          SUBMIT
        </button>

      </form>
    </main>
  )
};

export default UserUpdateForm;