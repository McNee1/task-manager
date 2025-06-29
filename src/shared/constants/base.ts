import { ComponentProps } from 'react';

import { KeyImportance } from '../types';
import { AppBadge } from '../ui';

export const MINUTE = 1000 * 60;
export const DEFAULT_ORDER = 10000;

export const PALETTE_COLORS = [
  { hex: '#FF9999', name: 'Светло-красный' },
  { hex: '#FFCC66', name: 'Светло-оранжевый' },
  { hex: '#ADD8E6', name: 'Светло-голубой' },
  { hex: '#B3FF99', name: 'Светло-зеленый' },
  { hex: '#99FF99', name: 'Светло-зеленый' },
  { hex: '#99FFFF', name: 'Светло-бирюзовый' },
  { hex: '#66B3FF', name: 'Светло-синий' },
  { hex: '#9999FF', name: 'Светло-синий' },
  { hex: '#D9A6FF', name: 'Светло-фиолетовый' },
  { hex: '#FF99FF', name: 'Светло-магента' },
  { hex: '#FF66B3', name: 'Светло-розовый' },
  { hex: '#FFFFFF', name: 'Белый' },
  { hex: '#E0E0E0', name: 'Светло-серый' },
  { hex: '#D9D9D9', name: 'Серый' },
  { hex: '#B3B3B3', name: 'Темно-серый' },
  { hex: '#CCCCCC', name: 'Светло-серый' },
  { hex: '#E6B3B3', name: 'Светло-коричневый' },
  { hex: '#FFD700', name: 'Золотой' },
  { hex: '#FFCC99', name: 'Светло-оранжево-красный' },
  { hex: '#D2FFB2', name: 'Светло-зеленый лайм' },
  { hex: '#D1C6E7', name: 'Светло-синий фиолетовый' },
];

export const IMPORTANCE_VALUES = {
  0: { ru: 'Заморожено', en: 'feeze' },
  1: { ru: 'Низкий', en: 'low' },
  2: { ru: 'Средний', en: 'medium' },
  3: { ru: 'Высокий', en: 'high' },
} as const;

export const IMPORTANCE_LIST = [
  { importance: 0, name: IMPORTANCE_VALUES[0].en, ruName: IMPORTANCE_VALUES[0].ru },
  { importance: 1, name: IMPORTANCE_VALUES[1].en, ruName: IMPORTANCE_VALUES[1].ru },
  { importance: 2, name: IMPORTANCE_VALUES[2].en, ruName: IMPORTANCE_VALUES[2].ru },
  { importance: 3, name: IMPORTANCE_VALUES[3].en, ruName: IMPORTANCE_VALUES[3].ru },
] as const;

export const badgeVariantsMap: Record<
  KeyImportance,
  ComponentProps<typeof AppBadge>['variant']
> = {
  0: 'primary',
  1: 'success',
  2: 'warning',
  3: 'danger',
};
