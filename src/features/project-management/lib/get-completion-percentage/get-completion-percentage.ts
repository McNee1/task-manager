export const getCompletionPercentage = (allTaskCount: number, taskCount: number) => {
  if (allTaskCount === 0) return '0%';

  const remainingTasks = allTaskCount - taskCount;
  return ((remainingTasks / allTaskCount) * 100).toFixed(2) + '%';
};
