import { Column, ColumnSchema } from '@/entities';

export interface MutationInput {
  data: Column[];
  id: ColumnSchema['projectId'];
  skipOptimisticUpdate?: boolean;
}
