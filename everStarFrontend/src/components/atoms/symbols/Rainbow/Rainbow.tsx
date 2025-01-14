import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as YellowRainbow } from 'assets/symbols/rainbow-yellow.svg';
import { ReactComponent as OrangeRainbow } from 'assets/symbols/rainbow-orange.svg';
import { ReactComponent as GreenRainbow } from 'assets/symbols/rainbow-green.svg';
import { ReactComponent as BlueRainbow } from 'assets/symbols/rainbow-blue.svg';
import { ReactComponent as IndigoRainbow } from 'assets/symbols/rainbow-indigo.svg';
import { ReactComponent as VioletRainbow } from 'assets/symbols/rainbow-violet.svg';
import { ReactComponent as RedRainbow } from 'assets/symbols/rainbow-red.svg';

interface Props {
  color: 'none' | 'yellow' | 'violet' | 'blue' | 'green' | 'orange' | 'red' | 'indigo';
  className?: string;
}

export const Rainbow: React.FC<Props> = ({ color, className }): JSX.Element => {
  return (
    <div className={`w-[1440px] h-[1024px] ${className}`}>
      {color === 'yellow' && (
        <YellowRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'orange' && (
        <OrangeRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'green' && (
        <GreenRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'blue' && (
        <BlueRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'indigo' && (
        <IndigoRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'violet' && (
        <VioletRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
      {color === 'red' && (
        <RedRainbow className='w-[1243px] left-0 top-0 object-cover h-[1024px] absolute' />
      )}
    </div>
  );
};

Rainbow.propTypes = {
  color: PropTypes.oneOf(['none', 'yellow', 'violet', 'blue', 'green', 'orange', 'red', 'indigo'])
    .isRequired as PropTypes.Validator<
    'none' | 'yellow' | 'violet' | 'blue' | 'green' | 'orange' | 'red' | 'indigo'
  >,
  className: PropTypes.string,
};
