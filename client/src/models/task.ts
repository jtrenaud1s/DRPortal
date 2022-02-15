import { User } from "./user";

export interface Task {
  id: number;
  name: string;
  creator: User | number;
  description: string;
  created: Date;
  updated: Date;
  assignees: User[] | number[];
}
