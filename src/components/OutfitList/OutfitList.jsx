import { useState } from 'react'
import { Link } from 'react-router';
import './OutfitList.css';
import OutfitCard from '../OutfitCard/OutfitCard';
import FilterOutfitsModal from '../FilterOutfitsModal/FilterOutfitsModal';

const OutfitList = ({ outfits }) => {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <main className="outfit-list">
      <div className="filter-button-container">
        <button
          className="open-filter-button"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>
      {showFilter && (
        <FilterOutfitsModal onClose={() => setShowFilter(false)} />
      )}
      <div className="outfit-list-grid">
      {outfits.length === 0 ? (
        <p>No outfits to display yet!</p>
      ) : (
          outfits.map((outfit) => (
            <OutfitCard key={outfit._id} outfit={outfit} />
          ))
        )}
      </div>
    </main>
  );
};

export default OutfitList;