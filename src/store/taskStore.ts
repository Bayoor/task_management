import { create } from 'zustand';
import type { TaskStatus, TaskPriority } from '@/types/task';
import type { SortOption, SortOrder } from '@/types/common';

interface TaskFilters {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  category: string | 'all';
  search: string;
}

interface TaskStore {
  filters: TaskFilters;
  sortBy: SortOption;
  sortOrder: SortOrder;
  isDialogOpen: boolean;
  selectedTaskId: string | null;

  setStatusFilter: (status: TaskStatus | 'all') => void;
  setPriorityFilter: (priority: TaskPriority | 'all') => void;
  setCategoryFilter: (category: string) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  toggleSortOrder: () => void;
  setDialogOpen: (isOpen: boolean) => void;
  setSelectedTaskId: (id: string | null) => void;
  resetFilters: () => void;
}

const initialFilters: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  search: '',
};

export const useTaskStore = create<TaskStore>(set => ({
  filters: initialFilters,
  sortBy: 'dueDate',
  sortOrder: 'asc',
  isDialogOpen: false,
  selectedTaskId: null,

  setStatusFilter: status =>
    set(state => ({
      filters: { ...state.filters, status },
    })),

  setPriorityFilter: priority =>
    set(state => ({
      filters: { ...state.filters, priority },
    })),

  setCategoryFilter: category =>
    set(state => ({
      filters: { ...state.filters, category },
    })),

  setSearch: search =>
    set(state => ({
      filters: { ...state.filters, search },
    })),

  setSortBy: sortBy => set({ sortBy }),

  setSortOrder: sortOrder => set({ sortOrder }),

  toggleSortOrder: () =>
    set(state => ({
      sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),

  setDialogOpen: isOpen => set({ isDialogOpen: isOpen }),

  setSelectedTaskId: id => set({ selectedTaskId: id }),

  resetFilters: () => set({ filters: initialFilters }),
}));
