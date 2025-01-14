import PropTypes from 'prop-types';
import React from 'react';
import { Lable } from '../../atoms/icons/inputfiled/Lable';
import './Imagebox.css';

interface ImageboxProps {
  imageState: 'done' | 'default';
  className?: string;
}

export const Imagebox = ({
  imageState,
  className,
}: ImageboxProps): JSX.Element => {
  return (
    <div
      className={`inline-flex flex-col items-start gap-[73px] relative ${className}`}
    >
      <div className='inline-flex flex-col items-start gap-2 flex-[0_0_auto] relative'>
        <div className='w-80 flex flex-col items-start gap-2 flex-[0_0_auto] relative'>
          <Lable className='!flex-[0_0_auto]' prop='레이블' show font='kyobo' />
        </div>
        <div
          className={`w-80 flex items-center px-6 py-2 h-16 rounded-xl justify-center relative ${imageState === 'default' ? 'shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]' : ''} ${imageState === 'default' ? 'overflow-hidden' : ''} ${imageState === 'done' ? 'bg-[#f0f2f6]' : 'bg-white'}`}
        >
          <div
            className={`[font-family:'Noto_Sans_KR-Bold',Helvetica] tracking-[-1.28px] text-base flex-1 font-bold text-center leading-[normal] relative ${imageState === 'done' ? 'text-[#c3c9d3]' : 'text-[#1f2329]'}`}
          >
            {imageState === 'default' && <>이미지 추가</>}
            {imageState === 'done' && <>업로드 완료</>}
          </div>
        </div>
      </div>
    </div>
  );
};

Imagebox.propTypes = {
  imageState: PropTypes.oneOf(['done', 'default']),
};

export type { ImageboxProps };
