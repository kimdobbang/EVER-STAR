import React from 'react';
import kakaoLoginLargeNarrow from 'assets/symbols/kakao_login_large_narrow.png';
import kakaoLoginLargeWide from 'assets/symbols/kakao_login_large_wide.png';
import kakaoLoginMediumNarrow from 'assets/symbols/kakao_login_medium_narrow.png';
import kakaoLoginMediumWide from 'assets/symbols/kakao_login_medium_wide.png';
import kakaoButton from 'assets/symbols/kakao-button.svg';

interface KakaoLoginButtonProps {
  size?: 'large' | 'medium';
  variant?: 'narrow' | 'wide';
  onClick?: () => void;
}

export const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ size, variant, onClick }) => {
  let src = kakaoButton;

  if (size === 'large' && variant === 'narrow') {
    src = kakaoLoginLargeNarrow;
  } else if (size === 'large' && variant === 'wide') {
    src = kakaoLoginLargeWide;
  } else if (size === 'medium' && variant === 'narrow') {
    src = kakaoLoginMediumNarrow;
  } else if (size === 'medium' && variant === 'wide') {
    src = kakaoLoginMediumWide;
  }

  return <img src={src} alt={`kakao login button ${size} ${variant}`} onClick={onClick} />;
};
