import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

import OutfitCard from "../OutfitCard/OutfitCard";
import FolderModal from "../FolderModal/FolderModal";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserById(user._id);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) fetchUserData();
  }, [user]);

  const handleFileChange = (evt) => {
    setFile(evt.target.files[0]);
  };

  const handleImageUpload = async (evt) => {
    evt.preventDefault();

    if (!file || !user) {
      alert("Please select a file first.");
      return;
    }

    try {
      const updatedUser = await userService.uploadProfilePic(user._id, file);
      
      setUser((prevUser) => ({
        ...prevUser,
        profileImg: updatedUser.profileImg,
      }));

      setUserData((prevData) => ({
        ...prevData,
        profileImg: updatedUser.profileImg,
      }));

      console.log("Picture Uploaded Successfully", updatedUser);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  return userData ? (
    <main className="user-profile">
      
      {/* allows user to upload profile img */}
      <img
        src={userData.user.profileImg}
        className="profile-img"
        alt="User profile"
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          onChange={handleFileChange}
        />
          <button type="submit">Upload Profile Photo</button>
      </form>


      <h1 className="username"> Welcome, {userData.user.username} </h1>
      <p className="user-handle">@{userData.user.username.toLowerCase()}</p>

      <p className="follower-following">
        {userData.user.followers.length > 0
          ? `${userData.user.followers.length} followers`
          : "You have 0 followers. Go show off your style!"}
        {" · "}
        {userData.user.following.length > 0
          ? `${userData.user.following.length} following`
          : "You're not following anyone yet. Find some stylish users!"}
      </p>
      
      <div className="profile-buttons">
        <p>*Share and Edit Not functional*</p>
        <button>Share</button>
        <button>Edit profile</button>
      </div>

      <div className="quiz-results">
        <p>
          Quiz Results:{" "}
          {userData.user.quizResults || "Not taken yet"}
        </p>
      </div>
      
      <button
        className="manage-folders-button"
        onClick={() => setShowModal(true)}
      >
        Manage Folders
      </button>

      {userData.user.folders?.length > 0 &&
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

      {showModal && <FolderModal onClose={() => setShowModal(false)} />}
    </main>
  ) : (
    <p>Loading...</p>
  );
};

export default UserProfile;
