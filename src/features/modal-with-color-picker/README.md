# Modal with Color Picker Feature

## Slice Overview

**Slice Name:** Modal with Color Picker

**Purpose and Responsibilities:**

- Manages modal dialogs with color picker functionality
- Provides reusable modal components with color selection
- Handles color picker state management and validation
- Integrates with various entities for color customization

**User Needs Addressed:**

- Selecting colors for projects, tasks, and other items
- Providing intuitive color picker interface
- Supporting color customization and themes
- Enabling visual organization through colors

**Role in Architecture:**
Feature that provides color selection capabilities through modal dialogs, enabling visual customization and organization across the application.

## Main Component

**Name:** ModalWithColorPicker

**Purpose:** Provides modal dialog with integrated color picker for color selection.

**What it renders:**

- Modal dialog container with title and actions
- Input field for name/description
- Color picker popover with palette
- Color preview and selection interface
- Save/cancel action buttons

**Key Props:**

- `isOpen`: Whether modal is open
- `onOpenChange`: Callback when modal open state changes
- `onSave`: Callback when form is submitted
- `isPending`: Whether form is submitting
- `initColor`: Initial color selection
- `initName`: Initial name value
- `actionName`: Text for the action button
- `title`: Modal title
- `label`: Label for the name input field

**Interaction with slice:**
Uses the `useModalWithColorPicker` hook for modal state management, color selection logic, and form handling.

**Important behaviors:**

- Modal open/close state management
- Color selection and validation
- Form submission and cancellation
- Color preview and confirmation
- Enter key support for form submission

## Structure

```
modal-with-color-picker/
├── hook/                   # Custom hooks
│   └── use-form-modal-with-color-picker.ts  # Main hook
├── ui/                    # UI components
│   ├── modal-with-color-picker.tsx  # Main component
│   └── index.ts           # UI exports
└── index.ts               # Public API exports
```

**Folder roles in FSD:**

- **hook/**: Custom hooks for modal and color picker logic
- **ui/**: Presentation layer with modal components
- **index.ts**: Public API definition and exports

## Public API

**Exported Components:**

- ModalWithColorPicker: Main modal with color picker component

**Exported Hooks:**

- useModalWithColorPicker: Custom hook for modal and color picker logic

**Usage Notes:**
The slice provides modal dialog functionality with integrated color picker, enabling color selection for various entities across the application.

## Side Effects and Data Fetching

**State Management:**

- Modal state management (open/close)
- Color selection state tracking
- Form state management

**Integration:**

- Connects with Project entity for project colors
- Integrates with Column entity for column colors
- Supports Group entity for group colors
- Enables visual customization across entities

## Usage Examples

**Basic ModalWithColorPicker usage:**

```tsx
<ModalWithColorPicker
  isOpen={isModalOpen}
  onOpenChange={setIsModalOpen}
  onSave={(name, color) => handleSave(name, color)}
  title='Create Project'
  label='Project Name'
  actionName='Create'
/>
```

**ModalWithColorPicker with initial values:**

```tsx
<ModalWithColorPicker
  isOpen={isModalOpen}
  onOpenChange={setIsModalOpen}
  onSave={(name, color) => handleSave(name, color)}
  initName='My Project'
  initColor={{ hex: '#3B82F6', name: 'Blue' }}
  title='Edit Project'
  label='Project Name'
  actionName='Save Changes'
  isPending={isSubmitting}
/>
```
