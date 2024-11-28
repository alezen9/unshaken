import { useEffect, useRef, useState } from "react";
import audioFile from "/audio.mp3?url";
import useCinematicMode from "../stores/useCinematicMode";

const BANDS_TRANSITION_TIME_IN_MS = 2000;

const Interface = () => {
  const audio = useRef(new Audio(audioFile));
  const audioFadoutInterval = useRef<number>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { toggleCinematic, isCinematicActive } = useCinematicMode();

  useEffect(() => {
    audio.current.loop = true;
  }, []);

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
    if (!audio.current) return;
    const stepInMs = 10;
    const volumeStep =
      audio.current.volume / (BANDS_TRANSITION_TIME_IN_MS / stepInMs);

    audioFadoutInterval.current = setInterval(() => {
      const isDone = audio.current.volume <= volumeStep;
      if (isDone) {
        audio.current.pause();
        if (!audio.current.paused) {
          audio.current.src = "";
          audio.current.load();
        }
        audio.current.currentTime = 0; // Reset to the beginning
        audio.current.volume = 1; // Reset volume to max
        clearInterval(audioFadoutInterval.current);
      } else {
        audio.current.volume = Math.max(0, audio.current.volume - volumeStep); // Decrease volume
      }
    }, stepInMs);
  };

  const onToggleCinematicMode = () => {
    if (isCinematicActive) fadeoutAudio();
    else audio.current.play();
    toggleCinematic();
    setIsButtonDisabled(true);
  };

  return (
    <>
      <div className={`band upper ${isCinematicActive && "cinematic"}`} />
      <div className={`band lower ${isCinematicActive && "cinematic"}`} />
      <button
        className={`cinematic-btn ${isCinematicActive && "cinematic"}`}
        disabled={isButtonDisabled}
        onClick={onToggleCinematicMode}
      >
        {!isCinematicActive && (
          <svg
            viewBox="-3 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="M21.415 12.554 2.418.311C1.291-.296 0-.233 0 1.946v24.108c0 1.992 1.385 2.306 2.418 1.635l18.997-12.243a2.076 2.076 0 0 0 0-2.892"
              fillRule="evenodd"
            />
          </svg>
        )}
        {isCinematicActive && (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 5v14a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3ZM8 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h1Z"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default Interface;
