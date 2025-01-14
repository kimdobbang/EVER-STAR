import React from 'react';
import BookIconDefault from 'assets/symbols/book-default.webp';
import BookIconOpen from 'assets/symbols/book-open.webp';

interface BookIconsProps {
  variant: 'book-close' | 'book-open';
  altText?: string;
  className?: string;
}

export const BookIcons: React.FC<BookIconsProps> = ({
  variant,
  altText = 'Book Icon',
  className,
}) => {
  return (
    <img
      src={variant === 'book-close' ? BookIconDefault : BookIconOpen}
      alt={altText}
      className={className}
      width={variant === 'book-close' ? 117 : 156} // 너비 설정
      height={124} // 높이 설정 (두 이미지 모두 동일)
    />
  );
};

export type { BookIconsProps };
