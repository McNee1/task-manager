# Project Entity

## Slice Overview

**Slice Name:** Project

**Purpose and Responsibilities:**

- Manages project data and lifecycle
- Provides project display and management components
- Handles project CRUD operations and state management
- Integrates with Task, Group, and Space entities for comprehensive project management

**User Needs Addressed:**

- Creating and managing individual projects
- Organizing tasks within project contexts
- Tracking project progress and completion status
- Managing project relationships with groups and spaces

**Role in Architecture:**
Core business domain entity that provides project management capabilities, serving as the foundation for task organization and project-based workflows.

## Main Component

**Name:** BaseProjectCard

**Purpose:** Displays project information with completion statistics and interactive elements for project management.

**What it renders:**

- Project name, description, and metadata
- Progress indicators and task statistics
- Interactive elements for project selection
- Visual indicators for project status

**Key Props:**

- Project data containing name, description, and task relationships
- Click handler for project selection and navigation
- Optional children content for additional elements
- CSS classes for styling customization

**Interaction with slice:**
Uses internal state for computing project statistics, completion percentages, and managing project-specific interactions and display logic.

**Important behaviors:**

- Project statistics calculation and display
- Interactive project selection and navigation
- Visual state management based on project properties
- Responsive design adaptation

## Structure

```
project/
├── api/                    # HTTP operations for project CRUD
├── model/                  # Business logic and types
│   └── types/             # TypeScript type definitions
├── ui/                    # UI components
│   └── base-project-card/ # BaseProjectCard component
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **api/**: Data fetching and persistence layer
- **model/**: Business logic and type definitions
- **ui/**: Presentation layer with project components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- BaseProjectCard: Main project display component

**Exported Types:**

- ProjectSchema: Complete project data structure
- PartialProject: Partial project data for updates
- ProjectsRecord: Collection of projects

**Exported API Functions:**

- getProjectById: Fetch single project
- postProject: Create new project
- editProject: Update existing project
- deleteProject: Remove project

**Usage Notes:**
The slice provides project management functionality with components for display, types for data structures, and API functions for persistence. Components serve as the foundation for all project representations.

## Side Effects and Data Fetching

**API Layer:**

- All HTTP operations handled through dedicated API functions
- Proper error handling and loading states
- Project lifecycle management

**State Management:**

- Local component state for UI interactions
- API state for data persistence
- Progress calculations for completion statistics

**Integration:**

- Connects with Task entity for task organization
- Integrates with Group entity for group-based organization
- Links with Space entity for workspace management
- Supports hierarchical organization of work items

## Usage Example

**Basic BaseProjectCard usage:**
The BaseProjectCard component displays project information with progress indicators and interactive elements. It accepts project data and renders project details with completion statistics.

**Using project types:**
Project types define data structures with properties like id, name, description, and relationships to tasks, groups, and spaces.

**API operations:**
The project API provides functions for fetching projects by ID, creating new projects, updating existing projects, and deleting projects. These operations handle project lifecycle management.
