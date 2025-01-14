import PropTypes from 'prop-types';
import React from 'react';
import './Clipboard.css';
interface ClipboardProps {
  status: 'copied' | 'default';
  className?: string;
}

export const Clipboard = ({
  status,
  className,
}: ClipboardProps): JSX.Element => {
  return (
    <div
      className={`w-80 flex flex-col items-center gap-2 shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] px-4 py-2 h-14 overflow-hidden rounded-xl justify-center bg-white relative ${className}`}
    >
      <div className='w-full flex self-stretch items-start gap-1 flex-[0_0_auto] relative'>
        <div className='relative flex items-center flex-1 grow'>
          <div className="[font-family:'Noto_Sans_KR-Bold',Helvetica] mt-[-1.00px] tracking-[-1.28px] text-base flex-1 text-[#8c929d] font-bold leading-[normal] relative">
            htts://localhost:8000
          </div>
        </div>
      </div>
      {status === 'default' && (
        <svg
          className={`${className}`}
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5'
            stroke='#3F3F46'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
      )}
      {status === 'copied' && (
        <svg
          className='absolute w-6 h-6 top-4 left-[280px]'
          fill='none'
          height='24'
          viewBox='0 0 24 24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M9 14L11 16L15 12'
            stroke='#3F3F46'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>
      )}
    </div>
  );
};

Clipboard.propTypes = {
  status: PropTypes.oneOf(['copied', 'default']).isRequired,
  className: PropTypes.string,
};

export type { ClipboardProps };
