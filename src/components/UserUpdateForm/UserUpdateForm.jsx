import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';


const UserUpdateForm = () => {

  const { user, setUser } = useState(UserContext);
  const [userData, setUserData] = useState(null);



  return(
    <main>
      <h1>Edit User</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          name="username"
          id="username"
        />
        <label htmlFor="email">Email:</label>
        <input
          required 
          type="email"
          name="email"
          id="email"
        />
      </form>
    </main>
  )
};

export default UserUpdateForm;