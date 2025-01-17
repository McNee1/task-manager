import { ActionModal, DeleteGroup, EditGroupName, ModalType } from '@/features';

interface ActionModalSpaceProps {
  groupId: string;
  groupName: string;
  modal: ModalType;
  onToggleModal: VoidFunction;
  spaceId: string | undefined;
}

export const ActionModalSpace = ({
  groupId,
  groupName,
  modal,
  onToggleModal,
  spaceId,
}: ActionModalSpaceProps) => {
  return (
    <ActionModal
      renderEditSpace={(newSpaceName) => (
        <EditGroupName
          onSuccess={() => {
            onToggleModal();
          }}
          newName={newSpaceName}
          groupId={groupId}
          spaceId={spaceId}
        />
      )}
      renderDeleteSpace={() => (
        <DeleteGroup
          onSuccess={() => {
            onToggleModal();
          }}
          groupName={groupName}
          groupId={groupId}
          spaceId={spaceId}
        />
      )}
      onOpenChange={onToggleModal}
      curSpaceName={groupName}
      modal={modal}
    />
  );
};
