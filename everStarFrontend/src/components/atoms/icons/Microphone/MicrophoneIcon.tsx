import React from 'react';
import { ReactComponent as MicrophoneIconSVG } from 'assets/icons/microphone.svg';

interface MicrophoneIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
}

export const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({
  size,
  color = 'black',
}) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };

  return (
    <MicrophoneIconSVG className={`${sizeClasses} ${colorClasses[color]}`} />
  );
};

export type { MicrophoneIconProps };
