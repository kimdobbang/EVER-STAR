import React from 'react';
import { ReactComponent as EarthIcon } from 'assets/symbols/logo-earth.svg';
import { ReactComponent as SmallEarthIcon } from 'assets/symbols/logo-small-earth.svg';
import { ReactComponent as SmallEarthImg } from 'assets/symbols/logo-earth-img.svg';
import { ReactComponent as VerticalEarthIcon } from 'assets/symbols/logo-vertical-earth.svg';
import { ReactComponent as SmallStarIcon } from 'assets/symbols/logo-small-star.svg';
import { ReactComponent as StarIcon } from 'assets/symbols/logo-star.svg';
import { ReactComponent as SmallStarImg } from 'assets/symbols/logo-star-img.svg';
import { ReactComponent as VerticalStarIcon } from 'assets/symbols/logo-vertical-star.svg';

interface LogoIconsProps {
  variant:
    | 'earth'
    | 'small-earth'
    | 'small-earth-img'
    | 'vertical-earth'
    | 'middle-earth' // 추가된 옵션
    | 'small-star'
    | 'small-star-img'
    | 'star'
    | 'vertical-star'
    | 'middle-star' // 추가된 옵션
    | 'earth-text'
    | 'star-text';
  onClick?: () => void;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const iconMap = {
  earth: EarthIcon,
  'small-earth': SmallEarthIcon,
  'small-earth-img': SmallEarthImg,
  'vertical-earth': VerticalEarthIcon,
  'middle-earth': EarthIcon, // middle-earth는 earth를 사용하되 크기만 조절
  'small-star': SmallStarIcon,
  'small-star-img': SmallStarImg,
  star: StarIcon,
  'vertical-star': VerticalStarIcon,
  'middle-star': StarIcon, // middle-star는 star를 사용하되 크기만 조절
};

export const LogoIcons: React.FC<LogoIconsProps> = ({
  variant,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  const renderContent = () => {
    if (variant === 'earth-text') {
      return (
        <div
          style={{
            position: 'relative',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Noto_Sans-Bold',Helvetica",
            fontWeight: 'bold',
            fontSize: '8px',
            color: 'black',
            lineHeight: '8px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          지구별
        </div>
      );
    } else if (variant === 'star-text') {
      return (
        <div
          style={{
            position: 'relative',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Noto_Sans-Bold',Helvetica",
            fontWeight: 'bold',
            fontSize: '8px',
            color: 'black',
            lineHeight: '8px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          영원별
        </div>
      );
    } else {
      const IconComponent = iconMap[variant as keyof typeof iconMap];
      const sizeStyle = variant.startsWith('middle')
        ? { width: '100px', height: '50px' }
        : {};

      return <IconComponent className={className} style={sizeStyle} />;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex flex-col items-center ${className}`}
    >
      {renderContent()}
    </div>
  );
};

export type { LogoIconsProps };
