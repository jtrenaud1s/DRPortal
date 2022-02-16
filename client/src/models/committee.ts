import { User } from "./user";

export interface Committee {
    id: number;
    name: string;
    head: number;
    members: number[]
}

export interface CommitteeRenderable {
  id: number;
  name: string;
  head: User;
  members: User[]
}

export interface CommitteeDataTableView {
  name: string;
  head: string;
  members: string[] | string;
}