export const localStorageManager = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    const item = localStorage.getItem(key);
    if (typeof item === 'string') {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
        return null;
      }
    }
    return defaultValue;
  },

  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
