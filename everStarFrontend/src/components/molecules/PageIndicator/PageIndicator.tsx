import React from 'react';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='inline-flex items-center gap-[25px] relative z-10'>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        <ArrowIcon size={24} direction='left' hover={true} />
      </button>
      <div className="relative w-fit mt-[-1.00px] [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#1f2329] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
        {currentPage} / {totalPages}
      </div>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        <ArrowIcon size={24} direction='right' hover={true} />
      </button>
    </div>
  );
};
