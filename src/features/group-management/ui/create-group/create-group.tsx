import { Plus } from 'lucide-react';
import { useMemo } from 'react';

import { AppPopover, Button, Input, Label, SpaceId, usePopover } from '@/shared';

import { useAddGroup } from '../../model';

interface CreateGroupProps {
  /** Callback when group is successfully created */
  onSuccess: (responseGroupId: string) => void;
  /** Space identifier */
  spaceId: SpaceId;
}

/**
 * Component for creating new groups with inline input popover.
 * Displays add button that opens input field for group name entry.
 */
export const CreateGroup = ({ onSuccess, spaceId }: CreateGroupProps) => {
  const { isOpen, handleTogglePopover, setIsOpen } = usePopover();

  const { handleAddGroup, isPending, setGroupName, groupName } = useAddGroup(
    spaceId,
    (id) => {
      setIsOpen(false);
      onSuccess(id);
    }
  );

  const trigger = useMemo(
    () => (
      <Button
        className='ml-auto px-3 py-1.5 font-normal'
        onClick={handleTogglePopover}
        variant={'success-ghost'}
        disabled={isPending}
        size='sm'
      >
        <Plus />
        Добавить группу
      </Button>
    ),
    [handleTogglePopover, isPending]
  );
  return (
    <AppPopover
      onOpenChange={handleTogglePopover}
      className='w-64 bg-neutral-50'
      trigger={trigger}
      isOpen={isOpen}
    >
      <>
        <Label
          className='mb-2 block text-xs font-normal text-gray-900'
          htmlFor='newGroup'
        >
          Введите название новой группы
        </Label>
        <Input
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          onKeyDown={handleAddGroup}
          disabled={isPending}
          value={groupName}
          id='newGroup'
        />
      </>
    </AppPopover>
  );
};
