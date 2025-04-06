import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

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
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>This is your dashboard. Here’s a list of everyone on StyleSyntax:</p>
      {users.length === 0 ? (
        <p>No other users found yet.</p>
      ) : (
        <ul>
          {users.map((otherUser) => (
            <li key={otherUser._id}>{otherUser.username}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default UserList;