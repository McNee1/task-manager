import { useCallback } from 'react';

import { Checklist } from '@/entities';

import { useToggleItemMutation } from '../../api';

export const useToggleItem = (onSuccess?: VoidFunction) => {
  const { mutate, isPending } = useToggleItemMutation();

  const handleToggleItem = useCallback(
    (checkItem: Checklist) => {
      mutate(
        { ...checkItem, isChecked: !checkItem.isChecked },
        {
          onSuccess() {
            onSuccess?.();
          },
        }
      );
    },
    [mutate, onSuccess]
  );

  return {
    handleToggleItem,
    isPending,
  };
};
