import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as quizService from '../../services/quizService';
import './Quiz.css';


const Quiz = () => {

const navigate = useNavigate();

  const [gender, setGender] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch the quiz after gender is selected
  useEffect(() => {
    if (gender) {
      fetchQuestionsByGender(gender);
    }
  }, [gender]);

  const fetchQuestionsByGender = async (selectedGender) => {
    setLoading(true);
    try {
      const data = await quizService.getQuestions(selectedGender);
      const questionList = Object.entries(data.questions);
      setQuestions(questionList);
      setCurrentIndex(1); // Skip q1 since it's already answered to determine gender and which qs to return
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      const data = await quizService.submitAnswers(finalAnswers);
      localStorage.setItem('quizResults', JSON.stringify(data.quizResults));
      navigate('/quiz/results');
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleGenderSelection = (selectedGender) => {
    const formattedGender = selectedGender.toLowerCase();
    setGender(formattedGender);
    setAnswers({ q1: selectedGender }); // Save q1 answer manually to ensure rest of qs load properly
  };

  const handleAnswer = (answer) => {
    const [currentKey] = questions[currentIndex];
    const newAnswers = { ...answers, [currentKey]: answer };
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  // Seperated quiz into 2 sections to determine q set. Step 1. Q1
  if (!gender) {
    return (
      <div className="quiz-container">
        <h2>Describe yourself</h2>
        <div className="quiz-options">
          {["Male", "Female", "Nonbinary"].map((g) => (
            <button
              key={g}
              className="quiz-option-button"
              onClick={() => handleGenderSelection(g)}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="quiz-progress">Question 1 of ~12</div>
      </div>
    );
  }

  // Loads the rest of the nontagged and genderbased questions. Step 2
  if (loading || questions.length === 0) {
    return <div className="quiz-container">Loading questions...</div>;
  }

  const [currentKey, currentQuestion] = questions[currentIndex];

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.text}</h2>
      <div className="quiz-options">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            className="quiz-option-button"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="quiz-progress">
        Question {currentIndex + 1} of {questions.length + 1}
      </div>
    </div>
  );
};

export default Quiz;