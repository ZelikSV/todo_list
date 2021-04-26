// eslint-disable-next-line no-shadow
export enum TodoStatus {
  EDIT = 'edit',
  READ = 'read',
}

export interface ITodoItem {
  id: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  status: TodoStatus;
}

export type Error = {
  isError: boolean;
  message: string;
};
