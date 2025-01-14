/** React */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/** Components */
import { PlayButton } from 'components/atoms/buttons/PlayButton';
import MusicProgressbar from './MusicProgressbar';

interface MusicControlButtonProps {
  duration: number; // Duration in seconds
}

export const MusicControlButton: React.FC<MusicControlButtonProps> = ({
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPauseRestart = () => {
    if (isPlaying) {
      // If currently playing, pause the music
      setIsPlaying(false);
    } else if (currentTime >= duration) {
      // If music is finished, restart from the beginning
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      // If currently paused, resume the music
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            clearInterval(interval!);
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  const getPlayButtonProps = () => {
    if (isPlaying) return { direction: 'stop', size: 16 };
    if (currentTime >= duration) return { direction: 'play', size: 16 };
    return { direction: 'play', size: 16 };
  };

  return (
    <ButtonContainer>
      <MusicProgressbar
        musicDuration={duration}
        value={currentTime / duration}
        onChange={(value) => setCurrentTime(value * duration)}
        initialValue={currentTime / duration}
      />
      <PlayButton
        {...getPlayButtonProps()}
        size={16}
        onClick={handlePlayPauseRestart}
        direction='play'
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
