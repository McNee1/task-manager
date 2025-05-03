import { useQuerySpaces } from './use-query-spaces';

export const useSpace = () => {
  const { data, isLoading, error } = useQuerySpaces();

  return {
    spaces: data?.spaces,
    isLoading,
    error,
  };
};
