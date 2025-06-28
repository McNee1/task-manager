import { DEFAULT_ORDER } from '@/shared';

export const insertNewItemAndSetOrder = <T extends { order: number }>(
  items: T[],
  index: number
): T[] => {
  if (items.length === 0) {
    return items;
  }

  const item = items[index];
  let newOrder: number;

  // Специальные случаи для разных позиций
  if (items.length === 1) {
    // Единственный элемент в списке
    newOrder = DEFAULT_ORDER;
  } else if (index === 0) {
    // Вставка в начало
    newOrder = items[0].order - DEFAULT_ORDER;
  } else if (index === items.length - 1) {
    // Вставка в конец - используем последний элемент + шаг
    newOrder = items[items.length - 2].order + DEFAULT_ORDER;
  } else {
    // Вставка в середину
    const prevOrder = items[index - 1].order;
    const nextOrder = items[index + 1].order;

    // Проверка на необходимость пересчета порядка
    if (prevOrder < nextOrder - 1) {
      newOrder = Math.floor((prevOrder + nextOrder) / 2);
    } else {
      // Если места нет - пересчитываем порядки для всех элементов
      const newItems = [...items];
      for (let i = 0; i < newItems.length; i++) {
        newItems[i] = { ...newItems[i], order: (i + 1) * DEFAULT_ORDER };
      }
      return newItems;
    }
  }

  // Обновляем только если порядок изменился
  if (item.order === newOrder) {
    return items;
  }

  // Создаем новый массив с обновленной задачей
  const newItems = [...items];
  newItems[index] = {
    ...item,
    order: newOrder,
  };

  return newItems;
};
