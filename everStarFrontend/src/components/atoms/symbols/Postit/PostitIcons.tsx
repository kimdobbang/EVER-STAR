import React from 'react';
import { ReactComponent as Postit } from 'assets/symbols/postit.svg';

interface PostitIconsProps {
  variant: 'postit' | 'postit-text';
  text?: string;
  size?: number; // 아이콘의 크기를 설정할 수 있는 prop
  onClick?: () => void;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PostitIcons: React.FC<PostitIconsProps> = ({
  variant,
  text,
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
      {variant === 'postit-text' ? (
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
          {text || '텍스트'}
        </div>
      ) : (
        <Postit
          style={{
            width: `${size}px`, // SVG 아이콘의 크기 조정
            height: `${size}px`,
          }}
        />
      )}
    </div>
  );
};

export type { PostitIconsProps };
