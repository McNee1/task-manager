# Project Management Feature

## Slice Overview

**Slice Name:** Project Management

**Purpose and Responsibilities:**

- Manages project creation, editing, and organization within groups
- Provides project management components with sortable functionality
- Handles project state management and CRUD operations
- Integrates with Project entity for workspace organization

**User Needs Addressed:**

- Creating and organizing projects within groups
- Managing project properties and settings
- Supporting project reordering and customization
- Enabling flexible project organization

**Role in Architecture:**
Feature that provides comprehensive project management capabilities, enabling users to create, organize, and manage projects within workspace groups.

## Main Component

**Name:** ProjectManagement

**Purpose:** Manages projects within a group with sortable functionality and CRUD operations.

**What it renders:**

- Sortable project cards with drag handles
- Project creation button with modal
- Project editing and deletion modals
- Project completion tracking
- Project metadata display

**Key Props:**

- `activeTab`: Active tab identifier for group context
- `projects`: Array of projects to display
- `spaceId`: Space identifier for project operations

**Interaction with slice:**
Uses custom hooks for project operations, state management, and integration with the Project entity.

**Important behaviors:**

- Drag-and-drop project reordering
- Project creation with color selection
- Project editing and deletion
- Completion percentage calculation
- Default column creation for new projects

## Structure

```
project-management/
├── lib/                    # Utility functions
│   ├── get-completion-percentage/  # Completion calculation
│   └── get-existing-group/         # Group utilities
├── model/                  # Business logic and services
│   ├── api/               # API operations
│   │   ├── use-add-project-mutation.ts    # Add project
│   │   ├── use-delete-project-mutate.ts   # Delete project
│   │   ├── use-update-order-mutation.ts   # Update order
│   │   └── use-update-project-mutation.ts # Update project
│   ├── hooks/             # Custom hooks
│   │   ├── handlers/      # Operation handlers
│   │   ├── use-project-data.ts            # Project data management
│   │   └── use-project-model.ts           # Modal state management
│   └── index.ts           # Model exports
├── services/              # Additional services
│   └── projects-query-options.ts  # Query options
├── ui/                    # UI components
│   ├── create-project/    # Project creation components
│   ├── modals/            # Modal components
│   ├── project-card/      # Project display components
│   ├── project-management.tsx  # Main management component
│   ├── sortable-projects/ # Sortable project components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and calculation helpers
- **model/**: Business logic, API operations, and custom hooks
- **services/**: Additional business logic and query services
- **ui/**: Presentation layer with project management components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- ProjectManagement: Main project management component
- CreateProject: Project creation component

**Exported Services:**

- projectsQueryOptions: Query options for projects data

**Usage Notes:**
The slice provides comprehensive project management functionality with sortable reordering, CRUD operations, and integration with groups.

## Side Effects and Data Fetching

**API Layer:**

- Project CRUD operations through dedicated mutations
- Optimistic updates with rollback on error
- Query invalidation for projects data

**State Management:**

- Local component state for UI interactions
- Project state management with filtering by group
- Modal state management for project operations

**Integration:**

- Connects with Project entity for core functionality
- Integrates with Group entity for project organization
- Supports Column entity for default column creation
- Enables flexible project organization

## Usage Examples

**Basic ProjectManagement usage:**

```tsx
<ProjectManagement
  activeTab='group-123'
  projects={projects}
  spaceId='space-456'
/>
```
