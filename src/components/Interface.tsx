import { useEffect, useRef, useState } from "react";
import audioFile from "/audio.mp3?url";

const BANDS_TRANSITION_TIME_IN_MS = 2000;

const Interface = () => {
  const audio = useRef(new Audio(audioFile));
  const audioFadoutInterval = useRef<number>();
  const [isCinematic, setIsCinematic] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!isButtonDisabled) return;
    const timeout = setTimeout(() => {
      setIsButtonDisabled(false);
    }, BANDS_TRANSITION_TIME_IN_MS);
    return () => {
      clearTimeout(timeout);
    };
  }, [isButtonDisabled]);

  useEffect(() => {
    return () => {
      clearInterval(audioFadoutInterval.current);
    };
  }, []);

  const fadeoutAudio = () => {
    if (audio.current) {
      const stepInMs = 10;
      const volumeStep =
        audio.current.volume / (BANDS_TRANSITION_TIME_IN_MS / stepInMs);

      audioFadoutInterval.current = setInterval(() => {
        const isDone = audio.current.volume <= volumeStep;
        if (isDone) {
          audio.current.pause();
          audio.current.currentTime = 0; // Reset to the beginning
          audio.current.volume = 1; // Reset volume to max
          clearInterval(audioFadoutInterval.current);
        } else {
          audio.current.volume = Math.max(0, audio.current.volume - volumeStep); // Decrease volume
        }
      }, stepInMs);
    }
  };

  const onToggleCinematicMode = () => {
    if (isCinematic) fadeoutAudio();
    else audio.current.play();
    setIsCinematic((state) => !state);
    setIsButtonDisabled(true);
  };

  return (
    <>
      <div className={`band upper ${isCinematic && "cinematic"}`} />
      <div className={`band lower ${isCinematic && "cinematic"}`} />
      <button
        className={`cinematic-btn ${isCinematic && "cinematic"}`}
        disabled={isButtonDisabled}
        onClick={onToggleCinematicMode}
      >
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeWidth=".00032"
          version="1.1"
          viewBox="0 0 32 32"
        >
          <path d="m26 16h-20c-1.7 0-3-1.3-3-3s1.3-3 3-3h20c1.7 0 3 1.3 3 3s-1.3 3-3 3z" />
          <path d="m26.7 14.3c-0.1-0.2-0.4-0.3-0.7-0.3h-20c-0.3 0-0.6 0.1-0.7 0.3-0.2 0.3-0.3 0.5-0.3 0.8l2 16c0.1 0.5 0.5 0.9 1 0.9h5c-0.5 0-1-0.4-1-0.9l-1-14c0-0.6 0.4-1 0.9-1.1 0.6 0 1 0.4 1.1 0.9l1 14c0 0.6-0.4 1-0.9 1.1h-0.1 6-0.1c-0.6 0-1-0.5-0.9-1.1l1-14c0-0.6 0.5-1 1.1-0.9 0.6 0 1 0.5 0.9 1.1l-1 14c0 0.5-0.5 0.9-1 0.9h5c0.5 0 0.9-0.4 1-0.9l2-16c0-0.3-0.1-0.5-0.3-0.8z" />
          <path d="m25.8 12h-19.6c-0.4 0-0.8-0.3-0.9-0.7-0.2-0.4-0.3-0.8-0.3-1.3 0-1.5 0.8-2.8 2-3.5v-0.5c0-2.2 1.8-4 4-4 0.5 0 1 0.1 1.4 0.3 0.7-1.4 2-2.3 3.6-2.3s2.9 0.9 3.6 2.3c0.4-0.2 0.9-0.3 1.4-0.3 2.2 0 4 1.8 4 4v0.5c1.2 0.7 2 2 2 3.5 0 0.5-0.1 0.9-0.2 1.3-0.2 0.4-0.5 0.7-1 0.7zm-18.8-2h18c0-0.9-0.6-1.7-1.5-1.9-0.3-0.1-0.5-0.3-0.6-0.5-0.1-0.3-0.1-0.6 0-0.8 0.1-0.3 0.1-0.6 0.1-0.8 0-1.1-0.9-2-2-2-0.5 0-1 0.2-1.3 0.5s-0.7 0.3-1 0.2c-0.4-0.1-0.7-0.5-0.7-0.8-0.1-1.1-1-1.9-2-1.9s-1.9 0.8-2 1.9c0 0.4-0.3 0.7-0.6 0.9-0.4 0.1-0.8 0.1-1-0.2-0.4-0.4-0.9-0.6-1.4-0.6-1.1 0-2 0.9-2 2 0 0.2 0 0.5 0.1 0.7 0.1 0.3 0.1 0.6 0 0.8-0.1 0.3-0.3 0.5-0.6 0.6-0.9 0.2-1.5 1-1.5 1.9z" />
        </svg>
      </button>
    </>
  );
};

export default Interface;
