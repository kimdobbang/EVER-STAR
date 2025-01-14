import React from 'react';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { ProgressBar } from 'components/molecules/ProgressBar/ProgressBar';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';

type ViewMemorialBookSize = 'large' | 'medium' | 'small' | 'full';
type ViewMemorialBookTheme = 'focus' | 'hover' | 'white';
type ButtonIcon = 'SmallStarImg' | 'SmallEarthImg';

interface ProgressCardProps {
  fill: number;
  buttonTheme: ViewMemorialBookTheme;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  buttonIcon: ButtonIcon;
  onButtonClick: () => void;
  className?: string;
}

const milestoneColors = [
  { min: 0, max: 6, message: ' 무지개를 완성해보아요', color: 'bg-pink-300' },
  {
    min: 7,
    max: 13,
    message: ' 빨강 무지개를 완성했어요.',
    color: 'bg-red-500',
  },
  {
    min: 14,
    max: 20,
    message: ' 주황 무지개를 완성했어요.',
    color: 'bg-orange-500',
  },
  {
    min: 21,
    max: 27,
    message: ' 노랑 무지개를 완성했어요.',
    color: 'bg-yellow-400',
  },
  {
    min: 28,
    max: 34,
    message: ' 초록 무지개를 완성했어요.',
    color: 'bg-green-500',
  },
  {
    min: 35,
    max: 41,
    message: ' 파랑 무지개를 완성했어요.',
    color: 'bg-blue-500',
  },
  {
    min: 42,
    max: 48,
    message: ' 남색 무지개를 완성했어요.',
    color: 'bg-indigo-600',
  },
  {
    min: 49,
    max: 49,
    message: ' 무지개를 완성했어요!',
    color: 'bg-purple-600',
  },
];

const getMessage = (fill: number) => {
  if (fill >= 49) {
    return ' 무지개를 완성했어요!';
  }

  for (const milestone of milestoneColors) {
    if (fill >= milestone.min && fill <= milestone.max) {
      return milestone.message;
    }
  }
  return '';
};

export const ProgressCard: React.FC<ProgressCardProps> = ({
  fill,
  buttonTheme,
  buttonDisabled,
  buttonText,
  buttonIcon,
  onButtonClick,
  className,
}) => {
  const getLargeIcon = () => {
    if (buttonIcon === 'SmallEarthImg') {
      return <LogoIcons variant='middle-star' />;
    } else {
      return <LogoIcons variant='middle-earth' />;
    }
  };

  const getSmallIcon = () => {
    if (buttonIcon === 'SmallEarthImg') {
      return <LogoIcons variant='small-earth-img' />;
    } else {
      return <LogoIcons variant='small-star-img' />;
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-center items-center w-full ${className}`}
    >
      <div className='flex items-center justify-center w-full gap-2 mb-4'>
        <span className='text-greyscaleblack-100 font-kor-h-h2'>
          지금은, <br />{' '}
        </span>
        {getLargeIcon()}
      </div>

      <PrimaryButton
        theme={buttonTheme}
        size={'full'}
        disabled={buttonDisabled}
        onClick={onButtonClick}
        icon={getSmallIcon()}
        fullWidth={true}
      >
        {buttonText}
      </PrimaryButton>

      <div className='flex flex-col items-center justify-center w-full mt-4 bg-white rounded-lg shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] p-4'>
        <div className='w-full'>
          <ProgressBar
            className='w-full h-1 bg-gray-200 rounded-lg'
            fill={fill}
          />
        </div>
        <div className='w-full mt-2 text-center font-kor-p-p2 text-greyscaleblack-100'>
          {getMessage(fill)}
        </div>
      </div>
    </div>
  );
};
