// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/Store';
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';

import {
  sendVerificationCode,
  verifyAuthCode,
  joinUser,
  fetchUserInfo,
  SendCodeResponse,
  VerifyCodeResponse,
  UserInfo,
} from 'api/authApi';
import { setToken, setUser } from 'store/slices/authSlice';

export const useSendVerificationCode = (): UseMutationResult<
  SendCodeResponse,
  unknown,
  string,
  unknown
> => {
  return useMutation<SendCodeResponse, unknown, string>({
    mutationFn: sendVerificationCode,
    onSuccess: () => console.log('Verification code sent successfully'),
    onError: (error: unknown) =>
      console.error(
        'Error sending verification code:',
        (error as Error).message
      ),
  });
};

export const useVerifyAuthCode = (): UseMutationResult<
  VerifyCodeResponse,
  unknown,
  { phone: string; certificationNumber: string },
  unknown
> => {
  return useMutation<
    VerifyCodeResponse,
    unknown,
    { phone: string; certificationNumber: string }
  >({
    mutationFn: verifyAuthCode,
    onSuccess: () => console.log('Auth code verified successfully'),
    onError: (error: unknown) =>
      console.error('Error verifying auth code:', (error as Error).message),
  });
};

export const useJoinUser = (): UseMutationResult<
  { data: UserInfo; token: string | null },
  unknown,
  UserInfo,
  unknown
> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<
    { data: UserInfo; token: string | null },
    unknown,
    UserInfo
  >({
    mutationFn: joinUser,
    onSuccess: async ({ data, token }) => {
      console.log('User joined successfully', data, token);

      if (token) {
        dispatch(setToken(token));

        try {
          const userInfo = await fetchUserInfo(token);
          dispatch(setUser(userInfo));
          navigate('/mypage/profile');
        } catch (error) {
          console.error(
            'Error fetching user info after joining:',
            (error as Error).message
          );
          navigate('/login');
        }
      } else {
        console.error('Token not found in response data');
        navigate('/login');
      }
    },
    onError: (error: unknown) => {
      console.error('Error joining user:', (error as Error).message);
      navigate('/login');
    },
  });
};

export const useAuthStatus = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/mypage/profile');
    }
  }, [accessToken, navigate]);
};

export const useFetchUserInfo = (token: string) => {
  const dispatch = useDispatch();

  return useQuery<UserInfo, Error>({
    queryKey: ['userInfo', token],
    queryFn: async () => {
      if (!token) throw new Error('Token is required');
      const data = await fetchUserInfo(token);
      console.log(data);
      dispatch(setUser(data));
      return data;
    },
    enabled: !!token,
  });
};
