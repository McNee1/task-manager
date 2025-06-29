# Checklist Management Feature

## Slice Overview

**Slice Name:** Checklist Management

**Purpose and Responsibilities:**

- Manages checklist creation, editing, and organization for tasks
- Provides checklist management components with different display modes
- Handles checklist state management and CRUD operations
- Integrates with Checklist entity for task organization

**User Needs Addressed:**

- Creating and organizing task checklists
- Managing checklist items and completion status
- Supporting checklist validation and organization
- Enabling task breakdown and progress tracking

**Role in Architecture:**
Feature that provides comprehensive checklist management capabilities, enabling users to create, organize, and track task checklists for better task breakdown and completion tracking.

## Main Component

**Name:** ChecklistManagement

**Purpose:** Provides checklist display and interactions for tasks or toolbars with different panel types.

**What it renders:**

- Task checklist panel with progress indicator
- Toolbar checklist panel with add/delete functionality
- Checklist items with completion status
- Progress tracking and validation

**Key Props:**

- `type`: Type of checklist to display ('task' | 'toolbar')
- `projectId`: Project identifier for checklist data
- `taskId`: Task identifier for filtering checklist items
- `isCompleted`: Whether the task is completed (affects interaction)

**Interaction with slice:**
Uses custom hooks for checklist operations, state management, and integration with the Checklist entity.

**Important behaviors:**

- Checklist data fetching and filtering by task
- Item completion toggling with optimistic updates
- Adding new checklist items with validation
- Deleting checklist items with confirmation
- Progress calculation and display

## Structure

```
checklist-management/
├── model/                  # Business logic and services
│   ├── api/               # API operations
│   │   ├── use-add-item-mutation.ts      # Add checklist item
│   │   ├── use-delete-item-mutation.ts   # Delete checklist item
│   │   ├── use-query-checklist.ts        # Fetch checklist data
│   │   └── use-toggle-item-mutation.ts   # Toggle item completion
│   ├── hooks/             # Custom hooks
│   │   ├── handlers/      # Operation handlers
│   │   └── use-checklist.ts              # Main checklist hook
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── checklist-management.tsx          # Main component
│   ├── task-checklist-panel/             # Task view components
│   ├── toolbar-checklist-panel/          # Toolbar view components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **model/**: Business logic, API operations, and custom hooks
- **ui/**: Presentation layer with checklist management components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- ChecklistManagement: Main checklist management component

**Exported Hooks:**

- useChecklist: Hook for checklist data and operations
- useDeleteItem: Hook for item deletion
- usePostNewItem: Hook for adding new items
- useToggleItem: Hook for toggling item completion

**Usage Notes:**
The slice provides comprehensive checklist management functionality with different display modes for tasks and toolbars.

## Side Effects and Data Fetching

**API Layer:**

- Checklist CRUD operations through dedicated mutations
- Optimistic updates with rollback on error
- Query invalidation for checklist data

**State Management:**

- Local component state for UI interactions
- Checklist state management with filtering
- Item completion state tracking

**Integration:**

- Connects with Checklist entity for core functionality
- Integrates with Task entity for task organization
- Supports item completion tracking and progress calculation

## Usage Examples

**Basic ChecklistManagement usage:**

```tsx
<ChecklistManagement
  type='task'
  projectId='project-123'
  taskId='task-456'
  isCompleted={false}
/>
```

**Toolbar checklist with full functionality:**

```tsx
<ChecklistManagement
  type='toolbar'
  projectId='project-123'
  taskId='task-456'
/>
```
