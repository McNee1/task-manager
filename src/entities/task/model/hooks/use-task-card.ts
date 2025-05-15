import { TaskCardType } from '../../ui/task-card';
import {
  IMPORTANCE_BG_COLORS,
  IMPORTANCE_BORDER_COLORS,
  IMPORTANCE_SHADOW_COLORS,
} from '../const';

export const useTaskCard = (task: TaskCardType) => {
  const isShowYear =
    new Date(task.estimatedDate ?? '').getFullYear() === new Date().getFullYear();

  const getOverdueDays = () => {
    if (!task.estimatedDate) {
      return null;
    }
    const diff = Date.now() - new Date(task.estimatedDate).getTime();

    const days = Math.floor(diff / (1000 * 3600 * 24));
    return days > 0 ? days : null;
  };

  const getImportanceStyles = () => {
    if (typeof task.importance === 'number') {
      return {
        backgroundColor: IMPORTANCE_BG_COLORS[task.importance],
        borderColor: IMPORTANCE_BORDER_COLORS[task.importance],
        boxShadow: IMPORTANCE_SHADOW_COLORS[task.importance],
      };
    }
    return null;
  };

  const overdueTaskDayCount = getOverdueDays();

  const importanceStyles = getImportanceStyles();

  const styles =
    importanceStyles &&
    [
      importanceStyles.backgroundColor,
      `border ${importanceStyles.borderColor}`,
      `hover:${importanceStyles.boxShadow}`,
    ].join(' ');

  return {
    isShowYear,
    styles,
    overdueTaskDayCount,
  };
};
