export const dateFormat = (date: Date | string, options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
};
