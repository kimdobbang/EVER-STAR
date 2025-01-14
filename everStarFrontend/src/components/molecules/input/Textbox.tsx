import PropTypes from 'prop-types';
import React from 'react';
import { Lable } from 'components/atoms/texts/Lable';
import { InformationText } from 'components/atoms/texts/InformationText';

interface TextboxProps {
  type: 'large' | 'small';
  className?: string;
  label: string;
  showInfoText?: boolean;
  infoText?: string;
  infoTextAlign?: 'left' | 'center' | 'right';
  showStar?: boolean;
  ghostText?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textbox = ({
  type,
  className = '',
  label,
  showInfoText = true,
  infoTextAlign = 'left',
  showStar = true,
  ghostText = '',
  maxLength = 255,
  value = '',
  onChange = () => {},
}: TextboxProps): JSX.Element => {
  const getInfoText = () => {
    const length = value.length;
    return `${length}/${maxLength}`;
  };

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // 높이를 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 컨텐츠에 맞게 높이를 조정
  };

  return (
    <div
      className={`flex-col items-start relative ${type === 'large' ? 'w-80' : ''} ${type === 'large' ? 'flex' : 'inline-flex'} ${className}`}
    >
      <div
        className={`flex flex-col items-start gap-2 relative ${type === 'large' ? 'w-full' : 'w-80'} ${type === 'large' ? 'self-stretch' : ''} ${type === 'small' ? 'flex-[0_0_auto]' : ''}`}
      >
        <Lable
          prop={label}
          show={showStar}
          font='kyobo'
          className='!flex-[0_0_auto]'
        />
        <div
          className={`flex shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] relative w-full flex-col rounded-xl gap-2 bg-white self-stretch overflow-hidden ${type === 'large' ? 'items-start' : 'items-center'} ${type === 'large' ? 'flex-1' : ''} ${type === 'large' ? 'p-4' : 'px-4 py-2'} ${type === 'small' ? 'h-14' : ''} ${type === 'small' ? 'justify-center' : ''}`}
        >
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e);
              autoResize(e); // 텍스트 입력 시 높이 조절
            }}
            className='w-full p-2 text-base text-[#8c929d] font-bold leading-[normal] border-none outline-none resize-none overflow-hidden'
            placeholder={ghostText}
            rows={2} // 기본 줄 수를 2로 설정
            style={{ maxHeight: '10em', minHeight: '4em' }} // 최소와 최대 높이를 지정
          />
        </div>
        {showInfoText && (
          <InformationText
            state='default'
            align={infoTextAlign}
            className='mt-2'
          >
            {getInfoText()}
          </InformationText>
        )}
      </div>
    </div>
  );
};

Textbox.propTypes = {
  type: PropTypes.oneOf(['large', 'small']).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  showInfoText: PropTypes.bool,
  infoText: PropTypes.string,
  infoTextAlign: PropTypes.oneOf(['left', 'center', 'right']),
  showStar: PropTypes.bool,
  ghostText: PropTypes.string,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export type { TextboxProps };
