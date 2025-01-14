import React from 'react';
import { ReactComponent as PencilIconSVG } from 'assets/icons/pencil.svg';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/Store';

interface PencilIconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
  onClick?: () => void; // onClick 속성 추가
  disabled?: boolean;
}

export const PencilIcon: React.FC<PencilIconProps> = ({
  size,
  color = 'black',
  onClick, // onClick 속성 추가
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
    return null;
  }
  return (
    <PencilIconSVG
      className={`${sizeClasses} ${colorClasses[color]}`}
      onClick={onClick}
    />
  );
};

export type { PencilIconProps };
