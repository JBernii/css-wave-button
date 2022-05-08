import React, { useCallback } from "react";
import "./style.css";
import InteractionButton from "./InteractionButton";

const App: React.FC = () => {
  // Create a timer to mimic progressToClick
  // Hovering over the button increments progressToClick as though the user is steadily
  // getting closer to the button
  const [progressToClick, setProgressToClick] = React.useState<number>(0);
  // An interval id of 0 means no interval is set
  const [intervalId, setIntervalId] = React.useState<number>(0);

  // PTC = progress to click
  const startPTCInterval = useCallback((): void => {
    // Create an interval which increments progressToClick by 0.01 every 20 millisecond
    // so it takes 2 seconds to press the button
    const newIntervalId = window.setInterval(() => {
      setProgressToClick((prevProg: number): number => prevProg + 0.01);
    }, 20);
    setIntervalId(newIntervalId);
  }, []);

  const stopPTCInterval = useCallback((): void => {
    // If no interval set then return
    if (intervalId !== 0) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }, [intervalId]);

  // Stop interval when app is unmounted
  React.useEffect(() => {
    return () => stopPTCInterval();
  }, [stopPTCInterval]);

  return (
    <div className="center">
      <InteractionButton
        // In reality would just need to pass progressToClick rather than functions to start
        // and stop intervals to mimic the user moving towards the button
        progressToClick={progressToClick}
        startPTCInterval={startPTCInterval}
        stopPTCInterval={stopPTCInterval}
        setProgressToClick={setProgressToClick}
      />
    </div>
  );
};

export default App;
