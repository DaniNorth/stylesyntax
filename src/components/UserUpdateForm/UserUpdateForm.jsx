import { useState, useEffect, useContext } from "react";
import {useNavigate} from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

import UploadPhotoModal from "../UploadPhotoModal/UploadPhotoModal";
import DeleteProfileModal from "../DeleteProfileModal/DeleteProfileModal";
import "./UserUpdateForm.css";

const UserUpdateForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user.username,
    bio: user.bio,
  });
  
  const [showUploadPhotoModal, setUploadPhotoModal] = useState(false);
  const [showDeleteProfileModal, setDeleteProfileModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const updatedUser = await userService.updateUser(user._id, formData);
      setUser(updatedUser);
      navigate("/profile")
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userService.getUserById(user._id);
      setFormData(userData.user);
    };
    if (user) fetchUser();
  }, [user]);
  
  return (
    <main className="user-update-wrapper">
      <h1>Edit {user.username}</h1>
      <div className="profile-image-wrapper">
        <img
          src={formData.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
          alt="User Profile"
          className="profile-image"
        />
      </div>
        <button
          className="upload-profile-image-button"
          onClick={() => setUploadPhotoModal(true)}
        >
          Change Photo
        </button>
        {showUploadPhotoModal && (
          <UploadPhotoModal onClose={() => setUploadPhotoModal(false)} />
        )}

      <form className="user-update-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          type="bio"
          name="bio"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <button type="submit">SUBMIT</button>
      </form>

      <button
        className="delete-user-button"
        onClick={() => setDeleteProfileModal(true)}
      >
        Delete Profile
      </button>
      {showDeleteProfileModal && (
        <DeleteProfileModal onClose={() => setDeleteProfileModal(false)} />
      )}
    </main>
  );
};

export default UserUpdateForm;
