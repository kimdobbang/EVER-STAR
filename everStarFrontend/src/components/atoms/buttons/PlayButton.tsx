import React from 'react';
import { ReactComponent as ButtonPlay } from 'assets/icons/button-play.svg';
import { ReactComponent as ButtonStop } from 'assets/icons/button-stop.svg';

interface PlayButtonProps {
  size: 16 | 24;
  direction: 'play' | 'stop';
  hover?: boolean;
  onClick?: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  size,
  direction,
  hover = false,
  onClick,
}) => {
  let IconComponent;
  switch (direction) {
    case 'play':
      IconComponent = ButtonPlay;
      break;
    case 'stop':
      IconComponent = ButtonStop;
      break;
    default:
      IconComponent = ButtonPlay;
  }

  const sizeClasses = size === 16 ? 'w-16 h-16' : 'w-24 h-24';
  const hoverClass = hover ? 'hover:text-mainprimary' : '';

  return (
    <IconComponent
      className={`${sizeClasses} ${hoverClass}`}
      onClick={onClick}
    />
  );
};

export type { PlayButtonProps };
