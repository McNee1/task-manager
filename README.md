# Task Manager

---

## ✨ Overview

**Task Manager** is a modern, feature-rich task management application designed to help individuals and teams organize projects, tasks, checklists, and timers efficiently. The app is built with a modular architecture using React and TypeScript, and leverages a fast development environment with Vite and TailwindCSS. It supports drag-and-drop for intuitive task organization, flexible grouping, project and column management, checklists, descriptions, and a built-in timer for tracking work sessions. Data can be persisted locally and via a mock API for easy prototyping and testing.

---

## 🖥️ Demo

> _Demo coming soon!_

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **json-server**
- **dnd-kit**
- **TanStack React Query**
- **TanStack React Router**
- **shadcn UI**
- **ESLint**
- **Prettier**

---

## 📁 Project Structure

This project follows the **Feature-Sliced Design (FSD)** architecture for scalable and maintainable code organization.

```
├── src/
│   ├── app/           # Entry point, routing, layout
│   ├── assets/        # Static assets
│   ├── components/    # Reusable UI components
│   ├── entities/      # Business entities (task, group, project, etc.)
│   ├── features/      # Isolated features (drag-n-drop, management, modals, etc.)
│   ├── pages/         # Application pages
│   ├── shared/        # Shared utilities, types, services, UI
│   └── widgets/       # Large widgets (header, sidebar)
├── json-server/db.json # Mock data for API
├── public/            # Public files
├── package.json       # Scripts and dependencies
```
