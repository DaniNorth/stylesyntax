import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';

const UserProfile = () => {

  const { user } = useContext(UserContext);

  return(
    <main className="user-profile">
      <p>Welcome, {user.username}</p>
      <p>Following:</p>
      <p>Followers:</p>
    </main>
  );
};

export default UserProfile;