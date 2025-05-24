import { useCallback, useEffect } from 'react';

import type { EstimatedTime } from '@/shared';

import { TaskSchema } from '@/entities';
import { cn, useActionModal } from '@/shared';

import { ChangeTask, useTaskMetaData } from '../../../model';
import { ToolbarModalTime } from './toolbar-modal-time';
import { FieldDate, FieldPriority, FieldProjectInfo, FieldTimeEstimate } from './ui';

interface ToolbarFieldsProps extends ChangeTask {
  activeColumnId: TaskSchema['columnId'] | undefined;
  className?: string;
  importance: TaskSchema['importance'];
  initEstimatedDate: TaskSchema['estimatedDate'];
  initEstimatedTime: TaskSchema['estimatedTime'];
  status: {
    isPending: boolean;
    isSuccess: boolean;
  };
}

/**
 * A component that renders various fields within a task toolbar.
 * It includes fields for project information, estimated date, priority, and time estimate.
 * A modal for editing the time estimate is also controlled within this component.
 *
 * @param {ToolbarFieldsProps} props - The props for this component.
 * @param {string} [props.className] - An optional class name to add to the root element.
 * @param {EstimatedTime} props.initEstimatedTime - The initial estimated time for the task.
 * @param {Date | undefined} props.initEstimatedDate - The initial estimated date for the task.
 * @param {TaskSchema['importance']} props.importance - The importance level of the task.
 * @param {ChangeTask} props.onChangeTask - A callback function to update the task details.
 * @param {Object} props.status - The status of the task update operation.
 * @param {boolean} props.status.isPending - Whether the task update is pending.
 * @param {boolean} props.status.isSuccess - Whether the task update was successful.
 */

export const ToolbarFields = ({
  className,
  initEstimatedTime,
  initEstimatedDate,
  importance,
  onChangeTask,
  status,
}: ToolbarFieldsProps) => {
  const { modal, handleToggleModal, setModal } = useActionModal();

  const { columnName, projectName, spaceName } = useTaskMetaData();

  const handleSaveTime = useCallback(
    (time: EstimatedTime) => {
      onChangeTask({ estimatedTime: time });
    },
    [onChangeTask]
  );

  const handleResetDate = useCallback(() => {
    onChangeTask({ estimatedDate: undefined });
  }, [onChangeTask]);

  const handleSaveDate = useCallback(
    (date: Date | undefined) => {
      onChangeTask({ estimatedDate: date?.toISOString() });
    },
    [onChangeTask]
  );

  useEffect(() => {
    if (status.isSuccess) {
      setModal({ isOpen: false });
    }
  }, [status.isSuccess, setModal]);

  return (
    <>
      <div className={cn(className)}>
        <FieldProjectInfo
          projectName={projectName}
          columnName={columnName}
          spaceName={spaceName}
        />

        <FieldDate
          onResetDate={handleResetDate}
          onSaveDate={handleSaveDate}
          date={initEstimatedDate}
        />

        <FieldPriority
          onChangeTask={onChangeTask}
          importance={importance}
        />

        <FieldTimeEstimate
          onEditTime={handleToggleModal}
          time={initEstimatedTime}
        />
      </div>
      <ToolbarModalTime
        onOpenChange={() => {
          handleToggleModal();
        }}
        initTime={initEstimatedTime ?? { hours: '', minutes: '' }}
        isPending={status.isPending}
        onSaveTime={handleSaveTime}
        isOpen={modal.isOpen}
      />
    </>
  );
};
