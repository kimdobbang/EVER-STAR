import config from 'config';

export interface Letter {
  requestDto: string;
  image: string;
}

export const fetchLetterRePost = async (
  data: FormData,
  token: string,
  petId: number,
  letterId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters/${letterId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error('편지 보내기에 실패했습니다');
  }

  const result = await response.json();
  return result;
};

export const fetchLetterPost = async (
  data: FormData,
  token: string,
  petId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error('편지 보내기에 실패했습니다');
  }

  const result = await response.json();
  return result;
};

export const fetchLetterPet = async (petId: number, token: string) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('편지 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();

  return result;
};

export const fetchLetterPetDetail = async (
  petId: number,
  token: string,
  letterId: number
) => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/letters/${letterId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('편지 정보를 가져오는 데 실패했습니다');
  }

  const result = await response.json();

  return result;
};
