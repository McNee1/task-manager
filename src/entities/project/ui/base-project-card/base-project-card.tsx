import { FolderClosed } from 'lucide-react';
import { memo } from 'react';

const DEFAULT_COLOR = '#1A1A3D';

interface BaseProjectCardProps {
  /** Project color for the folder icon */
  color?: string;
  /** Project name to display */
  name: string;
}

/**
 * Basic project card displaying folder icon and project name.
 * Used as a foundation for more complex project card components.
 */
export const BaseProjectCard = memo(({ color, name }: BaseProjectCardProps) => {
  return (
    <div className='inline-flex items-center gap-x-5 px-4'>
      <FolderClosed
        stroke={color ?? DEFAULT_COLOR}
        className='size-5'
        strokeWidth={0.9}
      />
      <div>{name}</div>
    </div>
  );
});

BaseProjectCard.displayName = 'BaseProjectCard';
