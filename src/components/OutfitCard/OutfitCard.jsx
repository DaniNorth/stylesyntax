import { useState } from 'react';
import { Link } from 'react-router-dom';
import './OutfitCard.css';
import AddOutfitModal from '../AddOutfitModal/AddOutfitModal';

const OutfitCard = ({ outfit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault(); // prevent navigation
    setShowModal(true);
  };

  return (
    <>
      <Link to={`/outfits/${outfit._id}`} className="outfit-card">
        <div className="outfit-card-content">
          <img src={outfit.imageUrl} alt={outfit.title} className="outfit-img" />
          <h2 className="outfit-title">{outfit.title}</h2>
          <p className="posted-by">by {outfit.author?.username}</p>
          <p className="style">{outfit.styleProfile?.toUpperCase()}</p>
          <p className="description-snippet">
            {outfit.description?.split(' ').slice(0, 5).join(' ')}...
          </p>
        </div>
        <br />
        <div className="outfit-card-footer">
          <button className="add-button" onClick={handleAddClick}>+ Add</button>
        </div>
      </Link>
      {showModal && (
        <AddOutfitModal 
          outfitId={outfit._id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default OutfitCard;