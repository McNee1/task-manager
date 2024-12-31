import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usePopover } from '@/shared/lib';
import { postGroup } from '@/shared/services';

export const AddGroup = ({ spaceId }: { spaceId: string | undefined }) => {
  const [group, setGroup] = useState('');

  const queryClient = useQueryClient();

  const { isOpen, handleTogglePopover } = usePopover();

  const { mutate, isPending } = useMutation({
    mutationFn: postGroup,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleAddGroup = (key: KeyboardEvent<HTMLInputElement>) => {
    if (key.code !== 'Enter' || !spaceId || isPending) return;
    console.log('object');

    mutate(
      { groupName: group, workspaceId: spaceId },
      {
        onSuccess: () => {
          handleTogglePopover();
          setGroup('');

          toast.success('Группа успешно создана', {
            description: `Имя пространство: ${group}`,
            duration: 5000,
          });
        },
        onError: (error) => {
          toast.error('Произошла ошибка! Попробуйте позже.', {
            description: `${error}`,
            duration: 5000,
          });
        },
      }
    );
  };
  return (
    <Popover
      onOpenChange={handleTogglePopover}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <Button
          className='ml-auto px-3 py-1.5 font-normal'
          variant={'success-ghost'}
          size='sm'
        >
          <Plus />
          Добавить группу
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-gray-50'>
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
          value={group}
          id='newGroup'
        />
      </PopoverContent>
    </Popover>
  );
};
