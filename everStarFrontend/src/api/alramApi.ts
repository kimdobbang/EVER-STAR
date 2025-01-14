import config from 'config';

export interface Alram {
  deviceToken: string;
}

export const fetchAlramPost = async (
  data: { deviceToken: string },
  token: string
) => {
  const response = await fetch(`${config.API_BASE_URL}/api/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('서비스워커 등록 실패실패 대실패');
  }

  const result = await response.json();
  return result;
};
