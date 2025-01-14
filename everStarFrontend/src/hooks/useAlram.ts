import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Alram, fetchAlramPost } from 'api/alramApi';

export const useFetchAlramPost = (
  token: string,
  options?: UseMutationOptions<Alram, Error, { deviceToken: string }>
) => {
  const queryClient = useQueryClient();

  return useMutation<Alram, Error, { deviceToken: string }>({
    mutationFn: (data) => {
      return fetchAlramPost(data, token);
    },
    ...options,
    onSuccess: (data) => {
      console.log('알람 토큰보내기 성공성공 대성공:', data);
      queryClient.invalidateQueries({ queryKey: ['AlaramToken', data] });
    },
    onError: (error) => {
      console.error('알람 토큰보내기 오류오류 대오류:', error);
    },
  });
};
