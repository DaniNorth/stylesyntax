import { useEffect, useState } from 'react';
import FilterCategoryCard from "../FilterCategories/FilterCategoryCard";
import './FilterOutfitsModal.css';

const styleOptions = [
  'Boho', 'Minimalist', 'Grunge/Edgy', 'Preppy', 'Streetwear', 'Classic',
  'Casual', 'Retro', 'Coder', 'Avant-Garde', 'Ecclectic/Artsy', 'Other'
];

const lifestyleTagOptions = [
  'Athletic', 'Professional', 'Casual', 'Event-ready', 'Outdoorsy', 'Loungewear'
];

const FilterOutfitsModal = ({ onClose, filters, setFilters }) => {
  const [slideIn, setSlideIn] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // Controls which accordion section is open

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
      return {
        ...prev,
        [category]: isAlreadySelected
          ? current.filter(val => val !== value)
          : [...current, value]
      };
    });
  };

  
  const toggleSection = (section) => {
    setActiveSection(prev => (prev === section ? null : section));
  };

  
  const handleUseQuizResults = () => {
    const stored = localStorage.getItem('quizResults');
    if (stored) {
      const result = JSON.parse(stored);
      setFilters({
        styleProfile: [result.styleProfile],
        lifestyleTags: result.lifestyleTags || [],
        season: result.season ? [result.season] : [],
        climateFit: result.climateFit ? [result.climateFit] : [],
        fitPreference: [result.fitPreference],
        genderCategory: [result.genderCategory],
      });
    }
  };

  return (
    <aside className={`filter-modal ${slideIn ? 'slide-in' : 'slide-out'}`}>
      <div className="filter-header">
        <h2>Filter Outfits</h2>
        <button className="close-button" onClick={handleClose}>X</button>
      </div>

      <FilterCategoryCard
        title="Style Profile"
        categoryKey="styleProfile"
        options={[
          'Boho', 'Minimalist', 'Grunge/Edgy', 'Preppy', 'Streetwear', 'Classic',
          'Casual', 'Retro', 'Coder', 'Avant-Garde', 'Ecclectic/Artsy', 'Other'
        ]}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <FilterCategoryCard
        title="Lifestyle Tags"
        categoryKey="lifestyleTags"
        options={[
          'Athletic', 'Professional', 'Casual', 'Event-ready', 'Outdoorsy', 'Loungewear'
        ]}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <FilterCategoryCard
        title="Season"
        categoryKey="season"
        options={['Winter', 'Spring', 'Summer', 'Fall']}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <FilterCategoryCard
        title="Climate Fit"
        categoryKey="climateFit"
        options={['Tropical', 'Temperate', 'Cold', 'Dry', 'Humid']}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <FilterCategoryCard
        title="Fit Preference"
        categoryKey="fitPreference"
        options={['Fitted', 'Relaxed', 'Oversized']}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <FilterCategoryCard
        title="Gender Category"
        categoryKey="genderCategory"
        options={['Male', 'Female', 'Nonbinary', 'Unisex']}
        filters={filters}
        setFilters={setFilters}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Clear all filters */}
      <div className="filter-footer">
        <div className="filter-button-group">
          <button
            className="clear-filters-button"
            onClick={() =>
              setFilters({
                styleProfile: [],
                lifestyleTags: [],
                season: [],
                climateFit: [],
                fitPreference: [],
                genderCategory: [],
              })
            }
          >
            Clear Filters
          </button>
          <button className="clear-filters-button apply-quiz-button" onClick={handleUseQuizResults}>
            Use My Quiz Results
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterOutfitsModal;