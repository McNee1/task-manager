import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpaceSchema } from '@/entities';
import { usePopover } from '@/shared/lib';
import { postGroup } from '@/shared/services';
import { AppPopover } from '@/shared/ui';

export const AddGroup = ({ spaceId }: { spaceId: string | undefined }) => {
  const [group, setGroup] = useState('');

  const queryClient = useQueryClient();

  const { isOpen, handleTogglePopover } = usePopover();

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
            groups: [...updatedSpaces[index].groups, newSpace],
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
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
    onSuccess: () => {
      handleTogglePopover();
      setGroup('');

      toast.success('Группа успешно создана', {
        description: `Имя группы: ${group}`,
        duration: 5000,
      });
    },
  });

  const handleAddGroup = (key: KeyboardEvent<HTMLInputElement>) => {
    if (key.code !== 'Enter' || !spaceId || isPending) return;

    if (!group.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate({ groupName: group, workspaceId: spaceId }, {});
  };

  const renderContent = () => (
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
  );

  const renderTrigger = () => (
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
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      isOpen={isOpen}
    />
  );
};
