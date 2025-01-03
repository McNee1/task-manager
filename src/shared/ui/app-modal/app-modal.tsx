import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEnterDown } from '@/shared/lib';

export interface AppModalProps {
  isOpen: boolean;
  onEnterDown?: () => void;
  onOpenChange: () => void;
  renderContent: () => ReactNode;
  subTitle: string;
  title: string;
}

const AppModal = ({
  isOpen,
  onOpenChange,
  renderContent,
  title,
  subTitle,
  onEnterDown,
}: AppModalProps) => {
  useEnterDown(() => {
    if (isOpen) {
      onEnterDown?.();
    }
  });
  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <DialogContent className='p-6 sm:max-w-md lg:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-medium'>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
