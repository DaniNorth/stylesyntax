import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

import "./UploadPhotoModal.css";

const UploadPhotoModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

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

      setIsPhotoUploaded(true);

      setTimeout(() => {
        onClose();
      }, 1250);
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  return (
    <div className="upload-photo-modal-backdrop">
      <div className="upload-photo-modal">
        <button className="upload-photo-close-button" onClick={onClose}>
          ×
        </button>
        <h2>Upload Profile Photo</h2>
        {isPhotoUploaded && <p className="photo-uploaded-message">Photo Uploaded!</p>}
        <form className="upload-photo-form" onSubmit={handleImageUpload}>
          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            onChange={handleFileChange}
          />
          <button className="upload-photo-submit-button" type="submit">
            Upload Profile Photo
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPhotoModal;
