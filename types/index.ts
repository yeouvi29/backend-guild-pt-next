export interface ErrorFallbackPropsType {
  error: Error & { digest?: string };
  reset: () => void;
}

export interface TodoItemType {
  id: string;
  task: string;
  completed: boolean;
}

export type GetTodoListResponseType = TodoItemType[];
