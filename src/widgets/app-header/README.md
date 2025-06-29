# App Header Widget

## Slice Overview

**Slice Name:** App Header

**Purpose and Responsibilities:**

- Manages the main application header with navigation and space management
- Provides header components with breadcrumb navigation
- Handles space editing and deletion functionality
- Integrates with Space entity for workspace management

**User Needs Addressed:**

- Navigating between different sections of the application
- Managing workspace properties and settings
- Providing context-aware breadcrumb navigation
- Supporting workspace editing and deletion

**Role in Architecture:**
Core widget that provides the main application header with navigation, space management, and contextual information display.

## Main Component

**Name:** AppHeader

**Purpose:** Provides the main application header with sidebar trigger, breadcrumb navigation, and space management.

**What it renders:**

- Sidebar trigger button for navigation
- Header breadcrumb with current space name
- Space editing and deletion modals
- Context-aware navigation elements

**Key Props:**

- No props required (uses internal state and context)

**Interaction with slice:**
Uses the `useHeader` hook for state management, space operations, and modal handling.

**Important behaviors:**

- Sidebar toggle functionality
- Breadcrumb navigation display
- Space editing and deletion modals
- Context-aware space name display
- Modal state management

## Structure

```
app-header/
├── lib/                    # Utility functions
│   ├── get-breadcrumb-data/  # Breadcrumb data utilities
│   └── get-space-name/       # Space name utilities
├── model/                  # Business logic and hooks
│   ├── hooks/             # Custom hooks
│   │   └── use-header.ts  # Main header hook
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── app-header.tsx     # Main AppHeader component
│   ├── header-breadcrumb/ # Breadcrumb components
│   ├── modals/            # Modal components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and data processing
- **model/**: Business logic, state management, and custom hooks
- **ui/**: Presentation layer with header components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- AppHeader: Main application header component

**Exported Hooks:**

- useHeader: Hook for header state management and operations

**Usage Notes:**
The widget provides the main application header with navigation, space management, and contextual information display.

## Side Effects and Data Fetching

**State Management:**

- Local component state for modal visibility
- Space data management and caching
- Navigation state tracking

**Integration:**

- Connects with Space entity for workspace management
- Integrates with navigation system for breadcrumbs
- Supports modal system for space operations
- Enables sidebar integration

## Usage Examples

**Basic AppHeader usage:**

```tsx
<AppHeader />
```

**AppHeader in layout context:**

```tsx
<Layout>
  <AppHeader />
  <main>{/* Main content */}</main>
</Layout>
```
