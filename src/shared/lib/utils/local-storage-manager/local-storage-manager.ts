interface LocalStorageTypes {
  selectedGroup: {
    spaceId: string;
    tabId: string;
  }[];
}

export const localStorageManager = {
  get: <T extends keyof LocalStorageTypes>(
    key: T,
    defaultValue: LocalStorageTypes[T] | null = null
  ): LocalStorageTypes[T] | null => {
    const item = localStorage.getItem(key);
    if (typeof item === 'string') {
      try {
        return JSON.parse(item) as LocalStorageTypes[T];
      } catch (error) {
        console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
        return null;
      }
    }
    return defaultValue;
  },

  set: <T extends keyof LocalStorageTypes>(key: T, value: LocalStorageTypes[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: keyof LocalStorageTypes) => {
    localStorage.removeItem(key);
  },
};
