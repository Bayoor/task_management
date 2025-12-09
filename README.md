# Task Manager

A modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS v4.

## Features

- Kanban-style task board with drag-and-drop functionality
- Create, edit, and delete tasks
- Task status management (Todo, In Progress, Done)
- Task priority levels (Low, Medium, High, Urgent)
- Due dates with calendar integration
- Search functionality
- Real-time synchronization with JSON Server
- Responsive design

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (UI state) + React Query (server data)
- **Styling**: Tailwind CSS v4
- **Drag & Drop**: @dnd-kit
- **Mock API**: JSON Server

## Getting Started

### 1. Start the JSON Server (in one terminal)
```bash
npm run server
```

### 2. Start the development server (in another terminal)
```bash
npm run dev
```

### 3. Or run both concurrently
```bash
npm run dev:all
```

### 4. Open your browser
Navigate to `http://localhost:5173`

The JSON Server will be running on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run server` - Start JSON Server on port 3001
- `npm run dev:all` - Run both dev and server concurrently
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
task-manager/
├── src/
│   ├── components/
│   │   ├── layout/        # Layout components (Header, MainLayout)
│   │   ├── tasks/         # Task components (Board, Card, Column, Form)
│   │   ├── common/        # Common components (LoadingSpinner)
│   │   └── ui/            # UI components (Button, Input, Card, Badge)
│   ├── hooks/             # Custom hooks (useTasks, useDebounce)
│   ├── services/          # API services
│   ├── store/             # Zustand store
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── db.json                # JSON Server database
└── public/                # Static assets
```

## Features Overview

- **Drag & Drop**: Drag tasks between columns to change their status
- **Search**: Search tasks by title or description
- **Add Task**: Click "New Task" button to create a new task
- **Edit Task**: Click the edit icon on any task card
- **Delete Task**: Click the delete icon to remove a task
- **Task Details**: Each task shows title, description, priority, and due date

## License

MIT
