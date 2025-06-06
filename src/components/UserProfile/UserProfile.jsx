import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

import OutfitCard from "../OutfitCard/OutfitCard";
import FolderModal from "../FolderModal/FolderModal";
import QuizResult from "../QuizResult/QuizResult"
import "./UserProfile.css";

const UserProfile = ({ id }) => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const isOwnProfile = !id || id === user._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const targetId = id && id !== user._id ? id : user._id;
        const data = await userService.getUserById(targetId);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  return userData ? (
    <main className="user-profile">
      <img
        src={
          userData.user.profileImg?.trim()
            ? userData.user.profileImg
            : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        }
        className="profile-img"
        alt="User profile"
      />

      <h1 className="username"> Welcome, {userData.user.username} </h1>
      <p className="user-handle">@{userData.user.username.toLowerCase()}</p>
      <p className="user-bio">{userData.user.bio}</p>
      <p className="follower-following">
        {userData.user.followers.length > 0
          ? `${userData.user.followers.length} followers`
          : "You have 0 followers. Go show off your style!"}
        {" · "}
        {userData.user.following.length > 0
          ? `${userData.user.following.length} following`
          : "You're not following anyone yet. Find some stylish users!"}
      </p>

      {isOwnProfile && (
        <div className="profile-buttons">
          <Link className="edit-profile-button" to={`/profile/edit`}>
            Edit profile
          </Link>
        </div>
      )}

      {isOwnProfile && (
        <div className="quiz-results">
          <h1 className="quiz-results-text">{<QuizResult />|| "Not taken yet"}</h1>
        </div>
      )}

      {isOwnProfile && (
        <>
          <button
            className="manage-folders-button"
            onClick={() => setShowModal(true)}
          >
            Manage Folders
          </button>

          {showModal && <FolderModal onClose={() => setShowModal(false)} />}
        </>
      )}


      {isOwnProfile &&
        userData.user.folders?.length > 0 &&
        userData.user.folders.map((folder) => (
          <section key={folder._id} className="folder-section">
            <h3>{folder.title}</h3>
            <div className="scrolling-folder">
              {folder.outfits?.map((outfit) => (
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