// src/api/petApi.ts
import config from 'config';

export interface Pet {
  id: number;
  profileImageUrl: string;
  name: string;
}

export interface PetFormData {
  name: string;
  age: number;
  memorialDate: string | null;
  species: string;
  gender: string;
  relationship: string;
  profileImage: File | null;
  personalities: string[];
}

export interface PetInfo {
  id: number;
  userId: number;
  name: string;
  age: number;
  memorialDate: string; // LocalDate 형식으로 유지
  species: string;
  gender: string;
  relationship: string;
  profileImageUrl: string;
  personalities: string[];
}

interface ApiResponse {
  data: Pet[];
}

export const fetchPets = async (token: string): Promise<Pet[]> => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }

  const result: ApiResponse = await response.json();
  return result.data;
};

export const fetchPetDetails = async (petId: number, token: string): Promise<PetInfo> => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('반려동물 상세 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();
  const petDetails: PetInfo = {
    id: result.data.id,
    userId: result.data.userId,
    name: result.data.name,
    age: result.data.age,
    memorialDate: result.data.memorialDate,
    species: result.data.species,
    gender: result.data.gender,
    relationship: result.data.relationship,
    profileImageUrl: result.data.profileImageUrl,
    personalities: result.data.petPersonalities,
  };

  return petDetails;
};

export const addPet = async (formData: FormData, token: string): Promise<Pet> => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('반려동물을 추가하는 데 실패했습니다');
  }

  const data = await response.json();
  return data;
};

export const updateProfileImage = async (
  petId: number,
  formData: FormData,
  token: string,
): Promise<void> => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}/profile-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('프로필 이미지를 업데이트하는 데 실패했습니다');
  }
};

export const putProfileImage = async (
  petId: number,
  formData: FormData,
  token: string,
): Promise<void> => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}/profile-image`, {
    method: 'Put',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('프로필 이미지를 업데이트하는 데 실패했습니다');
  }
};
