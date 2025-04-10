// UserProfileDetails.jsx
import { useParams } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import './UserProfileDetails.css';

const UserProfileDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [otherUser, setOtherUser] = useState(null);
  const isFollowing = otherUser?.followers?.some(f => f._id === user._id);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const data = await userService.getUserById(id);
        setOtherUser(data.user);
        console.log('Fetched user:', data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchOtherUser();
  }, [id]);

  if (!otherUser) return <main>Loading profile...</main>;

  return (
    <main className="user-profile-details">
      <img
        src={otherUser.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
        alt={`${otherUser.username}'s profile`}
        className="profile-img"
      />

      <h2 className="username">Welcome, {otherUser.username}</h2>
      <p className="user-handle">@{otherUser.username}</p>
      {otherUser.bio && <p className="user-bio">{otherUser.bio}</p>}

      <div className="follower-following">
        <p>
          {otherUser.followers?.length || 0} followers · {otherUser.following?.length || 0} following
        </p>
      </div>

      <div className="details-buttons">
        {isFollowing ? (
          <button onClick={async () => {
            const res = await userService.unfollowUser(otherUser._id);
            setOtherUser(res.updatedUser);
          }}>
            Unfollow
          </button>
        ) : (
          <button onClick={async () => {
            const res = await userService.followUser(otherUser._id);
            setOtherUser(res.updatedUser);
          }}>
            Follow
          </button>
        )}
      </div>
    </main>
  );
};

export default UserProfileDetails;