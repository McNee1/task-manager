# App Sidebar Widget

## Slice Overview

**Slice Name:** App Sidebar

**Purpose and Responsibilities:**

- Manages the main application sidebar with navigation and space listing
- Provides sidebar components with navigation menu and space management
- Handles space listing and navigation functionality
- Integrates with Space entity and AddSpace feature

**User Needs Addressed:**

- Navigating between different sections of the application
- Accessing and managing workspaces
- Creating new workspaces
- Providing quick access to main navigation items

**Role in Architecture:**
Core widget that provides the main application sidebar with navigation, space management, and workspace creation capabilities.

## Main Component

**Name:** AppSidebar

**Purpose:** Provides the main application sidebar with navigation menu, space listing, and workspace creation.

**What it renders:**

- Navigation header with main menu items
- Main navigation menu items
- Add space functionality
- Space listing with loading states
- Error handling for space loading

**Key Props:**

- No props required (uses internal state and entity hooks)

**Interaction with slice:**
Uses the `useSpace` hook for space data fetching and the `AddSpace` feature for workspace creation.

**Important behaviors:**

- Navigation menu display
- Space listing with loading states
- Error handling for failed space loading
- Integration with AddSpace feature
- Responsive sidebar behavior

## Structure

```
app-sidebar/
├── lib/                    # Utility functions
│   ├── get-nav-items/      # Navigation items utilities
│   └── get-space-items/    # Space items utilities
├── model/                  # Business logic and constants
│   ├── constant/          # Navigation constants
│   ├── types/             # TypeScript type definitions
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── app-sidebar.tsx    # Main AppSidebar component
│   ├── nav/               # Navigation components
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and data processing
- **model/**: Business logic, constants, and type definitions
- **ui/**: Presentation layer with sidebar components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- AppSidebar: Main application sidebar component

**Exported Constants:**

- menuItems: Navigation menu configuration

**Usage Notes:**
The widget provides the main application sidebar with navigation, space management, and workspace creation capabilities.

## Side Effects and Data Fetching

**State Management:**

- Space data fetching and caching
- Loading state management
- Error state handling

**Integration:**

- Connects with Space entity for workspace data
- Integrates with AddSpace feature for workspace creation
- Supports navigation system for menu items
- Enables responsive sidebar behavior

## Usage Examples

**Basic AppSidebar usage:**

```tsx
<AppSidebar />
```

**AppSidebar in layout context:**

```tsx
<Layout>
  <AppSidebar />
  <main>{/* Main content */}</main>
</Layout>
```
