// src/hooks/usePets.ts
import { useQuery, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import {
  fetchPets,
  fetchPetDetails,
  addPet,
  updateProfileImage,
  putProfileImage,
  Pet,
  PetInfo,
} from 'api/petApi';
import { useDispatch } from 'react-redux';
import { setPets, addPet as addPetAction, setPetDetails } from 'store/slices/petSlice';
import { useState, useEffect } from 'react';

export const useFetchPets = (token: string) => {
  const dispatch = useDispatch();
  return useQuery<Pet[], Error>({
    queryKey: ['pets'],
    queryFn: async () => {
      const pets = await fetchPets(token);
      dispatch(setPets(pets));
      return pets;
    },
    enabled: !!token,
  });
};

export const useAddPet = (token: string, options?: UseMutationOptions<Pet, Error, FormData>) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<Pet, Error, FormData>({
    mutationFn: (formData: FormData) => addPet(formData, token),
    ...options,
    onSuccess: (data: Pet, variables: FormData, context: unknown) => {
      dispatch(addPetAction(data));
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error) => {
      console.error('Error adding pet:', error);
    },
  });
};

export const useFetchPetDetails = (petId: number, token: string) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<PetInfo, Error, void>({
    mutationFn: async () => {
      const details = await fetchPetDetails(petId, token);
      dispatch(setPetDetails(details));
      return details;
    },
    onSuccess: (data: PetInfo) => {
      queryClient.invalidateQueries({ queryKey: ['petDetails', data.id] });
    },
    onError: (error: Error) => {
      console.error('Error fetching pet details:', error);
    },
  });
};

export const useUpdateProfileImage = (
  petId: number,
  token: string,
  options?: UseMutationOptions<void, Error, FormData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData>({
    mutationFn: (formData: FormData) => updateProfileImage(petId, formData, token),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['petDetails', petId] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error) => {
      console.error('Error updating profile image:', error);
    },
  });
};

export const usePutProfileImage = (
  petId: number,
  token: string,
  options?: UseMutationOptions<void, Error, FormData>,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData>({
    mutationFn: (formData: FormData) => putProfileImage(petId, formData, token),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['petDetails', petId] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: Error) => {
      console.error('Error updating profile image:', error);
    },
  });
};

export const useLocalPetDetails = (petId: number, token: string) => {
  const [localPetDetails, setLocalPetDetails] = useState<PetInfo | null>(null);

  const fetchDetails = async () => {
    const details = await fetchPetDetails(petId, token);
    setLocalPetDetails(details);
  };

  useEffect(() => {
    if (petId) {
      fetchDetails();
    }
  }, [petId]);

  return { localPetDetails, refetch: fetchDetails };
};
