import { useSelector } from 'react-redux';
import {
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { RootState } from 'store/Store';
import {
  fetchLetterPet,
  fetchLetterPetDetail,
  fetchLetterPost,
  fetchLetterRePost,
  Letter,
} from 'api/earthApi';

export const useFetchLetterRePost = (
  token: string,
  petId: number,
  letterId: number,
  options?: UseMutationOptions<Letter, Error, FormData>
) => {
  const queryClient = useQueryClient();

  return useMutation<Letter, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return fetchLetterRePost(formData, token, petId, letterId);
    },
    ...options,
    onSuccess: (data) => {
      console.log('Successfully posted letter:', data);
      queryClient.invalidateQueries({ queryKey: ['Letter', letterId] });
    },
    onError: (error) => {
      console.error('Error posting letter:', error);
    },
  });
};

export const useFetchLetterPost = (
  token: string,
  petId: number,
  options?: UseMutationOptions<Letter, Error, FormData>
) => {
  const queryClient = useQueryClient();

  return useMutation<Letter, Error, FormData>({
    mutationFn: (formData: FormData) => {
      return fetchLetterPost(formData, token, petId);
    },
    ...options,
    onSuccess: (data) => {
      console.log('Successfully posted letter:', data);
      queryClient.invalidateQueries({ queryKey: ['Letter', petId] });
    },
    onError: (error) => {
      console.error('Error posting letter:', error);
    },
  });
};

export const useFetchLetterPet = () => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['LetterPet', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      const letter = await fetchLetterPet(Number(petId), token);
      return letter;
    },
    enabled: !!token && petId !== null,
  });
};

export const useFetchLetterPetDetail = (letterId: number) => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['LetterPet', petId, letterId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      const letter = await fetchLetterPetDetail(
        Number(petId),
        token,
        Number(letterId)
      );

      if (letter.data.userLetter === null) {
        letter.data.userLetter = {};
        letter.data.userLetter.content = '';
        letter.data.userLetter.createdAt = '';
        letter.data.userLetter.imageUrl = '';
        letter.data.userLetter.petName = '';
      }
      return letter;
    },
    enabled: !!letterId && !!petId && !!token,
  });
};
