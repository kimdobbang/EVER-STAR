import React from 'react';
import { ReactComponent as CloseCircleIconSVG } from '../../../../assets/icons/close-circle.svg';

interface CloseCircleIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
}

const CloseCircleIcon: React.FC<CloseCircleIconProps> = ({ size, color = 'black' }) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };

  return <CloseCircleIconSVG className={`${sizeClasses} ${colorClasses[color]}`} />;
};

export default CloseCircleIcon;
export type { CloseCircleIconProps };