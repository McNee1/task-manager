import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postSpace } from '@/shared/services';

export const useQueryPostSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });
};
