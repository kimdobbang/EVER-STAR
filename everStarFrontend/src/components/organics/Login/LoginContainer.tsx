import config from 'config';

import React, { useState } from 'react';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { KakaoLoginButton } from 'components/atoms/buttons/KakaoLoginButton';
import { GoogleLoginButton } from 'components/atoms/buttons/GoogleLoginButton';
import { OnboardingDescription } from 'components/organics/OnboardingDescription/OnboardingDescription';

export const LoginContainer: React.FC = () => {
  const [page, setPage] = useState<'page-1' | 'page-2' | 'page-3' | 'page-4'>('page-1');

  const handleOAuthLogin = (provider: 'kakao' | 'google') => {
    window.location.href = `${config.API_BASE_URL}/api/auth/oauth2/authorization/${provider}`; // apiUrl 사용
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '360px',
        height: '100%',
        gap: '16px',
        position: 'relative',
      }}
    >
      <LogoIcons variant="star" />
      <OnboardingDescription page={page} onChangePage={setPage} />
      <KakaoLoginButton onClick={() => handleOAuthLogin('kakao')} />
      <GoogleLoginButton onClick={() => handleOAuthLogin('google')} />
    </div>
  );
};
