import { GroupContainer, SortableProjects } from './container';

export const SpacePage = () => {
  return (
    <GroupContainer>
      {(activeTab) => <SortableProjects activeTab={activeTab} />}
    </GroupContainer>
  );
};
