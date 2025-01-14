import React from 'react';
import webNeutralRdCtn from 'assets/symbols/web_neutral_rd_ctn.svg';
import webNeutralRdNa from 'assets/symbols/web_neutral_rd_na.svg';
import webNeutralRdSI from 'assets/symbols/web_neutral_rd_SI.svg';
import webNeutralRdSU from 'assets/symbols/web_neutral_rd_SU.svg';
import webNeutralSqCtn from 'assets/symbols/web_neutral_sq_ctn.svg';
import webNeutralSqNa from 'assets/symbols/web_neutral_sq_na.svg';
import webNeutralSqSI from 'assets/symbols/web_neutral_sq_SI.svg';
import webNeutralSqSU from 'assets/symbols/web_neutral_sq_SU.svg';
import googleButton from 'assets/symbols/google-button.svg';

interface GoogleLoginButtonProps {
  shape?: 'round' | 'square';
  variant?: 'ctn' | 'na' | 'SI' | 'SU';
  onClick?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  shape,
  variant,
  onClick,
}) => {
  let src = googleButton; // 기본값 설정

  if (shape === 'round' && variant === 'ctn') {
    src = webNeutralRdCtn;
  } else if (shape === 'round' && variant === 'na') {
    src = webNeutralRdNa;
  } else if (shape === 'round' && variant === 'SI') {
    src = webNeutralRdSI;
  } else if (shape === 'round' && variant === 'SU') {
    src = webNeutralRdSU;
  } else if (shape === 'square' && variant === 'ctn') {
    src = webNeutralSqCtn;
  } else if (shape === 'square' && variant === 'na') {
    src = webNeutralSqNa;
  } else if (shape === 'square' && variant === 'SI') {
    src = webNeutralSqSI;
  } else if (shape === 'square' && variant === 'SU') {
    src = webNeutralSqSU;
  }

  return (
    <img
      src={src}
      alt={`google login button ${shape || 'default'} ${variant || 'default'}`}
      onClick={onClick}
    />
  );
};
