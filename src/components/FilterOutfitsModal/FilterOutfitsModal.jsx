import { useEffect, useState } from 'react';
import './FilterOutfitsModal.css';

const FilterOutfitsModal = ({ onClose }) => {
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

return (
    <aside className={`filter-modal ${slideIn ? 'slide-in' : 'slide-out'}`}>
      <div className="filter-header">
        <h2>Filter Outfits</h2>
        <button className="close-button" onClick={handleClose}>X</button>
      </div>
      {/* You’ll add checkboxes here later */}
    </aside>
  );
};

export default FilterOutfitsModal;