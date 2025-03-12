import { useSpace } from '../model';
import { GroupContainer, SortableProjects } from './container';

export const SpacePage = () => {
  const { groups, projects, spaceId } = useSpace();

  return (
    <>
      <GroupContainer
        spaceId={spaceId}
        groups={groups}
      >
        {(activeTab) => (
          <SortableProjects
            activeTab={activeTab}
            spaceId={spaceId}
            data={projects}
          />
        )}
      </GroupContainer>
    </>
  );
};
