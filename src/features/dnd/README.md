# DND Feature

## Slice Overview

**Slice Name:** DND (Drag and Drop)

**Purpose and Responsibilities:**

- Manages drag and drop functionality across the application
- Provides drag and drop components and utilities
- Handles drag and drop state management and interactions
- Integrates with various entities for reordering and organization

**User Needs Addressed:**

- Reordering tasks, projects, and other items
- Moving items between different containers
- Providing intuitive drag and drop interactions
- Supporting flexible item organization

**Role in Architecture:**
Core feature that provides drag and drop capabilities across the application, enabling flexible item organization and reordering functionality.

## Main Component

**Name:** Dnd

**Purpose:** Provides drag and drop context wrapper using dnd-kit library with sensors for various interaction types.

**What it renders:**

- Drag and drop context for child components
- Sensors for pointer, keyboard, and touch interactions
- Modifiers for movement restrictions
- Collision detection system

**Key Props:**

- `children`: Content to enable drag and drop for
- `modifier`: Restrict drag movement to specific axis ('vertical' | 'horizontal')
- `onDragEnd`: Callback when drag operation ends
- `onDragOver`: Callback when dragging over drop targets
- `onDragStart`: Callback when drag operation starts

**Interaction with slice:**
Uses internal state for managing drag operations, drop zones, and visual feedback during drag and drop interactions.

**Important behaviors:**

- Multi-sensor support (pointer, keyboard, touch)
- Movement restriction modifiers
- Collision detection with pointerWithin strategy
- Activation constraints for better UX

## Structure

```
dnd/
├── lib/                    # Utility functions and helpers
│   ├── insert-new-item-and-set-order/  # Item insertion utilities
│   └── reorder-Item-within-list/       # Reordering utilities
├── model/                  # Business logic and types
│   ├── types/             # TypeScript type definitions
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── dnd.tsx            # Main DND component
│   ├── droppable.tsx      # Droppable component
│   ├── sortable-item.tsx  # Sortable item component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **lib/**: Utility functions and helper logic
- **model/**: Business logic and type definitions
- **ui/**: Presentation layer with DND components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- Dnd: Main drag and drop context component
- Droppable: Drop zone component
- SortableItem: Sortable item component

**Exported Types:**

- TypedActive: Typed active drag state
- TypedOver: Typed over state
- TypedDndEvent: Typed drag and drop events
- DefaultDragData: Default drag data type

**Exported Utilities:**

- insertNewItemAndSetOrder: Utility for inserting items with order calculation
- reorderItemWithinList: Utility for reordering items within a list

**Usage Notes:**
The slice provides comprehensive drag and drop functionality with components for drag sources and drop targets, utilities for item manipulation, and types for configuration.

## Side Effects and Data Fetching

**State Management:**

- Local component state for drag operations
- Visual feedback state management
- Drop zone state tracking

**Integration:**

- Connects with Task entity for task reordering
- Integrates with Project entity for project organization
- Supports Column entity for kanban functionality
- Enables flexible item organization across the application

## Usage Examples

**Basic Dnd usage:**

```tsx
<Dnd onDragEnd={handleDragEnd}>
  <SortableContext items={items}>
    {items.map((item) => (
      <SortableItem
        key={item.id}
        id={item.id}
      >
        <ItemComponent item={item} />
      </SortableItem>
    ))}
  </SortableContext>
</Dnd>
```

**Dnd with movement restrictions:**

```tsx
<Dnd
  modifier='horizontal'
  onDragEnd={handleDragEnd}
  onDragStart={handleDragStart}
>
  <Droppable id='container-1'>
    <SortableContext items={items}>
      {items.map((item) => (
        <SortableItem
          key={item.id}
          id={item.id}
        >
          <ItemComponent item={item} />
        </SortableItem>
      ))}
    </SortableContext>
  </Droppable>
</Dnd>
```
