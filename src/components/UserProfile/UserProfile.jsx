import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from '../../services/userService';

import OutfitCard from "../OutfitCard/OutfitCard";
import FolderModal from "../FolderModal/FolderModal";
import "./UserProfile.css"

const UserProfile = () => {

  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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
    src={userData.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
    className="profile-img"
    alt="User profile"
  />

  <input
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    id="profile-upload"
    // onChange={handleProfileImageUpload}
  />
  <label htmlFor="profile-upload" className="upload-profile-btn">
    <p>*upload not functional*</p>
    <button>Upload Profile Photo</button>  
  </label>

  <h1 className="username">{userData.user.username}</h1>
  <p className="user-handle">@{userData.user.username.toLowerCase()}</p>

  <p className="follower-following">
    {userData.user.followers.length} followers · {userData.user.following.length} following
  </p>

  <div className="profile-buttons">
    <p>*Share and Edit Not functional*</p>
    <button>Share</button>
    <button>Edit profile</button>
  </div>

  <p>Quiz Results: {userData.user.quizResults || "Not taken yet"}</p>

  <button
    className="manage-folders-button"
    onClick={() => setShowModal(true)}
  >
    Manage Folders
  </button>

  {userData.user.folders?.length > 0 &&
    userData.user.folders.map(folder => (
      <section key={folder._id} className="folder-section">
        <h3>{folder.title}</h3>
        <div className="scrolling-folder">
          {folder.outfits?.map(outfit => (
            <OutfitCard key={outfit._id} outfit={outfit} />
          ))}
        </div>
      </section>
    ))}
  {showModal && <FolderModal onClose={() => setShowModal(false)} />}
</main>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;