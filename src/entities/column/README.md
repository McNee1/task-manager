# Column Entity

## Slice Overview

**Slice Name:** Column

**Purpose and Responsibilities:**

- Manages kanban board columns and task organization
- Provides column display and management components
- Handles column lifecycle and state management
- Integrates with Task and Project entities for comprehensive task management

**User Needs Addressed:**

- Organizing tasks into logical columns and workflows
- Managing kanban board structure and layout
- Supporting task movement between columns
- Enabling workflow visualization and management

**Role in Architecture:**
Core business domain entity that provides kanban board functionality, enabling task organization and workflow management through column-based layouts.

## Main Component

**Name:** Column

**Purpose:** Displays column information with task lists and interactive elements for column management.

**What it renders:**

- Column name, description, and metadata
- Task list management within the column
- Interactive elements for column selection
- Visual indicators for column status

**Key Props:**

- Column data containing name, description, and task relationships
- Click handler for column selection and navigation
- Optional children content for additional elements
- CSS classes for styling customization

**Interaction with slice:**
Uses internal state for computing column statistics, task counts, and managing column-specific interactions and display logic.

**Important behaviors:**

- Column statistics calculation and display
- Interactive column selection and navigation
- Task organization within column contexts
- Responsive design adaptation

## Structure

```
column/
├── api/                    # HTTP operations for column CRUD
├── model/                  # Business logic and types
│   └── types/             # TypeScript type definitions
├── ui/                    # UI components
│   └── column.tsx         # Main Column component
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **api/**: Data fetching and persistence layer
- **model/**: Business logic and type definitions
- **ui/**: Presentation layer with column components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- Column: Main column display component

**Exported Types:**

- ColumnSchema: Complete column data structure
- PartialColumn: Partial column data for updates
- ColumnsRecord: Collection of columns

**Exported API Functions:**

- getColumnById: Fetch single column
- postColumn: Create new column
- editColumn: Update existing column
- deleteColumn: Remove column

**Usage Notes:**
The slice provides kanban board functionality with components for display, types for data structures, and API functions for persistence. Components support task organization and workflow management.

## Side Effects and Data Fetching

**API Layer:**

- All HTTP operations handled through dedicated API functions
- Proper error handling and loading states
- Column lifecycle management

**State Management:**

- Local component state for UI interactions
- API state for data persistence
- Task organization within column contexts

**Integration:**

- Connects with Task entity for task organization
- Integrates with Project entity for project-based organization
- Supports kanban board workflow management
- Enables task movement and status tracking

## Usage Example

**Basic Column usage:**
The Column component displays column information with task lists and interactive elements. It accepts column data and renders column details with task organization.

**Using column types:**
Column types define data structures with properties like id, name, description, and relationships to tasks and projects.

**API operations:**
The column API provides functions for fetching columns by ID, creating new columns, updating existing columns, and deleting columns. These operations handle column lifecycle management.
