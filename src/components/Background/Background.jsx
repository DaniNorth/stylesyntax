import './Background.css';
import backgroundVideo from '../../assets/BackgroundVideo.mp4';

{/* Loops the background video */}
const Background = () => {
  return (
    <div className="background-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src={backgroundVideo} type="video/mp4" />
        {/* Handles users who can't display mp4 */}
        Your browser does not support the video tag.
      </video>
      <div className="background-overlay" />
    </div>
  );
};

export default Background;