import { Link } from 'react-router-dom';
import './OutfitList.css';
import OutfitCard from '../OutfitCard/OutfitCard';

const OutfitList = ({ outfits }) => {
  return (
    <main className="outfit-list">
      {outfits.length === 0 ? (
        <p>No outfits to display yet!</p>
      ) : (
        <div className="outfit-list-grid">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit._id} outfit={outfit} />
          ))}
        </div>
      )}
    </main>
  );
};

export default OutfitList;