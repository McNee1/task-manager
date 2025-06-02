import { memo, ReactNode } from 'react';

interface ItemListProps<T> {
  children: (item: T, id: number) => ReactNode;
  className?: string;
  items: T[];
}

/**
 * Renders a list of items by calling the given `children` function for each item.
 * The `children` function receives two arguments: the item and its index.
 *
 * @example
 * <ItemList items={[1, 2, 3]}>
 *   {(item, id) => <div key={id}>{item}</div>}
 * </ItemList>
 */
export const ItemListComponent = <T,>({
  children,
  items,
  className,
}: ItemListProps<T>) => {
  if (className) {
    return <div className={className}>{items.map((item, id) => children(item, id))}</div>;
  }
  return <>{items.map((item, id) => children(item, id))}</>;
};

export const ItemList = memo(ItemListComponent) as typeof ItemListComponent;
