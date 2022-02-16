export interface User {
  id?: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  initiation_number: number;
  is_superuser?: boolean;
  is_staff?: boolean;
  last_login?: Date;
  created?: Date;
  updated?: Date;
  is_active?: boolean;
  groups?: [];
  user_permissions?: string[]
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
