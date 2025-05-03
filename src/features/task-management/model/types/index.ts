import { PartialTask } from '@/entities';

export interface ChangeTask {
  onChangeTask: (task: PartialTask) => void;
}
