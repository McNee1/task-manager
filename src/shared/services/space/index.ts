import ky from 'ky';

import { SpaceItem } from '@/entities';

export const getSpaces = async () => {
  try {
    // throw new Error('foo');
    const response = await ky.get('http://localhost:3000/workspaces').json<SpaceItem[]>();
    return response;
  } catch (error) {
    console.error('Error fetching spaces:', error);
    throw new Error('Failed to fetch spaces');
  }
};
