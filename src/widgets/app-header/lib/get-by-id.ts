export const getById = <K extends { id: string }>(
  id: string | null | undefined,
  array: K[] | undefined
) => {
  if (!id || !array) {
    return null;
  }

  const space = array.find((el) => el.id === id);
  return space;
};
