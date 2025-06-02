import { Plus } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppPopover, SpaceId, usePopover } from '@/shared';

import { useAddGroup } from '../../model';

export const CreateGroup = ({
  spaceId,
  onSuccess,
}: {
  spaceId: SpaceId;
  onSuccess: (responseGroupId: string) => void;
}) => {
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
