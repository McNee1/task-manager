/**
 * Returns a string representing the plural form of 'day' in Russian.
 * @param {number} days - number of days
 * @returns {string} - the plural form of 'day' in Russian
 * @example
 * getDayPluralForm(1) // 'день'
 * getDayPluralForm(2) // 'дня'
 * getDayPluralForm(5) // 'дней'
 */
export const getDayPluralForm = (days: number): string => {
  const absoluteDays = Math.abs(days);

  if (absoluteDays % 100 >= 11 && absoluteDays % 100 <= 14) {
    return 'дней';
  }

  switch (absoluteDays % 10) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    default:
      return 'дней';
  }
};
