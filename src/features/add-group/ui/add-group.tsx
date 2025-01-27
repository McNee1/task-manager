import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpaceSchema } from '@/entities';
import { AppPopover, postGroup, SpaceId, usePopover } from '@/shared';

export const AddGroup = ({
  spaceId,
  onSuccess,
}: {
  spaceId: SpaceId;
  onSuccess: (responseGroupId: string) => void;
}) => {
  const [group, setGroup] = useState('');

  const queryClient = useQueryClient();

  const { isOpen, handleTogglePopover, setIsOpen } = usePopover();

  const { mutate, isPending } = useMutation({
    mutationFn: postGroup,
    onMutate: async (newSpace) => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>(['spaces']);

      queryClient.setQueryData<SpaceSchema[]>(['spaces'], (oldSpaces) => {
        if (!oldSpaces) return;

        const index = oldSpaces.findIndex((el) => el.id === spaceId);

        if (index !== -1) {
          const updatedSpaces = [...oldSpaces];
          updatedSpaces[index] = {
            ...updatedSpaces[index],
            groups: [...updatedSpaces[index].groups, { ...newSpace, id: '1' }],
          } as SpaceSchema;
          return updatedSpaces;
        }

        return oldSpaces;
      });

      return { previousSpaces, newSpace };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['spaces'], context?.previousSpaces);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });

      if (data) {
        onSuccess(data.id);
      }
    },
    onSuccess: () => {
      setIsOpen(false);
      setGroup('');

      toast.success('Группа успешно создана', {
        description: `Имя группы: ${group}`,
        duration: 5000,
      });
    },
  });

  const handleAddGroup = (key: KeyboardEvent<HTMLInputElement>) => {
    if (key.code !== 'Enter' || !spaceId) return;

    if (!group.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate({ groupName: group, workspaceId: spaceId }, {});
  };

  const trigger = (
    <Button
      className='ml-auto px-3 py-1.5 font-normal'
      onClick={handleTogglePopover}
      variant={'success-ghost'}
      size='sm'
    >
      <Plus />
      Добавить группу
    </Button>
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
            setGroup(e.target.value);
          }}
          onKeyDown={handleAddGroup}
          disabled={isPending}
          value={group}
          id='newGroup'
        />
      </>
    </AppPopover>
  );
};
