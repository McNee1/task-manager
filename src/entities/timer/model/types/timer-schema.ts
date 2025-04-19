export interface TimerSchema {
  id: string;
  status?: 'running' | 'pause';
  timeBegin?: number;
  timeEnd?: number;
}
