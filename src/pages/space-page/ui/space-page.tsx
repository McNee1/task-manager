import { CreateProject, GroupManagement, ProjectManagement } from '@/features';

import { useSpace } from '../model';

export const SpacePage = () => {
  const { groups, spaceId, projects } = useSpace();

  return (
    <GroupManagement
      renderButton={(groupId) => (
        <CreateProject
          projects={projects}
          groupId={groupId}
          spaceId={spaceId}
        />
      )}
      spaceId={spaceId}
      data={groups}
    >
      {(activeTab) => (
        <ProjectManagement
          activeTab={activeTab}
          projects={projects}
          spaceId={spaceId}
        />
      )}
    </GroupManagement>
  );
};
