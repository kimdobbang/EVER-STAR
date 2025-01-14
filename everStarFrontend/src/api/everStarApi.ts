import config from 'config';

export interface Cheering {
  id: number;
  petId: number;
  name: string;
  content: string;
  color: string;
  isAnonymous: boolean;
  cheeringMessageId: number;
  relationShip: string;
}

// 반려동물 이름으로 검색
export const fetchPetsByName = async (
  petname: string,
  page: number = 0,
  size: number = 10,
  token: string
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/everstar/pets/search?petname=${encodeURIComponent(petname)}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('반려동물 검색에 실패했습니다');
  }

  const result = await response.json();

  return result;
};

export const fetchOtherPetDetails = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/everstar/pets/${petId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('타 반려동물 상세 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();

  return result;
};

export const fetchCheeringPet = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/cheeringMessages?page=0&size=12`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('반려동물 상세 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();

  return result;
};

export const fetchCheeringPetDelete = async (
  petId: number,
  token: string,
  cheeringMessagesId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/cheeringMessages/${cheeringMessagesId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('포스트잇 삭제 실패했다 다시해봐라');
  }

  return;
};

export const fetchPetExplore = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/everstar/pets/random?excludePetId=${petId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('반려동물 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();

  return result;
};

export const fetchPetPost = async (
  data: { content: string; color: string; isAnonymous: boolean },
  token: string,
  petId: number,
  paramsId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/find/${paramsId}/cheeringMessages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('포스트잇 추가하는 데 실패했어');
  }

  const result = await response.json();
  return result.data;
};

export const fetchPetIntroduction = async (
  introduction: string,
  token: string,
  petId: number
) => {
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ introduction }),
  });

  if (!response.ok) {
    throw new Error('자기소개 수정 실패했어');
  }

  const result = await response.json();
  return result;
};
