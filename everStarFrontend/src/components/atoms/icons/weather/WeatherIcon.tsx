import React from 'react';
import { ReactComponent as TypeThunder } from 'assets/icons/thunder.svg';
import { ReactComponent as TypeSun } from 'assets/icons/sun.svg';
import { ReactComponent as TypeRain } from 'assets/icons/rain.svg';
import { ReactComponent as TypeCloud } from 'assets/icons/cloud.svg';
import { ReactComponent as TypeWind } from 'assets/icons/wind.svg';

interface WeatherIconProps {
  type: 'thunder' | 'sun' | 'rain' | 'cloud' | 'wind';
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ type }) => {
  switch (type) {
    case 'thunder':
      return <TypeThunder />;
    case 'sun':
      return <TypeSun />;
    case 'rain':
      return <TypeRain />;
    case 'cloud':
      return <TypeCloud />;
    case 'wind':
      return <TypeWind />;
    default:
      return null;
  }
};

export type { WeatherIconProps };
