import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from '../../services/userService';

import OutfitCard from "../OutfitCard/OutfitCard";
import "./UserProfile.css"

const UserProfile = () => {

  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  
  useEffect( () => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserById(user._id);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      };
    };

    if (user) fetchUserData();
  }, [user]);

  return userData ? (
    <main className="user-profile">
      <img
        src={userData.profileImg}
        className='profile-img'
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <p> Button for uploading profile picture goes here</p>
      <p>Welcome, {userData.user.username}</p>
      <p>Following: {" "}
        {userData.user.following.length > 0 ?
        userData.user.following.length
        : " You are not following anyone. Follow a few very stylish StyleSyntax users."}</p>
      <p>Followers: {" "}
        {userData.user.followers.length > 0 ?
        userData.user.following.length
        : "You have 0 followers. Go show off you style!"}</p>
      <p>Quiz Results: {userData.user.quizResults}</p>

      {/* Added folder */}
      {userData.user.folders?.length > 0 && userData.user.folders.map(folder => (
        <section key={folder._id} className="folder-section">
          <h3>{folder.title}</h3>
          <div className="scrolling-folder">
            {folder.outfits?.map(outfit => (
              <OutfitCard key={outfit._id} outfit={outfit} />
            ))}
          </div>
        </section>
      ))}
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;