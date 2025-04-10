import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';
import UserPreview from '../UserPreview/UserPreview';
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

  const updateUserInList = (updatedUser) => {
    setUsers(prev =>
      prev.map(update => (update._id === updatedUser._id ? updatedUser : update))
    );
  };

  if (loading) return <main>Loading users...</main>;

  return (
    <main className="user-list-container">
      <h1>Welcome, {user.username}</h1>
      <p>This is your dashboard. Here's a list of everyone on StyleSyntax:</p>
      {users.length === 0 ? (
        <p>No other users found yet.</p>
      ) : (
        <section className="user-grid">
          {users.map(otherUser => (
            <UserPreview
              key={otherUser._id}
              otherUser={otherUser}
              onUpdateUser={updateUserInList}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default UserList;