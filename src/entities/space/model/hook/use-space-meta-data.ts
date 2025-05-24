import { useQuerySpaces } from './use-query-spaces';

export const useSpaceMetaData = (spaceId: string | undefined) => {
  const { data } = useQuerySpaces(spaceId);

  return data?.spaceMeta ?? null;
};
