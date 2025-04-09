import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizResult.css';

const QuizResults = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('quizResults');
    if (stored) {
      setTimeout(() => {
        setResult(JSON.parse(stored));
      }, 300); // slight delay for entrance animation
    }
  }, []);

  if (!result) {
    return <div className="quiz-results-container">Loading your results...</div>;
  }

  return (
    <div className="quiz-results-container">
      <h2 className="fade-in">Your Style Results</h2>

      <div className="result-section fade-in delay-1">
        <strong>Style Profile:</strong>
        <span className="result-value">{result.styleProfile}</span>
      </div>

      <div className="result-section fade-in delay-2">
        <strong>Fit Preference:</strong>
        <span className="result-value">{result.fitPreference}</span>
      </div>

      <div className="result-section fade-in delay-3">
        <strong>Gender Category:</strong>
        <span className="result-value">{result.genderCategory}</span>
      </div>

      <div className="result-section fade-in delay-4">
        <strong>Lifestyle Tags:</strong>
        <div className="tag-list">
          {result.lifestyleTags.map((tag, index) => (
            <span key={index} className="tag-item pop-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button className="filter-style-btn fade-in delay-4" onClick={() => navigate('/outfits')}>
        Explore Outfits
      </button>
    </div>
  );
};

export default QuizResults;