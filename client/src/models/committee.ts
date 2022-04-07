import { User } from "./user";

export interface Committee {
  id: number;
  name: string;
  head: User;
  members: User[]
}
