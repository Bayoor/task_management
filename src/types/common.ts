export interface SelectOption {
  label: string;
  value: string;
}

export type SortOption = 'dueDate' | 'priority' | 'title' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
