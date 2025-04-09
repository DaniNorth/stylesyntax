import { useNavigate } from "react-router";
import './UserPreview.css'

const UserPreview = ({ otherUser, isFollowing, handleFollow, handleUnfollow }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profile/${otherUser._id}`)
  };

  return (
    <div className="user-preview" onClick={handleCardClick} >
      <img 
        src={otherUser.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png' } 
        alt={`${otherUser.username}'s Profile`}
        className="profile-img"
        />
    
      <p>{otherUser.username}</p>
      <div className="button-group" onClick={(event) => event.stopPropagation()}>
        {isFollowing ? (
          <button onClick={() => handleUnfollow(otherUser._id)} className="unfollow-btn">
            Unfollow
          </button>
        ):(
          <button onClick={() => handleFollow(otherUser._id)} className="follow-btn">
            Follow
          </button>
        )}
      </div> 
    </div>
  );
};

export default UserPreview
      
