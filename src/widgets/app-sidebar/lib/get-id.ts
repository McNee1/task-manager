export const getId = (lastSpaceId: string | undefined) =>
  String(Number(lastSpaceId ?? 0) + 1);
