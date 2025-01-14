import PropTypes from 'prop-types';
import React from 'react';
import './InformationText.css';

interface InfomationTextProps {
  text: string;
  state: 'error' | 'default';
  className: string; // Assuming className should be a string
}

export const InformationText = ({
  text = '비밀번호를 입력해 주세요',
  state,
  className,
}: InfomationTextProps): JSX.Element => {
  return (
    <div className={`inline-flex items-start relative ${className}`}>
      <div
        className={`font-family:'Noto_Sans_KR-Regular',Helvetica w-fit mt-[-1.00px] tracking-[-0.96px] text-xs font-normal leading-[normal] relative ${state === 'error' ? 'text-[#fd2929]' : 'text-[#8c929d]'}`}
      >
        {text}
      </div>
    </div>
  );
};

InformationText.propTypes = {
  text: PropTypes.string,
  state: PropTypes.oneOf(['error', 'default']),
};

export type { InfomationTextProps };
