import { useState, useRef, useEffect } from 'react';
import './AIModal.css';
import { requestRecommendation } from '../../services/aiAgentService';
import OutfitCard from '../OutfitCard/OutfitCard';

function AIModal({ onClose, userProfile }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]); // ← stores history
  const [currentOutfits, setCurrentOutfits] = useState([]);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
  
    if (!userProfile) {
      setChatLog((prev) => [
        ...prev,
        { role: 'user', text: prompt },
        { role: 'ai', text: '⚠️ I couldn’t find your style profile. Please sign in again or refresh.' },
      ]);
      return;
    }
  
    setLoading(true);
    setCurrentOutfits([]);
  
    try {
      const data = await requestRecommendation({
        userProfile,
        prompt,
        chatLog,
      });
  
      setChatLog((prev) => [
        ...prev,
        { role: 'user', text: prompt },
        { role: 'ai', text: data.explanation || 'No explanation provided.' },
      ]);
  
      setCurrentOutfits(data.outfits || []);
      setPrompt('');
    } catch (err) {
      console.error('AI Stylist Error:', err);
      setChatLog((prev) => [
        ...prev,
        { role: 'user', text: prompt },
        { role: 'ai', text: '🚨 Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  return (
    <div className="ai-modal-overlay">
      <div className="ai-modal chatbot-style">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>AI Stylist Chat</h2>

        <div className="chat-log">
          {chatLog.map((entry, i) => (
            <div key={i} className={`chat-bubble ${entry.role}`}>
              <p>{entry.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="ai-form">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What are you dressing for today?"
            rows={2}
          />
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>

        {currentOutfits.length > 0 && (
          <>
            <h4 className="ai-section-label">Suggested Outfits</h4>
            <div className="ai-outfits-grid">
              {currentOutfits.map((outfit) => (
                <OutfitCard key={outfit._id} outfit={outfit} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AIModal;