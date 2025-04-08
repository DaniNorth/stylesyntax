import { useEffect, useState } from 'react';
import './FilterOutfitsModal.css';

const styleOptions = [
  'Boho', 'Minimalist', 'Grunge/Edgy', 'Preppy', 'Streetwear', 'Classic', 'Casual', 'Retro', 'Coder', 'Avant-Garde', 'Ecclectic/Artsy', 'Other'
]

const FilterOutfitsModal = ({ onClose, filters, setFilters }) => {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const isAlreadySelected = current.includes(value);

      return {...prev, [category]: isAlreadySelected ? current.filter(val => val !== value)
      : [...current, value]}
    })
  }
return (
    <aside className={`filter-modal ${slideIn ? 'slide-in' : 'slide-out'}`}>
      <div className="filter-header">
        <h2>Filter Outfits</h2>
        <button className="close-button" onClick={handleClose}>X</button>
      </div>
      <section className='filter-section'>
        <h3>Style Profile</h3>
          <div className='checkbox-group'>
            {styleOptions.map(option => (
             <label key={option} className='checkbox-label'>
              <input 
                type="checkbox"
                checked={filters.styleProfile.includes(option)}
                onChange={() => handleCheckboxChange('styleProfile', option)}
                />
                {option}
            </label> 
            ))}
            
          </div>
        
      </section>
      <div className="filter-footer">
        <button className="clear-filters-button" onClick={() => {
          setFilters({
            styleProfile: [],
            lifestyleTags: [],
            season: [],
            climateFit: [],
            fitPreference: [],
            genderCategory: [],
          });
        }}>
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterOutfitsModal;