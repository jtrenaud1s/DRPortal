export interface Task {
  id: number;
  name: string;
  creator: number;
  description: string;
  created: Date;
  updated: Date;
  assignees: number[];
  committee: number;
}

export interface TaskDataTableView {
  name: string;
  created: Date | string;
  updated: Date | string;
  assignees: string[] | string;
  committee: string;
}
