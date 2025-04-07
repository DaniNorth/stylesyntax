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
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  if (loading) return <main>Loading users...</main>;

  return (
    <main className="user-list-container">
      <h1>Welcome, {user.username}</h1>
      <p>This is your dashboard. Here’s a list of everyone on StyleSyntax:</p>
      {users.length === 0 ? (
        <p>No other users found yet.</p>
      ) : (
        // <ul>
        //   {users.map((otherUser) => (
        //     <li key={otherUser._id}>{otherUser.username}</li>
        //   ))}
        // </ul>
        <section className="user-grid">
          {users.map((otherUser) => (
            <div key={otherUser._id} className="user-preview">
              <img
                src={otherUser.profileImg}
                alt={`${otherUser.username}'s Profile`}
                className="profile-img"
              />
              <p>{otherUser.username}</p>
              <button>Follow</button>
              <button>Unfollow</button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default UserList;