import { useState } from 'react'
import { Link } from 'react-router';
import './OutfitList.css';
import OutfitCard from '../OutfitCard/OutfitCard';
import FilterOutfitsModal from '../FilterOutfitsModal/FilterOutfitsModal';

const OutfitList = ({ outfits }) => {
  // toggle the slide-out filter modal
  const [showFilter, setShowFilter] = useState(false);

  // holds the selected filters from the modal
  const [filters, setFilters] = useState({
    styleProfile: [],
    lifestyleTags: [],
    season: [],
    climateFit: [],
    fitPreference: [],
    genderCategory: []
  });

  // this filters the outfits *before* rendering
  const filteredOutfits = outfits.filter(outfit => {
    const {
      styleProfile,
      lifestyleTags,
      season,
      climateFit,
      fitPreference,
      genderCategory
    } = filters;

    // for each category: if nothing selected, pass everything
    // otherwise, check if outfit matches what's selected
    const matchesStyle = styleProfile.length === 0 || styleProfile.includes(outfit.styleProfile);
    const matchesLifestyle = lifestyleTags.length === 0 || outfit.lifestyleTags?.some(tag => lifestyleTags.includes(tag));
    const matchesSeason = season.length === 0 || season.includes(outfit.season);
    const matchesClimate = climateFit.length === 0 || climateFit.includes(outfit.climateFit);
    const matchesFit = fitPreference.length === 0 || fitPreference.includes(outfit.fitPreference);
    const matchesGender = genderCategory.length === 0 || genderCategory.includes(outfit.genderCategory);

    // only return outfits that match *everything*
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
      {/* filter button top-right corner of the page */}
      <div className="filter-button-container">
        <button
          className="open-filter-button"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>
      </div>

      {/* show the modal if toggled — passing state to it */}
      {showFilter && (
        <FilterOutfitsModal 
          onClose={() => setShowFilter(false)} 
          filters={filters}
          setFilters={setFilters} // gives modal control to update state
        />
      )}

      {/* render outfits — filtered if anything selected */}
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