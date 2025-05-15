export const dateFormat = (date: Date | string, options: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return '';
  }
};
