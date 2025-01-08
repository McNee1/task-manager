import { Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { GroupSchema } from '@/entities';
import { ActionModal, useActionModal } from '@/features';
import { PopoverItems } from '@/shared/types';

import { DeleteGroup } from '../../delete-group';
import { EditGroupName } from '../../edit-group-name';
import { TabCardHeader } from './card-header';

interface TabGroupCardProps {
  group: GroupSchema;
  spaceId: string | undefined;
}

export const CardGroup = ({ group, spaceId }: TabGroupCardProps) => {
  const { handelToggleModal, modal } = useActionModal();

  const popoverListContent: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        handelToggleModal('edit');
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        handelToggleModal('delete');
      },
      type: 'danger-ghost',
    },
  ];

  return (
    <>
      <Card className='shadow-md'>
        <TabCardHeader
          onToggleModal={handelToggleModal}
          popoverItems={popoverListContent}
          groupName={group.groupName}
        />
        <CardContent>
          <p>Card Content for {group.groupName}</p>
        </CardContent>
        <CardFooter className='pb-3'>
          <Button
            className='w-full'
            variant='success'
            size='sm'
          >
            <Plus />
            Добавить проект
          </Button>
        </CardFooter>
      </Card>

      <ActionModal
        renderEditSpace={(newSpaceName) => (
          <EditGroupName
            onSuccess={() => {
              handelToggleModal();
            }}
            newName={newSpaceName}
            groupId={group.id}
            spaceId={spaceId}
          />
        )}
        renderDeleteSpace={() => (
          <DeleteGroup
            onSuccess={() => {
              handelToggleModal();
            }}
            groupName={group.groupName}
            groupId={group.id}
            spaceId={spaceId}
          />
        )}
        onOpenChange={handelToggleModal}
        curSpaceName={group.groupName}
        modal={modal}
      />
    </>
  );
};
