import React from 'react';
import defaultAvatarSrc from 'assets/symbols/avatar.png'; // 기본 이미지 import

interface AvatarProps {
  size?: 'small' | 'medium' | 'large' | 'text' | 'square';
  iconSize?: number; // 아이콘 크기를 위한 새로운 prop
  src?: string; // 선택적 prop 추가
  name?: string;
  className?: string; // 추가된 부분
  onClick?: () => void; // 추가된 클릭 이벤트 핸들러
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  crossOrigin?: 'anonymous' | 'use-credentials' | ''; // CORS 설정을 위한 prop 추가
}

const sizeMap = {
  small: '24px',
  medium: '120px',
  large: '180px',
  square: '364px', // square에 대한 너비를 설정
};

export const Avatar: React.FC<AvatarProps> = ({
  size,
  iconSize,
  src,
  name,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  crossOrigin, // CORS 설정 prop
}) => {
  const computedSize =
    iconSize || sizeMap[size as 'small' | 'medium' | 'large' | 'square'] || sizeMap.small;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {size === 'text' ? (
        <div
          style={{
            width: computedSize,
            height: computedSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Noto_Sans-Bold',Helvetica",
            fontWeight: 'bold',
            fontSize: '8px',
            color: 'black',
            lineHeight: '8px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          마이페이지
        </div>
      ) : (
        <img
          src={src || defaultAvatarSrc}
          alt="avatar"
          crossOrigin={crossOrigin} // CORS 설정을 위한 prop
          style={{
            width: computedSize,
            height: size === 'square' ? '250px' : computedSize, // square일 때 높이를 250px로 설정
            borderRadius: size === 'square' ? '0%' : '50%',
            objectFit: 'cover', // 이미지의 비율을 유지하면서 크기에 맞게 조정
          }}
        />
      )}
      {size === 'medium' && name && (
        <div
          style={{
            fontFamily: 'var(--kor-subtitle-subtitle1-font-family)',
            marginTop: '8px',
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export type { AvatarProps };
