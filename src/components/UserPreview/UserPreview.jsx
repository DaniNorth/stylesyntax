import { useState, useEffect } from "react";

import * as userService from '../../services/userService';


const UserPreview = () => {
  const { user } = useContext(UserContext);
  const {otherUsers, setOtherUsers} = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.index(); // fetches all users
        const filteredUsers = allUsers.filter(fetchedUser => fetchedUser._id !== user._id);
        setOtherUsers(filteredUsers);
      } catch(error) {
        console.error(error);
      }
    }
    if (user) fetchUsers()
  }, [user]);
  
  return(
    <section className="user-profile">
      {otherUsers.map(otherUser => (
        <div key={otherUser._id} className="user-preview">
          <img
          src={otherUser.profileImg}
          alt={`${otherUser.username}'s Profile`}
          className="profile-img"
          style= {{ width: "80px", height:"80px", borderRadius: "50%" }}/>
          <p>{otherUser.username}</p>
          <button>Follower User</button>
          <button>Unfollow User</button>
        </div>
      ))}
    </section>
  );
};

export default UserPreview;
