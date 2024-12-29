export const withErrorRequest = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
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
