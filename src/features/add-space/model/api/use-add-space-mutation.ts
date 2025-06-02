import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postSpace, SpaceSchema } from '@/entities';
import { useCreateDefaultGroup } from '@/features';
import { QueryKey } from '@/shared';

const TEMP_ID = '1';

export const useAddSpaceMutation = () => {
  const queryClient = useQueryClient();

  const { createDefaultGroup } = useCreateDefaultGroup();

  return useMutation({
    mutationFn: postSpace,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.SPACES] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>([QueryKey.SPACES]);

      queryClient.setQueryData<SpaceSchema[]>([QueryKey.SPACES], (oldSpaces = []) => {
        return [...oldSpaces, { ...data, id: TEMP_ID }];
      });

      return { previousSpaces };
    },

    onSuccess: async (data, _, context) => {
      await Promise.all([
        createDefaultGroup(data.id),
        queryClient.invalidateQueries({ queryKey: [QueryKey.SPACES], exact: true }),
      ]);

      queryClient.removeQueries({
        queryKey: [QueryKey.SPACES, context.previousSpaces],
        exact: true,
      });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.SPACES], context?.previousSpaces);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
