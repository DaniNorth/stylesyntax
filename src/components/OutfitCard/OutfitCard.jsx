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
          <h2>{outfit.title}</h2>
          <img src={outfit.imageUrl} alt={outfit.title} />
          <p className="style">{outfit.styleProfile}</p>
          <p className="description">{outfit.description}</p>
        </div>
        <button className="add-button" onClick={handleAddClick}>+ Add</button>
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