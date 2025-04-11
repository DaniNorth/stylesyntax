import './FilterCategoryCard.css';

const FilterCategoryCard = ({ 
  title, 
  categoryKey, 
  options, 
  filters, 
  setFilters, 
  activeSection,
  setActiveSection 
}) => {
  
  const isOpen = activeSection === categoryKey;

 
  const handleToggle = () => {
    setActiveSection(isOpen ? null : categoryKey);
  };

    const handleCheckboxChange = (value) => {
    const current = filters[categoryKey] || [];
    const updatedValues = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];

    setFilters(prev => ({
      ...prev,
      [categoryKey]: updatedValues
    }));
  };

  return (
    <div className="filter-category-card">
      <div className="filter-section-header" onClick={handleToggle}>
        <span>{title}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="filter-options">
          {options.map(option => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                checked={(filters[categoryKey] || []).includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCategoryCard;