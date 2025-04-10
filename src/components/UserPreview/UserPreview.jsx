import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import './UserPreview.css';

const UserPreview = ({ otherUser, onUpdateUser }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loadingFollow, setLoadingFollow] = useState(false);

  const isFollowing = otherUser.followers?.some(f => 
    typeof f === 'object' ? f._id === user._id : f === user._id
  );

  const handleFollowToggle = async () => {
    setLoadingFollow(true);
    try {
      const res = isFollowing
        ? await userService.unfollowUser(otherUser._id)
        : await userService.followUser(otherUser._id);

      if (onUpdateUser) {
        onUpdateUser(res.updatedUser); // Tell UserList to update its state
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/profile/${otherUser._id}`);
  };
  
  return (
    <div className="user-preview" onClick={handleCardClick}>
      <img 
        src={otherUser.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} 
        alt={`${otherUser.username}'s Profile`}
        className="profile-img"
      />
      <p>{otherUser.username}</p>

      <div className="preview-button-group" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleFollowToggle}
          disabled={loadingFollow}
          className={isFollowing ? "unfollow-btn" : "follow-btn"}
        >
          {loadingFollow ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserPreview;