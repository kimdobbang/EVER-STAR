import { useSelector } from 'react-redux';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/Store';

import {
  fetchCheeringPet,
  fetchOtherPetDetails,
  fetchCheeringPetDelete,
  fetchPetExplore,
  Cheering,
  fetchPetPost,
  fetchPetIntroduction,
  fetchPetsByName,
} from '../api/everStarApi';

interface UpdatePetIntroductionVariables {
  introduction: string;
  petId: number;
}

// 훅 추가
export const useFetchPetsByName = (
  petname: string,
  page: number = 0,
  size: number = 10
) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['fetchPetsByName', petname, page, size],
    queryFn: async () => {
      if (!token) {
        throw new Error('토큰이 없습니다. 인증이 필요합니다.');
      }
      return fetchPetsByName(petname, page, size, token);
    },
    enabled: !!token && petname.length > 0,
  });
};

export const useFetchCheeringPetDelete = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return useMutation({
    mutationFn: async (params: {
      petId: number;
      cheeringMessageId: number;
    }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      console.log(params);
      return fetchCheeringPetDelete(
        params.petId,
        token,
        params.cheeringMessageId
      );
    },
    onSuccess: () => {
      console.log('응원 메시지 삭제 성공');
    },
    onError: (error: Error) => {
      console.error('응원 메시지 삭제 실패:', error.message);
    },
  });
};

export const useFetchOtherPetDetails = (petId: number) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['petDetails', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      console.log('Fetching pet details inside useFetchPetDetails');
      const details = await fetchOtherPetDetails(petId, token);
      sessionStorage.setItem('petDetails', JSON.stringify(details.data));
      return details.data;
    },
    enabled: !!token && petId !== null,
  });
};
export const useFetchCheeringPet = () => {
  // const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const params = useParams();
  return useQuery({
    queryKey: ['CheerPet', params.pet],
    queryFn: async () => {
      if (!params.pet || !token) {
        throw new Error('Missing petId or token');
      }
      const cheer = await fetchCheeringPet(Number(params.pet), token);
      return cheer;
    },
    enabled: !!token && params.pet !== null,
  });
};

export const useFetchPetExplore = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['ExplorePet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }

      const explore = await fetchPetExplore(petId, token);
      sessionStorage.setItem('diffPetDetails', JSON.stringify(explore.data));
      console.log(explore);
      return explore;
    },
    enabled: false,
  });
};

export const useFetchPetPost = (
  token: string,
  petId: number,
  paramsId: number,
  options?: UseMutationOptions<
    Cheering,
    Error,
    { content: string; color: string; isAnonymous: boolean }
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<
    Cheering,
    Error,
    { content: string; color: string; isAnonymous: boolean }
  >({
    mutationFn: (data) => {
      return fetchPetPost(data, token, petId, paramsId);
    },
    ...options,
    onSuccess: (data) => {
      console.log('Successfully post pet:', data);
      queryClient.invalidateQueries({ queryKey: ['CheerPet', paramsId] });
    },
    onError: (error) => {
      console.error('Error post pet:', error);
    },
  });
};

export const useUpdatePetIntroduction = (
  options?: UseMutationOptions<unknown, Error, UpdatePetIntroductionVariables>
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation<unknown, Error, UpdatePetIntroductionVariables>({
    mutationFn: ({ introduction, petId }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      return fetchPetIntroduction(introduction, token, petId);
    },
    onSuccess: (data, variables, context) => {
      console.log('Successfully updated pet introduction:', data);
      queryClient.invalidateQueries({
        queryKey: ['petDetails', variables.introduction],
      });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('Error updating pet introduction:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
