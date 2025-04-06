import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from '../../services/userService';

const UserProfile = () => {

  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect( () => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserById(user._id);
        setUserData(data);
      } catch (error) {
        console.error(error);
      };
    };

    if (user) fetchUserData;
  }, []);

  return userData ? (
    <main className="user-profile">
      <img
        src={userData.profileImg}
        className='profile-img'
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <p>Welcome, {userData.username}</p>
      <p>Following: {userData.following}</p>
      <p>Followers: {userData.followers}</p>
      <p>Quiz Results: {userData.quizResults}</p>
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;