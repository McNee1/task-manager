import { useEffect, useState } from 'react';

import { CheckList } from '@/entities';
import { ProgressCheckList } from '@/features';

interface TaskChecklistProps {
  checklist: CheckList[] | undefined;
  onChangeChecklist?: (updatedChecklist: CheckList[]) => void;
}

export const TaskChecklist = ({
  checklist: initialChecklist,
  onChangeChecklist,
}: TaskChecklistProps) => {
  const [checklist, setChecklist] = useState<CheckList[]>(initialChecklist ?? []);

  useEffect(() => {
    setChecklist(initialChecklist ?? []);
  }, [initialChecklist]);

  const handleToggleItem = (itemId: string) => {
    const updatedChecklist = checklist.map((item) =>
      item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
    );

    setChecklist(updatedChecklist);
    onChangeChecklist?.(updatedChecklist);
  };

  if (!checklist.length) return null;

  return (
    <ProgressCheckList
      onToggleItem={handleToggleItem}
      list={checklist}
    />
  );
};
