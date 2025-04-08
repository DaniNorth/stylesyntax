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
      

//*******   OLD CODE   ****** */ 
// import { useContext, useState, useEffect } from "react";
// import { UserContext } from "../../contexts/UserContext";
// import * as userService from '../../services/userService';

// import "./UserPreview.css";

// const UserPreview = () => {
//   const { user } = useContext(UserContext);
//   const [otherUsers, setOtherUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const allUsers = await userService.index(); // fetches all users
//         const filteredUsers = allUsers.filter(fetchedUser => fetchedUser._id !== user._id);
//         setOtherUsers(filteredUsers);
//       } catch(error) {
//         console.error(error);
//       }
//     }
//     if (user) fetchUsers()
//   }, [user]);
  
//   return(
//     <section className="user-profile">
//       {otherUsers.map(otherUser => (
//         <div key={otherUser._id} className="user-preview">
//           <img
//           src={otherUser.profileImg}
//           alt={`${otherUser.username}'s Profile`}
//           className="profile-img"

//           />

//           <p>{otherUser.username}</p>
//           <button>Follower User</button>
//           <button>Unfollow User</button>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default UserPreview;


// <section className="user-grid">
//           {users.map((otherUser) => (
//             <div key={otherUser._id} className="user-preview">
//               <img
//                 src={otherUser.profileImg || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
//                 alt={`${otherUser.username}'s Profile`}
//                 className="profile-img"
//               />
//               <p>{otherUser.username}</p>

//               <div className="button-group">
//                 {isFollowing(otherUser) ? (
//                   <button 
//                     onClick={() => handleUnfollow(otherUser._id)} 
//                     className="unfollow-btn"
//                   >
//                     Unfollow
//                   </button>
//                 ) : (
//                   <button 
//                     onClick={() => handleFollow(otherUser._id)} 
//                     className="follow-btn"
//                   >
//                     Follow
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </section>