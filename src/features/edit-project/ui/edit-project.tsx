import { Label } from '@radix-ui/react-label';
import { Palette } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Muted } from '@/components/ui/typography';
import { ProjectSchema } from '@/entities';
import { AppModal, AppPopover, ColorPalette, usePopover } from '@/shared';

import { useEditForm, useEditProject } from '../hook';

interface EditProjectProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  project: ProjectSchema;
}

export const EditProject = ({ onOpenChange, project, isOpen }: EditProjectProps) => {
  const portalRef = useRef(null);

  const { state, fn } = useEditForm(project.color, project.name);

  const { handleEditName, isPending } = useEditProject(project.id, () => {
    if (isOpen) onOpenChange();
  });

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

  return (
    <>
      <AppModal
        subTitle='Введите новое названия проекта.'
        onOpenChange={onOpenChange}
        title='Редактировать'
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
            onClick={() => {
              handleEditName(state.projectName, state.projectColor);
            }}
            disabled={isPending}
          >
            Применить
          </Button>
        </div>
      </AppModal>
    </>
  );
};
