import { ReactNode } from "react";

export interface UserProps {
  id?: string;
  name?: string;
  username?:string;
  email?: string;
  company?: CompanyProps;
  phone?: string;
  website?: string;
}

export interface CompanyProps {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface UsersProviderProps {
  children: ReactNode;
}

export interface UsersContextProps {
  users: UserProps[];
  deleteUser: (id: string) => void;
  editUser: (updatedUser:UserProps) => void;
  addUser:(user:UserProps) => void;
}

export enum ActionType {
  Create = 'create',
  Edit = 'edit',
}
