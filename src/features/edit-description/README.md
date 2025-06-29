# Edit Description Feature

## Slice Overview

**Slice Name:** Edit Description

**Purpose and Responsibilities:**

- Manages description editing functionality with auto-save
- Provides inline description editing components
- Handles description state management and validation
- Integrates with Description entity for content management

**User Needs Addressed:**

- Editing task and project descriptions inline
- Providing auto-save functionality for descriptions
- Supporting description validation and formatting
- Enabling quick description updates

**Role in Architecture:**
Feature that provides description editing capabilities, enabling users to quickly update and manage description content with auto-save functionality.

## Main Component

**Name:** EditDescription

**Purpose:** Provides editable description component with auto-save functionality and loading states.

**What it renders:**

- Textarea for description editing
- Loading state while fetching description
- Error state for failed requests
- Auto-save on Enter key press
- Placeholder text for empty descriptions

**Key Props:**

- `className`: CSS classes for styling
- `id`: Description identifier for fetching and updating

**Interaction with slice:**
Uses `useQueryDescription` and `useMutationDescription` hooks for data fetching and updating.

**Important behaviors:**

- Automatic description loading on mount
- Inline editing with auto-save on Enter
- Loading and error state management
- Optimistic updates with rollback on error
- Shift+Enter for new lines

## Structure

```
edit-description/
├── model/                  # Business logic and hooks
│   ├── hooks/             # Custom hooks for editing logic
│   │   ├── use-mutation-description.ts  # Description update mutation
│   │   └── use-query-description.ts     # Description fetching query
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── edit-description.tsx  # Main EditDescription component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **model/**: Business logic, state management, and custom hooks
- **ui/**: Presentation layer with editing components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- EditDescription: Main description editing component

**Exported Hooks:**

- useMutationDescription: Hook for description updates
- useQueryDescription: Hook for description fetching

**Usage Notes:**
The slice provides description editing functionality with inline editing capabilities, auto-save, and error handling.

## Side Effects and Data Fetching

**API Layer:**

- Description fetching through `useQueryDescription`
- Description updates through `useMutationDescription`
- Optimistic updates with rollback on error

**State Management:**

- Local component state for editing mode
- Loading states during API calls
- Error state management

**Integration:**

- Connects with Description entity for content management
- Integrates with Task entity for task descriptions
- Supports Project entity for project descriptions
