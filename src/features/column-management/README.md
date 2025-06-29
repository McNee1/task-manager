# Column Management Feature

## Slice Overview

**Slice Name:** Column Management

**Purpose and Responsibilities:**

- Manages kanban column creation, editing, and organization
- Provides column management components with drag-and-drop functionality
- Handles column state management and CRUD operations
- Integrates with Column entity for kanban functionality

**User Needs Addressed:**

- Creating and organizing kanban columns
- Managing column properties and settings
- Supporting column reordering and customization
- Enabling flexible kanban board layouts

**Role in Architecture:**
Feature that provides comprehensive column management capabilities for kanban boards, enabling flexible board organization and customization.

## Main Component

**Name:** ColumnManagement

**Purpose:** Manages kanban board columns with drag-and-drop sorting and collapse functionality.

**What it renders:**

- Sortable column cards with drag handles
- Column headers with editable names and actions
- Column content areas for tasks
- Add column functionality
- Column collapse/expand functionality

**Key Props:**

- `children`: Render function for column content
- `collapsedColumns`: Array of collapsed column IDs
- `columns`: Array of columns to display
- `onCollapseColumn`: Callback when column is collapsed/expanded
- `projectId`: Project identifier for column operations

**Interaction with slice:**
Uses custom hooks for column operations, state management, and integration with the Column entity.

**Important behaviors:**

- Drag-and-drop column reordering
- Column creation with validation
- Column editing and deletion
- Column collapse/expand functionality
- Optimistic updates with error handling

## Structure

```
column-management/
├── lib/                    # Utility functions
│   └── is-valid-column.ts  # Column validation utilities
├── model/                  # Business logic and services
│   ├── api/               # API operations
│   │   ├── use-add-column-mutation.ts    # Add column
│   │   └── use-update-column-mutation.ts # Update column
│   ├── hooks/             # Custom hooks
│   │   ├── handlers/      # Operation handlers
│   │   ├── use-column-modal.ts           # Modal state management
│   │   ├── use-column-meta-data.ts       # Column metadata
│   │   └── use-columns.ts                # Main columns hook
│   └── index.ts           # Model exports
├── services/              # Additional services
│   └── project-query-options.ts  # Query options
├── ui/                    # UI components
│   ├── add-column/        # Column creation components
│   ├── column-card/       # Column display components
│   ├── column-management/ # Main management components
│   ├── modals/            # Modal components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and validation logic
- **model/**: Business logic, API operations, and custom hooks
- **services/**: Additional business logic and query services
- **ui/**: Presentation layer with column management components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- ColumnManagement: Main column management component
- ColumnCard: Column display component

**Exported Hooks:**

- useColumnMetaData: Hook for column metadata
- useColumns: Hook for column data and operations
- useCreateDefaultColumns: Hook for creating default columns
- useUpdateOrderColumn: Hook for column reordering

**Exported Services:**

- projectQueryOptions: Query options for project data

**Usage Notes:**
The slice provides comprehensive column management functionality with drag-and-drop reordering, CRUD operations, and integration with kanban boards.

## Side Effects and Data Fetching

**API Layer:**

- Column CRUD operations through dedicated mutations
- Optimistic updates with rollback on error
- Query invalidation for project data

**State Management:**

- Local component state for UI interactions
- Column state management with ordering
- Modal state management for column operations

**Integration:**

- Connects with Column entity for core functionality
- Integrates with Project entity for kanban board context
- Supports Task entity for task organization
- Enables flexible kanban board layouts

## Usage Examples

**Basic ColumnManagement usage:**

```tsx
<ColumnManagement
  columns={columns}
  projectId='project-123'
  onCollapseColumn={handleCollapseColumn}
  collapsedColumns={collapsedColumns}
>
  {(columnId) => <TaskList columnId={columnId} />}
</ColumnManagement>
```

**ColumnManagement with custom column content:**

```tsx
<ColumnManagement
  columns={columns}
  projectId='project-123'
  onCollapseColumn={handleCollapseColumn}
  collapsedColumns={collapsedColumns}
>
  {(columnId) => (
    <div className='p-4'>
      <CustomTaskComponent columnId={columnId} />
    </div>
  )}
</ColumnManagement>
```
