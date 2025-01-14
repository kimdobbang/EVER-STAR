import React from 'react';
import { AtomBookcover } from 'components/atoms/images/Bookcover/Bookcover';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';

interface MemorialBookCoverProps {
  className?: string;
  src?: string;
}

export const MemorialBookCover: React.FC<MemorialBookCoverProps> = ({ className, src }) => {
  // 캐시 방지를 위해 src에 timestamp를 추가
  const imageUrl = src ? `${src}?timestamp=${Date.now()}` : undefined;

  return (
    <div
      className={`flex w-[360px] h-[508px] items-center justify-center relative border border-solid border-black shadow-[0px_4px_4px_#00000040] ${className}`}
    >
      <AtomBookcover />
      <Avatar
        src={imageUrl}
        size="large"
        name="memorial"
        className="!absolute !left-[100px] !top-[130px]"
        crossOrigin="anonymous" // CORS 문제 해결을 위한 속성
      />
    </div>
  );
};

export type { MemorialBookCoverProps };
