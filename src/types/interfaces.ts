import { ReactNode } from "react";

export interface UserProps {
  id?: string;
  name?: string;
  username?:string;
  email?: string;
  company?: CompanyProps;
  website?: string;
  phone?: string;
  prefix?:string;
  extension?:string;
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

export type ModalComponentProps = {
  actionType: ActionType | undefined;
  isModalOpen: boolean;
  onCancel: () => void;
  user?: UserProps;
};
