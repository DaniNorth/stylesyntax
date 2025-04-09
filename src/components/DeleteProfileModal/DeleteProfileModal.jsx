import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

const DeleteProfileModal = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);

  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    const deletedProfile = await userService.deleteUser(user._id);
    setIsProfileDeleted(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/landing");
      onClose();
    }, 2000);

    console.log(deletedProfile);
  };

  return (
    <div className="folder-modal-backdrop">
      <div className="folder-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Are you sure you want to permanently delete this profile?</h2>
        {isProfileDeleted && <p>Profile Permanently Deleted!</p>}
        <button
          className="create-folder-button"
          type="submit"
          onClick={handleDeleteProfile}
        >
          Permanently Delete Profile
        </button>
      </div>
    </div>
  );
};

export default DeleteProfileModal;
