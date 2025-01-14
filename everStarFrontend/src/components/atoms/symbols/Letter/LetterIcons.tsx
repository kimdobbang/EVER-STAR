import React from 'react';
import { ReactComponent as LetterIcon } from 'assets/symbols/letter.svg';

interface LetterIconsProps {
  variant: 'letter' | 'letter-text';
  size?: number; // 아이콘의 크기를 설정할 수 있는 prop
  text?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export const LetterIcons: React.FC<LetterIconsProps> = ({
  variant,
  size = 24, // 기본 크기를 24px로 설정
  text,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
        width: `${size}px`, // Div의 크기를 아이콘 크기에 맞게 조정
        height: `${size}px`,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {variant === 'letter-text' ? (
        <div
          style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Noto_Sans-Bold',Helvetica",
            fontWeight: 'bold',
            fontSize: `${size / 3}px`, // 텍스트 크기도 아이콘 크기에 맞게 조정
            color: 'black',
            lineHeight: `${size / 3}px`,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {text || '편지쓰기'}
        </div>
      ) : (
        <LetterIcon
          style={{
            width: `${size}px`, // SVG 아이콘의 크기 조정
            height: `${size}px`,
          }}
        />
      )}
    </div>
  );
};

export type { LetterIconsProps };
