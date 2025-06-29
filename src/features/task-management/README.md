# Task Management Feature

## Slice Overview

**Slice Name:** Task Management

**Purpose and Responsibilities:**

- Manages task display and interactions within kanban columns
- Provides task management components with toolbar functionality
- Handles task state management and CRUD operations
- Integrates with Task entity for kanban functionality

**User Needs Addressed:**

- Displaying tasks within kanban columns
- Managing task properties and settings
- Supporting task interactions and editing
- Providing comprehensive task organization

**Role in Architecture:**
Core feature that provides task management capabilities within kanban boards, integrating with Task, Project, Column, and other entities for comprehensive task workflows.

## Main Component

**Name:** TaskManagement

**Purpose:** Manages task display and interactions within kanban columns with context provider.

**What it renders:**

- Task cards within columns
- Task toolbar with editing capabilities
- Task metadata and information
- Task interaction handlers

**Key Props:**

- `columnId`: Column identifier for task context
- `tasks`: Array of tasks to display
- `children`: Render function for task content

**Interaction with slice:**
Uses TaskProvider context for state management and custom hooks for task operations.

**Important behaviors:**

- Task display within columns
- Task toolbar interactions
- Task metadata management
- Context-based state sharing

## Structure

```
task-management/
├── lib/                    # Utility functions and context
│   ├── context/           # Task management context
│   │   ├── task-context.ts        # Context definition
│   │   └── use-task-context.ts    # Context hook
│   └── provider/          # Context providers
│       └── task-provider.tsx      # Task provider component
├── model/                 # Business logic and services
│   ├── api/              # API operations
│   │   ├── use-add-task-mutation.ts    # Add task
│   │   ├── use-delete-task-mutation.ts # Delete task
│   │   ├── use-task-query.ts           # Task query
│   │   └── use-update-task-mutation.ts # Update task
│   ├── hooks/            # Custom hooks
│   │   ├── handlers/     # Operation handlers
│   │   ├── use-active-task.ts          # Active task management
│   │   ├── use-task-meta-data.ts       # Task metadata
│   │   ├── use-task.ts                 # Main task hook
│   │   └── use-toolbar.ts              # Toolbar management
│   ├── types/            # Type definitions
│   └── index.ts          # Model exports
├── services/             # Additional services
│   └── tasks-query-options.ts  # Query options
├── ui/                    # UI components
│   ├── task-management/   # Task management components
│   ├── task-toolbar/      # Task toolbar components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions, context management, and providers
- **model/**: Business logic, API operations, and custom hooks
- **services/**: Additional business logic and query services
- **ui/**: Presentation layer with task management components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- TaskManagement: Main task management component
- TaskToolbar: Task toolbar component
- TaskProvider: Context provider for task state

**Exported Hooks:**

- useTask: Hook for task data and operations
- useActiveTask: Hook for active task management
- useTaskMetaData: Hook for task metadata

**Exported Services:**

- tasksQueryOptions: Query options for tasks data

**Usage Notes:**
The slice provides task management functionality within kanban columns with context-based state management and toolbar interactions.

## Side Effects and Data Fetching

**API Layer:**

- Task CRUD operations through dedicated mutations
- Optimistic updates with rollback on error
- Query invalidation for tasks data

**State Management:**

- Context-based state management for task interactions
- Local component state for UI interactions
- Active task state tracking

**Integration:**

- Connects with Task entity for core functionality
- Integrates with Project entity for project organization
- Links with Column entity for kanban functionality
- Supports Timer entity for time tracking

## Usage Examples

**Basic TaskManagement usage:**

```tsx
<TaskProvider projectId='project-123'>
  <TaskManagement
    columnId='column-456'
    tasks={tasks}
  >
    {(taskId, isCompleted) => (
      <TaskCard
        taskId={taskId}
        isCompleted={isCompleted}
      />
    )}
  </TaskManagement>
</TaskProvider>
```

**TaskManagement with custom task content:**

```tsx
<TaskProvider projectId='project-123'>
  <TaskManagement
    columnId='column-456'
    tasks={tasks}
  >
    {(taskId, isCompleted) => (
      <div className='custom-task-card'>
        <CustomTaskComponent taskId={taskId} />
        {!isCompleted && <TaskActions taskId={taskId} />}
      </div>
    )}
  </TaskManagement>
</TaskProvider>
```
