import React from 'react';

interface Props {
  totalPages: number;
  activePage: number;
  className?: string;
  onClick?: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({ totalPages, activePage, className, onClick }) => {
  const dots = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleClick = (page: number) => {
    if (onClick) {
      onClick(page);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-1 py-0 relative ${className}`}>
      {dots.map((page) => (
        <div
          key={page}
          className={`relative cursor-pointer ${page === activePage ? 'w-2.5 h-2.5 bg-[#ff9078] rounded-[5px]' : 'w-1.5 h-1.5 bg-[#dbe4eb] rounded-[3px]'}`}
          onClick={() => handleClick(page)}
        />
      ))}
    </div>
  );
};
