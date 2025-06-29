# Timer Entity

## Slice Overview

**Slice Name:** Timer

**Purpose and Responsibilities:**

- Manages time tracking functionality for tasks and projects
- Provides timer display and control components
- Handles timer lifecycle and state management
- Integrates with Task entity for comprehensive time tracking

**User Needs Addressed:**

- Tracking time spent on tasks and projects
- Managing multiple concurrent timers
- Providing accurate time measurements
- Supporting productivity analysis through time data

**Role in Architecture:**
Core business domain entity that provides time tracking capabilities across the application, enabling productivity analysis and time-based project management.

## Main Component

**Name:** Timer

**Purpose:** Displays active timers with real-time updates showing elapsed time and status.

**What it renders:**

- Real-time elapsed time display
- Timer status indicators (running, paused, stopped)
- Time formatting in human-readable format
- Visual feedback for active timers

**Key Props:**

- Timer data containing status, start time, and end time
- CSS classes for styling customization
- Optional children content for additional elements

**Interaction with slice:**
Uses internal state for real-time time calculations, timer status management, and visual state based on timer properties.

**Important behaviors:**

- Continuous time updates and display
- Timer status management and transitions
- Visual state changes based on timer properties
- Responsive design adaptation

## Structure

```
timer/
├── api/                    # HTTP operations for timer CRUD
├── model/                  # Business logic and types
│   └── types/             # TypeScript type definitions
├── ui/                    # UI components
│   └── timer.tsx          # Main Timer component
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **api/**: Data fetching and persistence layer
- **model/**: Business logic and type definitions
- **ui/**: Presentation layer with timer components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- Timer: Main timer display component

**Exported Types:**

- TimerSchema: Complete timer data structure
- PartialTimer: Partial timer data for updates

**Exported API Functions:**

- getTimerById: Fetch single timer
- postTimer: Create new timer
- editTimer: Update existing timer
- deleteTimer: Remove timer

**Usage Notes:**
The slice provides time tracking functionality with components for display, types for data structures, and API functions for persistence. Components support real-time updates and status management.

## Side Effects and Data Fetching

**API Layer:**

- All HTTP operations handled through dedicated API functions
- Proper error handling and loading states
- Timer lifecycle management

**State Management:**

- Local component state for real-time calculations
- API state for data persistence
- Interval management for live updates

**Integration:**

- Connects with Task entity for task-specific time tracking
- Supports project-level time analysis
- Enables productivity reporting and analytics

## Usage Example

**Basic Timer usage:**
The Timer component displays active timers with real-time updates. It accepts timer data and renders elapsed time with appropriate formatting and status indicators.

**Using timer types:**
Timer types define data structures with properties like id, status, start time, and end time for time tracking functionality.

**API operations:**
The timer API provides functions for fetching timers by ID, creating new timers, updating existing timers, and deleting timers. These operations handle timer lifecycle management.
