import { Palette } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Muted } from '@/components/ui/typography';
import {
  AppModal,
  AppPopover,
  ColorPalette,
  SpaceId,
  useEnterDown,
  usePopover,
} from '@/shared';

import { useAddProject, useProjectForm } from '../hook';

interface AddProjectModalProps {
  groupId: string;
  isOpen: boolean;
  onOpenChange: () => void;
  spaceId: SpaceId;
}

export const AddProjectModal = ({
  isOpen,
  onOpenChange,
  groupId,
  spaceId,
}: AddProjectModalProps) => {
  const portalRef = useRef(null);

  const { fn, state } = useProjectForm();

  const { handleAddProject, isPending } = useAddProject(
    spaceId,
    state.projectName,
    groupId,
    state.projectColor,
    successfullyAdded
  );

  const { handleTogglePopover, isOpen: popoverIsOpen } = usePopover();

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

  useEnterDown(() => {
    if (isOpen) {
      handleAddProject();
    }
  });

  function successfullyAdded() {
    if (isOpen) onOpenChange();
    fn.setProjectName('');
  }

  return (
    <AppModal
      onOpenChange={onOpenChange}
      title='Новый проект'
      isOpen={isOpen}
    >
      <div
        className='flex flex-col gap-2'
        ref={portalRef}
      >
        <Label
          className='font-normal text-muted-foreground'
          htmlFor='projectName'
        >
          Добавить проекта:
        </Label>
        <Input
          onChange={fn.handleInputChange}
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
          Добавить проект
        </Button>
      </div>
    </AppModal>
  );
};
