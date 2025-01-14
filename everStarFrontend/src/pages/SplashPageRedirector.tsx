import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplashTemplate } from 'components/templates/SplashTemplate'; // 올바른 경로로 변경하세요
import bgImage from 'assets/images/bg-login.webp';

export const SplashPageRedirector = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/login'); // 3초 후에 로그인 페이지로 이동
    }, 1500); // 3초 동안 스플래시 페이지 표시

    return () => clearTimeout(timer);
  }, [navigate]);

  return loading ? (
    <div className='relative flex items-center justify-center min-h-screen'>
      {/* Background Image */}
      <img
        src={bgImage}
        alt='Background'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        className='absolute top-0 left-0 w-full h-full object-cover'
      />
      {/* Splash Template */}
      <SplashTemplate type='splash' className='z-10' />
    </div>
  ) : null;
};
