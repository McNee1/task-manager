import { SpaceItem } from '@/entities';

import { apiInstance } from '../instance';

export const getSpaces = async () => {
  try {
    const response = await apiInstance.get('workspaces').json<SpaceItem[]>();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching spaces:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('Произошла неизвестная ошибка');
    }
  }
};

export const postSpace = async (space: SpaceItem) => {
  try {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        // reject(new Error('Что-то пошло не так!'));
      }, 2000);
    });

    const response = await apiInstance.post('workspaces', { json: space }).json();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching space:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unknown error:', error);
      throw new Error('Произошла неизвестная ошибка');
    }
  }
};
