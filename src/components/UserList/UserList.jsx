import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import './UserList.css';

const UserList = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();

        const filtered = fetchedUsers.filter(u => u._id !== user._id);
        setUsers(filtered);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  const handleFollow = async (targetId) => {
    try {
      const res = await userService.followUser(targetId);
      const updated = res.updatedUser;

      setUsers(prev =>
        prev.map(u => (u._id === updated._id ? updated : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (targetId) => {
    try {
      const res = await userService.unfollowUser(targetId);
      const updated = res.updatedUser;

      setUsers(prev =>
        prev.map(u => (u._id === updated._id ? updated : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const isFollowing = (targetUser) =>
    targetUser.followers?.some((f) => f._id === user._id);

  if (loading) return <main>Loading users...</main>;

  return (
    <main className="user-list-container">
      <h1>Welcome, {user.username}</h1>
      <p>This is your dashboard. Here's a list of everyone on StyleSyntax:</p>
      {users.length === 0 ? (
        <p>No other users found yet.</p>
      ) : (
        <section className="user-grid">
          {users.map((otherUser) => (
            <div key={otherUser._id} className="user-preview">
              <img
                src={otherUser.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
                alt={`${otherUser.username}'s Profile`}
                className="profile-img"
              />
              <p>{otherUser.username}</p>

              <div className="button-group">
                {isFollowing(otherUser) ? (
                  <button 
                    onClick={() => handleUnfollow(otherUser._id)} 
                    className="unfollow-btn"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button 
                    onClick={() => handleFollow(otherUser._id)} 
                    className="follow-btn"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default UserList;