# Popovers Feature

## Slice Overview

**Slice Name:** Popovers

**Purpose and Responsibilities:**

- Manages popover components for various UI interactions
- Provides priority and calendar popover functionality
- Handles popover state management and positioning
- Integrates with multiple entities for contextual interactions

**User Needs Addressed:**

- Setting task priorities through intuitive interfaces
- Selecting dates and times through calendar popovers
- Providing contextual information and actions
- Supporting quick data entry and selection

**Role in Architecture:**
Feature that provides popover components for enhanced user interactions, enabling quick data entry and contextual information display.

## Main Component

**Name:** Popovers (Collection of popover components)

**Purpose:** Provides various popover components for priority selection, date picking, and contextual interactions.

**What it renders:**

- Priority selection popovers with visual badges
- Calendar and date picker popovers
- Contextual information displays
- Quick action interfaces

**Key Props:**

- Popover configuration and positioning
- Selection handlers and callbacks
- Content and styling options
- Trigger and activation settings

**Interaction with slice:**
Uses internal state management for popover visibility, positioning, and interaction handling.

**Important behaviors:**

- Popover show/hide state management
- Positioning and alignment logic
- Selection handling and validation
- Contextual content display

## Structure

```
popovers/
├── popover-priority/       # Priority selection popover
│   └── ui/                # Priority popover components
├── popover-with-calendar/  # Calendar popover
│   └── ui/                # Calendar popover components
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **popover-priority/**: Priority selection popover functionality
- **popover-with-calendar/**: Calendar and date picker popover functionality
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- PopoverPriority: Priority selection popover
- PopoverWithCalendar: Calendar and date picker popover

**Usage Notes:**
The slice provides popover components for priority selection and date picking, enabling quick data entry and contextual interactions.

## Side Effects and Data Fetching

**State Management:**

- Popover visibility state management
- Selection state tracking
- Positioning state management

**Integration:**

- Connects with Task entity for priority and date settings
- Integrates with Project entity for project scheduling
- Supports Timer entity for time tracking
- Enables quick data entry across entities

## Usage Examples

**Basic PopoverPriority usage:**

```tsx
<PopoverPriority
  importance={task.importance}
  onChangePriority={({ importance }) => updateTaskPriority(importance)}
/>
```

**Basic PopoverWithCalendar usage:**

```tsx
<PopoverWithCalendar
  initDate={task.dueDate}
  onSaveDate={(date) => updateTaskDueDate(date)}
  onResetDate={() => clearTaskDueDate()}
/>
```

**PopoverWithCalendar with portal:**

```tsx
<PopoverWithCalendar
  initDate={task.dueDate}
  onSaveDate={(date) => updateTaskDueDate(date)}
  portal={true}
/>
```
