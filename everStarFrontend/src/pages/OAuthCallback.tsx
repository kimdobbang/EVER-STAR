import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from 'store/slices/authSlice';
import { fetchUserInfo } from 'api/authApi';

export const OAuthCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const token = pathSegments[pathSegments.length - 1];

    if (token) {
      console.log('Extracted token:', token);
      dispatch(setToken(token));

      fetchUserInfo(token)
        .then((user) => {
          console.log('Fetched user info:', user);
          dispatch(setUser(user));
          navigate('/mypage/profile');
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return <div>토큰의 정보가 없어요. Loading</div>;
};
