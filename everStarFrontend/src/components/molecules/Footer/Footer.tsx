import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { useSound } from 'use-sound';
import clickEvent from 'assets/musics/ClickEffect.mp3';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const [ClickEvent] = useSound(clickEvent);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'earth' | 'everstar' | null>(null);

  useEffect(() => {
    if (location.pathname.includes('/earth')) {
      setActiveTab('earth');
    } else if (location.pathname.includes('/everstar')) {
      setActiveTab('everstar');
    }
  }, [location.pathname]);

  const handleNavigateToEarth = () => {
    ClickEvent();
    setActiveTab('earth');
    navigate(`/earth`);
  };

  const handleNavigateToEverstar = () => {
    ClickEvent();
    setActiveTab('everstar');
    navigate(`/everstar/${petId}`);
  };

  if (isMobile) {
    return (
      <div className={`bottom-0 left-0 w-full bg-white shadow-lg ${className}`}>
        <div className='flex justify-around py-2'>
          <button
            onClick={handleNavigateToEarth}
            className={`flex flex-col items-center ${
              activeTab === 'earth' ? 'text-blue-500' : 'hover:text-blue-500'
            }`}
          >
            <LogoIcons
              variant='small-earth-img'
              className={`transition-transform duration-200 ${
                activeTab === 'earth' ? 'scale-110' : 'hover:scale-110'
              }`}
            />
            <span className='text-xs'>지구별</span>
          </button>
          <button
            onClick={handleNavigateToEverstar}
            className={`flex flex-col items-center ${
              activeTab === 'everstar' ? 'text-blue-500' : 'hover:text-blue-500'
            }`}
          >
            <LogoIcons
              variant='small-star-img'
              className={`transition-transform duration-200 ${
                activeTab === 'everstar' ? 'scale-110' : 'hover:scale-110'
              }`}
            />
            <span className='text-xs'>영원별</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <footer
      className={`flex justify-between items-center w-full p-4 bg-gray-100 ${className}`}
    >
      <div className='flex items-center justify-center w-1/2'>
        <button
          onClick={handleNavigateToEarth}
          className={`flex items-center ${
            activeTab === 'earth' ? 'text-blue-500' : 'hover:text-blue-500'
          } cursor-pointer`}
        >
          <LogoIcons variant='small-earth-img' />
          <span>지구별로 이동</span>
        </button>
      </div>
      <div className='flex items-center justify-center w-1/2'>
        <button
          onClick={handleNavigateToEverstar}
          className={`flex items-center ${
            activeTab === 'everstar' ? 'text-blue-500' : 'hover:text-blue-500'
          } cursor-pointer`}
        >
          <LogoIcons variant='small-star-img' />
          <span>영원별로 이동</span>
        </button>
      </div>
    </footer>
  );
};

export type { FooterProps };
