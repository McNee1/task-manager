# Timer Control Feature

## Slice Overview

**Slice Name:** Timer Control

**Purpose and Responsibilities:**

- Manages timer control functionality for task time tracking
- Provides timer start, stop, and pause controls
- Handles timer state management and time calculations
- Integrates with Timer entity for time tracking

**User Needs Addressed:**

- Starting and stopping task timers
- Pausing and resuming time tracking
- Managing timer state and calculations
- Supporting time tracking workflows

**Role in Architecture:**
Feature that provides timer control capabilities, enabling users to track time spent on tasks with start, stop, and pause functionality.

## Main Component

**Name:** TimerControl

**Purpose:** Provides timer control interface with start, stop, pause, and resume functionality.

**What it renders:**

- Timer control buttons (start, stop, pause)
- Timer state display with elapsed time
- Time tracking interface
- Control feedback and status

**Key Props:**

- `id`: Timer identifier for data fetching and updates
- `estimatedTime`: Estimated time for the task (optional)

**Interaction with slice:**
Uses `useQueryTimer` and `useTimerMutation` hooks for timer data fetching and control operations.

**Important behaviors:**

- Timer start, stop, and pause operations
- Time calculation and display
- State management and synchronization
- Control feedback and validation
- Estimated time comparison

## Structure

```
timer-control/
├── model/                  # Business logic and hooks
│   ├── hooks/             # Custom hooks for timer logic
│   │   ├── use-query-timer.ts      # Timer data fetching
│   │   └── use-timer-mutation.ts   # Timer control mutations
│   └── index.ts           # Model exports
├── ui/                    # UI components
│   ├── timer-control.tsx  # Main timer control component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **model/**: Business logic, state management, and custom hooks
- **ui/**: Presentation layer with timer control components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- TimerControl: Main timer control component

**Exported Hooks:**

- useQueryTimer: Hook for timer data fetching
- useTimerMutation: Hook for timer control operations

**Usage Notes:**
The slice provides timer control functionality with start, stop, pause, and resume capabilities, enabling comprehensive time tracking for tasks.

## Side Effects and Data Fetching

**API Layer:**

- Timer data fetching through `useQueryTimer`
- Timer control operations through `useTimerMutation`
- Optimistic updates with rollback on error

**State Management:**

- Timer state management (running, paused, stopped)
- Time calculation and tracking
- Control state synchronization

**Integration:**

- Connects with Timer entity for core functionality
- Integrates with Task entity for task time tracking
- Supports time tracking workflows
- Enables comprehensive time management

## Usage Examples

**Basic TimerControl usage:**

```tsx
<TimerControl
  id='timer-123'
  estimatedTime={{ hours: 2, minutes: 30 }}
/>
```

**TimerControl without estimated time:**

```tsx
<TimerControl id='timer-456' />
```
