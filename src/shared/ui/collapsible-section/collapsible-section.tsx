import { ReactNode } from 'react';

interface CollapsibleSectionProps {
  children: ReactNode;
  className?: string;
  header: ReactNode;
  isCollapsed: boolean;
  onToggle: () => void;
}

/**
 * A collapsible section of the UI.
 *
 * @param {boolean} isCollapsed - Whether the section is currently collapsed.
 * @param {function} onToggle - A callback to invoke when the section is toggled.
 * @param {ReactNode} header - The header of the section.
 * @param {ReactNode} children - The content of the section.
 * @param {string} [className] - Additional CSS classes to apply to the outermost element.
 */
export const CollapsibleSection = ({
  isCollapsed,
  onToggle,
  header,
  children,
  className,
}: CollapsibleSectionProps) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
    }}
    className={className}
  >
    <div
      onClick={onToggle}
      role='button'
    >
      {header}
    </div>
    {!isCollapsed && <>{children}</>}
  </div>
);
