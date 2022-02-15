export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  //is_vice_president: string;
};

export interface UserWithPassword extends User {
  password: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface Task {
  id: number;
  name: string;
  creator: User;
  description: string;
  created: Date;
  updated: Date;
  assignees: User[];
};
