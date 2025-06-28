import { DEFAULT_ORDER } from '@/shared';

export const reorderItemWithinList = <T extends { order: number }>(
  items: T[],
  overIndex: number
) => {
  // Создаем новый массив, чтобы не мутировать оригинальный
  const updatedItems = [...items];

  const movedItem = updatedItems[overIndex];

  // Определяем новое значение order для перемещаемого элемента
  if (overIndex > 0 && overIndex < updatedItems.length - 1) {
    // Если элемент не в начале и не в конце, берем среднее значение
    const previousOrder = updatedItems[overIndex - 1].order;
    const nextOrder = updatedItems[overIndex + 1].order;
    movedItem.order = +((previousOrder + nextOrder) / 2).toFixed();
  } else if (overIndex === 0) {
    // Если элемент перемещается на первое место, задаем ему меньший порядок
    movedItem.order = updatedItems[1].order - DEFAULT_ORDER; // или любое другое значение, меньшее первого
  } else if (overIndex === updatedItems.length - 1) {
    // Если элемент перемещается в конец, задаем ему большее значение, чем у последнего элемента
    movedItem.order = updatedItems[updatedItems.length - 2].order + DEFAULT_ORDER; // или любое другое значение
  }

  return updatedItems;
};
