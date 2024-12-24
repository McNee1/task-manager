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

export const deleteSpace = async (id: string) => {
  try {
    const response = await apiInstance.delete(`workspaces/${id}`).json();
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

export const editSpace = async (opt: { spaceName: string; id: string }) => {
  try {
    const response = await apiInstance
      .patch(`workspaces/${opt.id}`, { json: { spaceName: opt.spaceName } })
      .json();
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
