# Add Space Feature

## Slice Overview

**Slice Name:** Add Space

**Purpose and Responsibilities:**

- Manages space creation functionality with modal input dialog
- Provides space creation components with validation
- Handles space creation state management and error handling
- Integrates with Space entity for workspace management

**User Needs Addressed:**

- Creating new workspaces and spaces through simple modal interface
- Managing space properties with validation
- Supporting workspace organization
- Enabling quick space creation workflow

**Role in Architecture:**
Feature that provides space creation capabilities through a modal dialog, enabling users to quickly create workspaces within the application.

## Main Component

**Name:** AddSpace

**Purpose:** Provides space creation interface with modal input dialog and validation.

**What it renders:**

- Button to trigger space creation modal
- Modal with input field for space name
- Validation feedback and error handling
- Loading states during creation

**Key Props:**

- `className`: CSS classes for styling the component
- Modal configuration and settings
- Creation handlers and callbacks
- Validation rules and settings

**Interaction with slice:**
Uses `useAddSpace` hook for space creation logic, state management, and integration with the Space entity.

**Important behaviors:**

- Modal open/close state management
- Space name validation (non-empty check)
- API integration for space creation
- Success/error toast notifications
- Automatic modal closure on success

## Structure

```
add-space/
├── model/                  # Business logic and services
│   ├── api/               # API operations
│   │   └── use-add-space-mutation.ts  # Space creation mutation
│   ├── hook/              # Custom hooks
│   │   └── use-add-space.ts           # Main hook for space creation
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── add-space.tsx      # Main AddSpace component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **model/**: Business logic, API operations, and custom hooks
- **ui/**: Presentation layer with space creation components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- AddSpace: Main space creation component with modal dialog

**Exported Hooks:**

- useAddSpace: Custom hook for space creation logic and state management

**Usage Notes:**
The slice provides space creation functionality through a simple modal interface with validation and error handling.

## Side Effects and Data Fetching

**API Layer:**

- Space creation through `useAddSpaceMutation` hook
- Optimistic updates with rollback on error
- Query invalidation for spaces list

**State Management:**

- Local component state for modal visibility
- Loading states during API calls
- Error state management with toast notifications

**Integration:**

- Connects with Space entity for core functionality
- Integrates with Group entity for default group creation
- Supports workspace organization
