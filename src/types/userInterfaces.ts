import { ReactNode } from "react";

export interface UserProps {
    id: string;
    name: string;
    email: string;
    company: CompanyProps;
    phone: string;
    website: string;
  }

  export interface CompanyProps {
    name: string,
    catchPhrase: string,
    bs: string
  }
  
  export interface UsersProviderProps {
    children: ReactNode;
  }