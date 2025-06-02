import { KeyboardEvent, useState } from 'react';
import { toast } from 'sonner';

import { SpaceId } from '@/shared';

import { useAddGroupMutation } from '../../api';

export const useAddGroup = (
  spaceId: SpaceId,
  onSuccess: (responseGroupId: string) => void
) => {
  const [groupName, setGroupName] = useState('');

  const { mutate, isPending } = useAddGroupMutation();

  const handleAddGroup = (key: KeyboardEvent<HTMLInputElement>) => {
    if (key.code !== 'Enter' || !spaceId) return;

    if (!groupName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate(
      {
        groupName: groupName,
        workspaceId: spaceId,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: (data) => {
          onSuccess(data.id);
        },
      }
    );
  };

  return {
    handleAddGroup,
    isPending,
    setGroupName,
    groupName,
  };
};
