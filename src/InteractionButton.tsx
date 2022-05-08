import "./style.css";

interface InteractionButtonProps {
  progressToClick: number;
  startPTCInterval: () => void;
  stopPTCInterval: () => void;
  setProgressToClick: React.Dispatch<React.SetStateAction<number>>;
}

const InteractionButton: React.FC<InteractionButtonProps> = ({
  progressToClick,
  startPTCInterval,
  stopPTCInterval,
  setProgressToClick,
}) => {
  const handleClick = (): void => {
    // Set a random background color on click
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = "#" + randomColor;
  };

  // User moved closed enough to 'click'
  if (progressToClick >= 1) {
    stopPTCInterval();
    handleClick();
  }

  // Set the wave background image's position based on how close the user is to pressing the button
  // If we are no longer moving towards the click (i.e the mouse is not over the button) then
  // transition back to the start position
  const wavePosition = (): React.CSSProperties => {
    if (progressToClick > 0) {
      return {
        backgroundPosition: `${progressToClick * 200}% ${
          progressToClick * 230 - 180
        }%`,
      };
    }
    return {
      transition: "0.5s ease-out",
    };
  };

  return (
    <div>
      <button
        style={wavePosition()}
        className={`button ${progressToClick >= 1 ? "buttonActive" : ""}`}
        // When mouse enters start the progressToClick interval to mimic a user
        // moving towards the button
        onMouseEnter={startPTCInterval}
        // When mouse leaves stop the interval and reset the progressToClick
        onMouseLeave={() => {
          stopPTCInterval();
          setProgressToClick(0);
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default InteractionButton;
