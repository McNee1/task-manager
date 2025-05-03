export const generateNextValue = <T extends Record<K, number>, K extends keyof T>(
  array: T[],
  propertyKey: K,
  increment = 1,
  defaultValue = 0
) => {
  if (array.length === 0) return defaultValue;

  const maxValue = array.reduce(
    (max, item) => Math.max(max, item[propertyKey]),
    -Infinity
  );

  return maxValue + increment;
};
