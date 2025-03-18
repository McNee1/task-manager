export const secondsToHMS = (seconds: number | undefined | null) => {
  const sec = 60;
  const min = 3600;

  if (seconds === undefined || seconds === null) {
    return null;
  }

  const hours = Math.floor(seconds / min);
  const minutes = Math.floor((seconds % min) / sec);
  const remainingSeconds = seconds % sec;

  return {
    hours,
    minutes,
    seconds: remainingSeconds,
  };
};
