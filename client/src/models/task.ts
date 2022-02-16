import { Committee } from "./committee";
import { User } from "./user";

export interface Task {
  id: number;
  name: string;
  creator: User;
  description: string;
  created: Date;
  updated: Date;
  assignees: User[];
  committee: Committee
}