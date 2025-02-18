import { Palette } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Muted } from '@/components/ui/typography';
import {
  AppModal,
  AppPopover,
  ColorField,
  ColorPalette,
  useEnterDown,
  usePopover,
} from '@/shared';

import { useModalWithColorPicker } from '../hook';

interface AddProjectModalProps {
  actionName: string;
  initColor?: ColorField;
  initName?: string;
  isOpen: boolean;
  isPending?: boolean;
  label?: string;
  onOpenChange: VoidFunction;
  onSave: (name: string, color: ColorField) => void;
  title: string;
}

export const ModalWithColorPicker = ({
  isOpen,
  onOpenChange,
  onSave,
  isPending,
  initColor,
  initName,
  actionName,
  title,
  label = 'Название проекта',
}: AddProjectModalProps) => {
  const portalRef = useRef(null);

  const { fn, state } = useModalWithColorPicker(initName, initColor);

  const { handleTogglePopover, isOpen: popoverIsOpen } = usePopover();

  const handleAddProject = () => {
    onSave(state.projectName, state.projectColor);
  };

  useEnterDown(() => {
    if (isOpen) {
      handleAddProject();
    }
  }, []);

  const colorTrigger = (
    <div
      className='inline-flex cursor-pointer items-center gap-x-3 rounded-md px-2 py-1.5 hover:bg-muted/70'
      onClick={handleTogglePopover}
    >
      {state.projectColor?.hex ? (
        <div
          style={{ backgroundColor: state.projectColor.hex }}
          className='size-6 rounded-md'
        />
      ) : (
        <Palette
          strokeWidth={1}
          size={24}
        />
      )}

      <div className='text-sm'>{state.projectColor?.name ?? 'Выберите цвет'}</div>
    </div>
  );

  return (
    <AppModal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      title={title}
    >
      <div
        className='flex flex-col gap-2'
        ref={portalRef}
      >
        {label && (
          <Label
            className='font-normal text-muted-foreground'
            htmlFor='projectName'
          >
            {label}
          </Label>
        )}
        <Input
          onChange={fn.handleNameChange}
          placeholder='введите текст'
          value={state.projectName}
          id='projectName'
          className='mb-1'
        />

        <div className='mb-3 flex flex-col gap-y-1'>
          <Muted>Цвет</Muted>

          <AppPopover
            portalContainer={portalRef.current}
            onOpenChange={handleTogglePopover}
            trigger={colorTrigger}
            isOpen={popoverIsOpen}
            contentSide='right'
            className='w-fit'
          >
            <ColorPalette
              onResetColor={() => {
                fn.handleChangeColor(null);
              }}
              onColorChange={fn.handleChangeColor}
            />
          </AppPopover>
        </div>
        <Button
          onClick={handleAddProject}
          disabled={isPending}
        >
          {actionName}
        </Button>
      </div>
    </AppModal>
  );
};
