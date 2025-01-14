import React from 'react';
import { ReactComponent as CloseIconSVG } from 'assets/icons/close.svg';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/Store';

interface CloseIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
}

export const CloseIcon: React.FC<CloseIconProps> = ({
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

  const params = useParams<{ pet: string }>();
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  const isVisible = params.pet && petId && Number(params.pet) === petId;

  if (!isVisible) {
    return <div className='mt-5'></div>;
  }
  return <CloseIconSVG className={`${sizeClasses} ${colorClasses[color]}`} />;
};

export type { CloseIconProps };
