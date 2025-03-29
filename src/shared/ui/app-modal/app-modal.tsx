import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface AppModalProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
  subTitle?: string;
  title: string;
}

const AppModal = ({ isOpen, onOpenChange, children, title, subTitle }: AppModalProps) => {
  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <DialogContent className='gap-6 p-6 sm:max-w-md lg:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-medium'>{title}</DialogTitle>
          <DialogDescription aria-describedby={subTitle}>{subTitle}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
