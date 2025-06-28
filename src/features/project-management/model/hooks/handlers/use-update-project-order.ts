import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { ProjectSchema } from '@/entities';
import { QueryKey } from '@/shared';

import { useUpdateOrderMutation } from '../../api';

export const useUpdateProjectOrder = () => {
  const queryClient = useQueryClient();

  const { mutate } = useUpdateOrderMutation();

  const handleChangeOrder = useCallback(
    (projects: ProjectSchema[], overIndex: number | undefined) => {
      console.log(projects, overIndex);
      if (overIndex === undefined) return;

      const movedProject = projects[overIndex];

      queryClient.setQueryData<ProjectSchema[]>([QueryKey.PROJECTS], projects);

      mutate({
        id: movedProject.id,
        data: { order: movedProject.order },
      });
    },
    [mutate, queryClient]
  );

  return {
    handleChangeOrder,
  };
};
