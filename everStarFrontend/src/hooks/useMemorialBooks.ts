import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import {
  getMemorialBooks,
  getMemorialBookById,
  updateMemorialBookOpenStatus,
  createDiary,
  MemorialBookResponse,
  MemorialBookDetailsResponse,
  updatePsychologicalTestResult,
} from '../api/memorialBookApi';
import { RootState } from 'store/Store';
import {
  setMemorialBookDetails,
  setLoading,
  setError,
} from 'store/slices/memorialBookSlice';

// Fetch the memorial book for a given pet and refetch when questIndex changes
export const useFetchMemorialBooksWithQuest = (
  petId: number,
  questIndex: number,
) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery<{ data: MemorialBookResponse }, Error>({
    queryKey: ['memorialBooks', petId, questIndex], // questIndex 포함
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      return getMemorialBooks(petId, token);
    },
    enabled: !!token && petId !== null,
  });
};

// Fetch the memorial book for a given pet
export const useFetchMemorialBooks = (petId: number) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery<{ data: MemorialBookResponse }, Error>({
    queryKey: ['memorialBooks', petId],
    queryFn: async () => {
      if (!petId || !token) {
        throw new Error('Missing petId or token');
      }
      return getMemorialBooks(petId, token);
    },
    enabled: !!token && petId !== null,
  });
};

// Fetch a specific memorial book by its ID
export const useFetchMemorialBookById = (
  petId: number,
  memorialBookId: number,
) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const queryResult = useQuery<{ data: MemorialBookDetailsResponse }, Error>({
    queryKey: ['memorialBook', petId, memorialBookId],
    queryFn: async () => {
      if (!petId || !memorialBookId || !token) {
        throw new Error('Missing petId, memorialBookId, or token');
      }
      dispatch(setLoading());
      return getMemorialBookById(petId, memorialBookId, token);
    },
    enabled: !!token && petId !== null && memorialBookId !== null,
  });

  useEffect(() => {
    if (queryResult.isSuccess) {
      dispatch(setMemorialBookDetails(queryResult.data.data));
    } else if (queryResult.isError) {
      dispatch(setError(queryResult.error.message));
    }
  }, [queryResult.status, queryResult.data, queryResult.error, dispatch]);

  return queryResult;
};

// Update the open status of a memorial book
export const useUpdateMemorialBookOpenStatus = (
  options?: UseMutationOptions<
    void,
    Error,
    { petId: number; memorialBookId: number; isOpen: boolean }
  >,
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation<
    void,
    Error,
    { petId: number; memorialBookId: number; isOpen: boolean }
  >({
    mutationFn: ({ petId, memorialBookId, isOpen }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      return updateMemorialBookOpenStatus(petId, memorialBookId, isOpen, token);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['memorialBook', variables.petId, variables.memorialBookId],
      });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error, variables, context) => {
      console.error('Error updating memorial book open status:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

// Create a new diary entry in a memorial book
export const useCreateDiary = (
  options?: UseMutationOptions<
    void,
    Error,
    {
      petId: number;
      memorialBookId: number;
      title: string;
      content: string;
      imageFile: File | null;
    }
  >,
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation<
    void,
    Error,
    {
      petId: number;
      memorialBookId: number;
      title: string;
      content: string;
      imageFile: File | null;
    }
  >({
    mutationFn: ({ petId, memorialBookId, title, content, imageFile }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      return createDiary(
        petId,
        memorialBookId,
        title,
        content,
        imageFile,
        token,
      );
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['memorialBook', variables.petId, variables.memorialBookId],
      });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error, variables, context) => {
      console.error('Error creating diary:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

export const useUpdatePsychologicalTestResult = (
  options?: UseMutationOptions<
    { psychologicalTestResult: string },
    Error,
    { petId: number; memorialBookId: number; psychologicalTestResult: string }
  >,
) => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation<
    { psychologicalTestResult: string },
    Error,
    { petId: number; memorialBookId: number; psychologicalTestResult: string }
  >({
    mutationFn: ({ petId, memorialBookId, psychologicalTestResult }) => {
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      return updatePsychologicalTestResult(
        petId,
        memorialBookId,
        psychologicalTestResult,
        token,
      );
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['memorialBook', variables.petId, variables.memorialBookId],
      });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error, variables, context) => {
      console.error('Error updating psychological test result:', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};
