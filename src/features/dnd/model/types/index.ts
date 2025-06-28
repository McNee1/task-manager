import type { Active, DataRef, Over } from '@dnd-kit/core';

export type DefaultDragData = Record<string, unknown>;

export type TypedActive<T = DefaultDragData, I = string> = Omit<Active, 'data' | 'id'> & {
  data: DataRef<T>;
  id: I;
};
export type TypedOver<T = DefaultDragData, I = string> = Omit<Over, 'data'> & {
  data: DataRef<T>;
  id: I;
};

export type TypedDndEvent<E, T = DefaultDragData, I = string> = Omit<
  E,
  'active' | 'over'
> & {
  active: TypedActive<T, I>;
  over: TypedOver<T, I> | null;
};
