export interface User {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

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
