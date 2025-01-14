import React from 'react';
import { ProgressBar } from 'components/molecules/ProgressBar/ProgressBar';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';

interface Props {
  className: string;
  fill: number; // 0 to 49
}

const getFillMessage = (fill: number) => {
  if (fill >= 0 && fill <= 6) return '무지개를 만드는 중이에요.';
  if (fill >= 7 && fill <= 13) return '빨간색 무지개를 완성했어요.';
  if (fill >= 14 && fill <= 20) return '주황색 무지개를 완성했어요.';
  if (fill >= 21 && fill <= 27) return '노란색 무지개를 완성했어요.';
  if (fill >= 28 && fill <= 34) return '초록색 무지개를 완성했어요.';
  if (fill >= 35 && fill <= 41) return '파란색 무지개를 완성했어요.';
  if (fill >= 42 && fill <= 48) return '남색 무지개를 완성했어요.';
  if (fill === 49) return '보라색 무지개를 완성했어요.';
  return '';
};

export const CardProgress: React.FC<Props> = ({
  className,
  fill,
}): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-80 h-[200px] items-start gap-[19px] pl-4 pr-2 py-6 relative bg-[#f3f6fb] shadow-[0px_4px_4px_#00000040] ${className}`}
    >
      <div className='flex w-72 items-center justify-center gap-8 relative flex-[0_0_auto]'>
        <div className='relative w-fit mt-[-1.00px] font-kor-h-h1 font-[number:var(--kor-h-h1-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h1-font-size)] tracking-[var(--kor-h-h1-letter-spacing)] leading-[var(--kor-h-h1-line-height)] [font-style:var(--kor-h-h1-font-style)]'>
          현재 위치
        </div>
        <LogoIcons variant='small-earth' />
      </div>
      <div className='inline-flex flex-col items-start gap-[13px] p-6 relative flex-[0_0_auto] bg-white rounded-xl'>
        <ProgressBar className='!flex-[0_0_auto]' fill={fill} />
      </div>
      <div className='relative w-[298px] h-[18px] mr-[-2.00px] font-kor-p-p1 font-[number:var(--kor-p-p1-font-weight)] text-black text-[length:var(--kor-p-p1-font-size)] text-center tracking-[var(--kor-p-p1-letter-spacing)] leading-[var(--kor-p-p1-line-height)] whitespace-nowrap [font-style:var(--kor-p-p1-font-style)]'>
        {getFillMessage(fill)}
      </div>
    </div>
  );
};
