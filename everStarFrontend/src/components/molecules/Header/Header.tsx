import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/earth');
  };

  return (
    <div className={`flex h-14 items-center justify-start ms-10 ${className}`}>
      <LogoIcons
        variant='middle-star'
        className='cursor-pointer'
        onClick={handleLogoClick}
      />
    </div>
  );
};
