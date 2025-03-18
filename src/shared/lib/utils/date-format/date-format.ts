export const dateFormat = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
};
