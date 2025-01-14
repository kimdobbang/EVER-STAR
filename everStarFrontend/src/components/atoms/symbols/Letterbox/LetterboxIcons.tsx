import React from 'react';
import { ReactComponent as LetterboxIcon } from 'assets/symbols/letterbox.svg';

interface LetterboxIconsProps {
  variant: 'letterbox' | 'letterbox-alert' | 'letterbox-text';
  number?: number;
  size?: number; // 아이콘의 크기를 설정할 수 있는 prop
  onClick?: () => void;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const LetterboxIcons: React.FC<LetterboxIconsProps> = ({
  variant,
  number,
  size = 24, // 기본 크기를 24px로 설정
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
      {variant === 'letterbox-text' ? (
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
          편지함
        </div>
      ) : (
        <>
          <LetterboxIcon
            style={{
              width: `${size}px`, // SVG 아이콘의 크기 조정
              height: `${size}px`,
            }}
          />
          {variant === 'letterbox-alert' && number !== undefined && (
            <svg
              width={size / 1.5} // Alert 아이콘의 크기를 size에 비례하여 조정
              height={size / 1.5}
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: `translate(${size / 4}px, -${size / 4}px)`, // 크기에 맞게 위치 조정
              }}
            >
              <circle cx='8' cy='8' r='8' fill='#FF9078' />
              <text
                x='8'
                y='8'
                textAnchor='middle'
                fill='#1F2329'
                fontSize={`${size / 5}px`} // 텍스트 크기 조정
                fontFamily='Arial'
                dy='.3em'
              >
                {number}
              </text>
            </svg>
          )}
        </>
      )}
    </div>
  );
};

export type { LetterboxIconsProps };
