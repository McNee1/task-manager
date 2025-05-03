import { useQuerySpaces } from './use-query-spaces';

export const useSpaceMeta = (spaceId: string | undefined) => {
  const { data } = useQuerySpaces(spaceId);

  return data?.spaceMeta ?? null;
};
