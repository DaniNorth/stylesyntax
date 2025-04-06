import { Link } from 'react-router-dom';
import './OutfitCard.css';

const OutfitCard = ({ outfit }) => {
  return (
    <Link to={`/outfits/${outfit._id}`} className="outfit-card">
      <div className="outfit-card-content">
        <h2>{outfit.title}</h2>
        <img src={outfit.imageUrl} alt={outfit.title} />
        <p className="style">{outfit.styleProfile}</p>
        <p className="description">{outfit.description}</p>
      </div>
      <button className="add-button" onClick={(e) => e.preventDefault()}>+ Add</button>
    </Link>
  );
};

export default OutfitCard;