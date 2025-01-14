import PropTypes from 'prop-types';
import './Lable.css';
import React from 'react';

interface LableProps {
  prop: string;
  show: boolean;
  font: 'kyobo' | 'default';
  className: string;
}

export const Lable = ({
  prop = '레이블',
  show = true,
  font,
  className,
}: LableProps): JSX.Element => {
  return (
    <div className={`inline-flex items-start gap-1 relative ${className}`}>
      <div
        className={`w-fit mt-[-1.00px] tracking-[-1.04px] text-[13px] text-[#1f2329] text-center leading-[normal] relative ${font === 'kyobo' ? "[font-family:'Kyobo_Handwriting_2019-Regular',Helvetica]" : "[font-family:'Noto_Sans_KR-Bold',Helvetica]"} ${font === 'kyobo' ? 'font-normal' : 'font-bold'}`}
      >
        {prop}
      </div>
      {show && (
        <div className="[font-family:'Noto_Sans_KR-Bold',Helvetica] w-fit mt-[-1.00px] tracking-[-1.04px] text-[13px] text-[#fd2929] font-bold text-center leading-[normal] relative">
          *
        </div>
      )}
    </div>
  );
};

Lable.propTypes = {
  prop: PropTypes.string,
  show: PropTypes.bool,
  font: PropTypes.oneOf(['kyobo', 'default']),
};

export type { LableProps };
