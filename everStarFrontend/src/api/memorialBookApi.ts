//src\api\memorialBookApi.ts
import config from 'config';

export interface MemorialBookData {
  pet: {
    name: string;
  };
  sentimentAnalysis: {
    week1Result: number;
    week2Result: number;
    week3Result: number;
    week4Result: number;
    week5Result: number;
    week6Result: number;
    week7Result: number;
    totalResult: string;
  };
  quests: {
    id: number;
    content: string;
    type: string;
  }[];
  questAnswers: {
    questId: number;
    content: string;
    imageUrl: string;
    type: string;
  }[];
  aiAnswers: {
    questId: number;
    content: string;
    imageUrl: string;
    type: string;
  }[];
  diaries: {
    title: string;
    content: string;
    imageUrl: string;
  }[];
}

export interface MemorialBookResponse {
  id: number;
  psychologicalTestResult: string | null;
  isOpen: boolean;
  isActive: boolean;
  data: MemorialBookData;
}

export interface MemorialBookDetailsResponse {
  memorialBook: MemorialBookResponse;
  pet: {
    id: number;
    userId: number;
    name: string;
    age: number;
    memorialDate: string;
    species: string;
    gender: string;
    relationship: string;
    profileImageUrl: string;
    introduction: string;
    questIndex: number;
    lastAccessTime: string;
  };
  sentimentAnalysis: {
    id: number;
    totalResult: string;
    week1Result: number;
    week2Result: number;
    week3Result: number;
    week4Result: number;
    week5Result: number;
    week6Result: number;
    week7Result: number;
  };
  quests: {
    id: number;
    content: string;
    type: string;
  }[];
  questAnswers: {
    petId: number;
    questId: number;
    content: string;
    imageUrl: string;
    type: string;
  }[];
  aiAnswers: {
    petId: number;
    questId: number;
    content: string;
    imageUrl: string;
    type: string;
  }[];
  diaries: {
    id: number;
    memorialBookId: number;
    title: string;
    content: string;
    imageUrl: string;
    createdTime: string;
  }[];
}

export const getMemorialBooks = async (
  petId: number,
  token: string,
): Promise<{ data: MemorialBookResponse }> => {
  // 수정된 부분
  const response = await fetch(`${config.API_BASE_URL}/api/pets/${petId}/memorialbooks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred');
  }

  return response.json();
};

export const getMemorialBookById = async (
  petId: number,
  memorialBookId: number,
  token: string,
): Promise<{ data: MemorialBookDetailsResponse }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/memorialbooks/${memorialBookId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred');
  }

  return response.json();
};

export const updateMemorialBookOpenStatus = async (
  petId: number,
  memorialBookId: number,
  isOpen: boolean,
  token: string,
): Promise<void> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/memorialbooks/${memorialBookId}/is-open`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isOpen }),
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred');
  }
};

export const createDiary = async (
  petId: number,
  memorialBookId: number,
  title: string,
  content: string,
  imageFile: File | null,
  token: string,
): Promise<void> => {
  const formData = new FormData();

  // JSON 데이터 추가
  const requestDto = {
    title,
    content,
  };
  const requestDtoBlob = new Blob([JSON.stringify(requestDto)], {
    type: 'application/json',
  });
  formData.append('requestDto', requestDtoBlob);

  // 이미지 파일 추가 (선택 사항)
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/memorialbooks/${memorialBookId}/diaries`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'An error occurred while creating the diary entry');
  }
};

export const updatePsychologicalTestResult = async (
  petId: number,
  memorialBookId: number,
  psychologicalTestResult: string, // 수정된 필드명
  token: string,
): Promise<{ psychologicalTestResult: string }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/pets/${petId}/memorialbooks/${memorialBookId}/psychological-test`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ psychologicalTestResult }), // 수정된 필드명
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || 'An error occurred while updating the psychological test result',
    );
  }

  return response.json(); // JSON 응답 반환
};
