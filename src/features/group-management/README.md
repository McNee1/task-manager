# Group Management Feature

## Slice Overview

**Slice Name:** Group Management

**Purpose and Responsibilities:**

- Manages group creation, editing, and organization within workspaces
- Provides group management components with tabbed interface
- Handles group state management and CRUD operations
- Integrates with Group entity for project organization

**User Needs Addressed:**

- Creating and organizing project groups within workspaces
- Managing group properties and settings
- Supporting group hierarchy and relationships
- Enabling flexible project organization

**Role in Architecture:**
Feature that provides comprehensive group management capabilities, enabling users to create, organize, and manage project groups for better project organization and collaboration.

## Main Component

**Name:** GroupManagement

**Purpose:** Manages groups within a workspace with tabbed interface and CRUD operations.

**What it renders:**

- Tabbed interface for group navigation
- Group cards with project content areas
- Group creation button with popover
- Group editing and deletion modals
- Active tab state management

**Key Props:**

- `children`: Render function for tab content
- `data`: Array of groups to manage
- `renderButton`: Optional function to render custom buttons in group cards
- `spaceId`: Space identifier for group operations

**Interaction with slice:**
Uses custom hooks for group operations, state management, and integration with the Group entity.

**Important behaviors:**

- Tab switching with local storage persistence
- Group creation with validation
- Group editing and deletion
- Active tab state management
- Default group creation for new spaces

## Structure

```
group-management/
├── lib/                    # Utility functions
│   └── update-local-storage/  # Local storage utilities
├── model/                  # Business logic and services
│   ├── api/               # API operations
│   │   ├── use-add-group-mutation.ts    # Add group
│   │   ├── use-delete-group-mutation.ts # Delete group
│   │   └── use-edit-group-mutation.ts   # Edit group
│   ├── hooks/             # Custom hooks
│   │   ├── handlers/      # Operation handlers
│   │   ├── use-active-tab.ts            # Active tab management
│   │   ├── use-group-model.ts           # Modal state management
│   │   └── use-group.ts                 # Main group hook
│   └── index.ts           # Model exports
├── services/              # Additional services
│   └── groups-query-options.ts  # Query options
├── ui/                    # UI components
│   ├── create-group/      # Group creation components
│   ├── group-management.tsx  # Main management component
│   ├── modal/            # Modal components
│   ├── tabs/             # Tab components
│   └── index.ts          # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and local storage management
- **model/**: Business logic, API operations, and custom hooks
- **services/**: Additional business logic and query services
- **ui/**: Presentation layer with group management components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- GroupManagement: Main group management component

**Exported Hooks:**

- useCreateDefaultGroup: Hook for creating default groups

**Exported Services:**

- groupsQueryOptions: Query options for groups data

**Usage Notes:**
The slice provides comprehensive group management functionality with tabbed interface, CRUD operations, and integration with projects.

## Side Effects and Data Fetching

**API Layer:**

- Group CRUD operations through dedicated mutations
- Optimistic updates with rollback on error
- Query invalidation for groups data

**State Management:**

- Local component state for UI interactions
- Group state management with filtering by space
- Tab state management with local storage persistence

**Integration:**

- Connects with Group entity for core functionality
- Integrates with Project entity for project organization
- Supports hierarchy and relationship management
- Enables flexible project organization

## Usage Examples

**Basic GroupManagement usage:**

```tsx
<GroupManagement
  data={groups}
  spaceId='space-123'
>
  {(activeTab) => <ProjectList groupId={activeTab} />}
</GroupManagement>
```

**GroupManagement with custom buttons:**

```tsx
<GroupManagement
  data={groups}
  spaceId='space-123'
  renderButton={(groupId) => (
    <Button onClick={() => handleCustomAction(groupId)}>Custom Action</Button>
  )}
>
  {(activeTab) => <ProjectList groupId={activeTab} />}
</GroupManagement>
```
