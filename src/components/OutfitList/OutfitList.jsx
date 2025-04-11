import { useState } from 'react'
import { Link } from 'react-router-dom';
import './OutfitList.css';
import OutfitCard from '../OutfitCard/OutfitCard';
import FilterOutfitsModal from '../FilterOutfitsModal/FilterOutfitsModal';
import AIModal from '../AIModal/AIModal';

const OutfitList = ({ outfits, userProfile }) => {
  
  const [showFilter, setShowFilter] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const [filters, setFilters] = useState({
    styleProfile: [],
    lifestyleTags: [],
    season: [],
    climateFit: [],
    fitPreference: [],
    genderCategory: []
  });

   const filteredOutfits = outfits.filter(outfit => {
    const {
      styleProfile,
      lifestyleTags,
      season,
      climateFit,
      fitPreference,
      genderCategory
    } = filters;

   
    const matchesStyle = styleProfile.length === 0 || styleProfile.includes(outfit.styleProfile);
    const matchesLifestyle = lifestyleTags.length === 0 || outfit.lifestyleTags?.some(tag => lifestyleTags.includes(tag));
    const matchesSeason = season.length === 0 || season.includes(outfit.season);
    const matchesClimate = climateFit.length === 0 || climateFit.includes(outfit.climateFit);
    const matchesFit = fitPreference.length === 0 || fitPreference.includes(outfit.fitPreference);
    const matchesGender = genderCategory.length === 0 || genderCategory.includes(outfit.genderCategory);

    return (
      matchesStyle &&
      matchesLifestyle &&
      matchesSeason &&
      matchesClimate &&
      matchesFit &&
      matchesGender
    );
  });

  return (
    <main className="outfit-list">
      
      <div className="filter-button-container">
        <button
            className="ai-stylist-button"
            onClick={() => setShowAI(true)}
          >
            Ask the AI Stylist
        </button>
        <button
          className="open-filter-button"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>

      {showFilter && (
        <FilterOutfitsModal 
          onClose={() => setShowFilter(false)} 
          filters={filters}
          setFilters={setFilters} 
        />
      )}
      {showAI && (
        <AIModal
          onClose={() => setShowAI(false)}
          userProfile={userProfile} 
        />
      )}
    
      <div className="outfit-list-grid">
        {filteredOutfits.length === 0 ? (
          <p>No outfits to display yet!</p>
        ) : (
          filteredOutfits.map((outfit) => (
            <OutfitCard key={outfit._id} outfit={outfit} />
          ))
        )}
      </div>
    </main>
  );
};

export default OutfitList;