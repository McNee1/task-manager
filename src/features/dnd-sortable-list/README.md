# DND Sortable List Feature

## Slice Overview

**Slice Name:** DND Sortable List

**Purpose and Responsibilities:**

- Manages sortable list functionality with drag and drop
- Provides sortable list components and hooks
- Handles list reordering and state management
- Integrates with various entities for list organization

**User Needs Addressed:**

- Reordering items within sortable lists
- Providing intuitive drag and drop list interactions
- Supporting flexible list organization
- Maintaining list order state

**Role in Architecture:**
Feature that provides sortable list capabilities with drag and drop functionality, enabling flexible list organization and reordering.

## Main Component

**Name:** DndSortableList

**Purpose:** Provides drag-and-drop sortable list component for reordering items with visual feedback.

**What it renders:**

- Sortable list container with drag context
- Draggable list items with drag handles
- Drop zones between items
- Visual feedback during reordering
- Drag overlay for dragged item

**Key Props:**

- `sortableItems`: Array of sortable elements
- `renderSortItem`: Function to render element content
- `onUpdateOrder`: Callback when element order changes
- `renderHandle`: Function to render drag handle
- `fallbackContent`: Content to display when list is empty
- `className`: CSS class for styling list items
- `modifier`: Sort direction ('vertical' | 'horizontal')

**Interaction with slice:**
Uses the `useSortableData` hook for managing list state, reordering logic, and drag and drop interactions.

**Important behaviors:**

- List item reordering through drag and drop
- Visual feedback during drag operations
- State management for list order
- Drop zone detection between items
- Optimistic updates with order recalculation

## Structure

```
dnd-sortable-list/
├── model/                  # Business logic and hooks
│   ├── hook/              # Custom hooks for sortable list logic
│   │   └── use-sortable-data.ts  # Main sortable data hook
│   ├── types/             # TypeScript type definitions
│   │   └── sortable.ts    # Sortable item types
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── dnd-sortable-list.tsx  # Main DndSortableList component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **model/**: Business logic, state management, and type definitions
- **ui/**: Presentation layer with sortable list components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- DndSortableList: Main sortable list component

**Exported Types:**

- SortableItem: Interface for sortable items
- UpdateOrderFn: Function type for order updates

**Exported Hooks:**

- useSortableData: Custom hook for sortable list logic

**Usage Notes:**
The slice provides sortable list functionality with drag and drop reordering, custom hooks for list management, and types for configuration.

## Side Effects and Data Fetching

**State Management:**

- Local component state for list order
- Drag and drop state management
- Visual feedback state tracking

**Integration:**

- Connects with DND feature for drag and drop functionality
- Integrates with various entities for list organization
- Supports flexible list reordering across the application

## Usage Examples

**Basic DndSortableList usage:**

```tsx
<DndSortableList
  sortableItems={tasks}
  renderSortItem={(task) => <TaskCard task={task} />}
  onUpdateOrder={(newOrder) => setTasks(newOrder)}
  modifier='vertical'
/>
```

**DndSortableList with custom drag handle:**

```tsx
<DndSortableList
  sortableItems={projects}
  renderSortItem={(project) => <ProjectCard project={project} />}
  renderHandle={(project) => <GripVertical className='cursor-grab' />}
  onUpdateOrder={(newOrder) => updateProjectOrder(newOrder)}
  fallbackContent={<EmptyState />}
/>
```
