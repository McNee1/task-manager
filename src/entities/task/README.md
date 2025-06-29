# Task Entity

## Slice Overview

**Slice Name:** Task

**Purpose and Responsibilities:**

- Manages individual task data and lifecycle
- Provides task display and interaction components
- Handles task CRUD operations and state management
- Integrates with other entities for comprehensive task management

**User Needs Addressed:**

- Creating and managing individual tasks
- Tracking task completion status and progress
- Organizing tasks within projects and columns
- Supporting task relationships and dependencies

**Role in Architecture:**
Core business domain entity that serves as the foundation for task management across the application, connecting with Project, Column, Timer, and other entities.

## Main Component

**Name:** TaskCard

**Purpose:** Primary UI representation of a task with interactive elements and status indicators.

**What it renders:**

- Task title and completion status
- Visual indicators for overdue tasks
- Interactive elements for task selection
- Reference copying functionality
- Date display with smart formatting

**Key Props:**

- Task data containing title, status, dates, and metadata
- Click handler for task selection and navigation
- Optional children content for additional elements
- CSS classes for styling customization

**Interaction with slice:**
Uses the useTaskCard hook for computing visual styles, calculating overdue days, and managing date formatting logic.

**Important behaviors:**

- Real-time status updates and visual feedback
- Click handling for task selection
- Reference copying to clipboard
- Responsive design adaptation

## Structure

```
task/
├── api/                    # HTTP operations for task CRUD
├── model/                  # Business logic, types, and hooks
│   ├── const/             # Task-related constants
│   ├── hooks/             # Custom hooks for task logic
│   └── types/             # TypeScript type definitions
├── ui/                    # UI components
│   └── task-card.tsx      # Main TaskCard component
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **api/**: Data fetching and persistence layer
- **model/**: Business logic, state management, and type definitions
- **ui/**: Presentation layer with reusable components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- TaskCard: Main task display component

**Exported Types:**

- TaskSchema: Complete task data structure
- PartialTask: Partial task data for updates
- TasksRecord: Collection of tasks

**Exported API Functions:**

- getTaskById: Fetch single task
- postTask: Create new task
- editTask: Update existing task
- deleteTask: Remove task

**Usage Notes:**
The slice provides a complete task management solution with components for display, types for data structures, and API functions for persistence. Components can be used across different contexts with consistent styling and behavior.

## Side Effects and Data Fetching

**API Layer:**

- All HTTP operations handled through dedicated API functions
- Proper error handling and loading states
- Data persistence and synchronization

**State Management:**

- Local component state for UI interactions
- API state for data persistence
- Custom hooks for business logic

**Integration:**

- Connects with Column entity for kanban organization
- Integrates with Timer entity for time tracking
- Links with Checklist and Description entities for detailed management

## Usage Example

**Basic TaskCard usage:**
The TaskCard component displays task information with completion status and interactive elements. It accepts task data and renders a card with title, status indicators, and click handlers for task selection.

**Using task types:**
Task types define data structures with properties like id, title, completion status, dates, and relationships to other entities.

**API operations:**
The task API provides functions for fetching tasks by ID, creating new tasks, updating existing tasks, and deleting tasks. These operations handle data persistence and synchronization.
