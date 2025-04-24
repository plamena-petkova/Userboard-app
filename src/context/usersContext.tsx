import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { UserProps, UsersProviderProps } from "../types/userInterfaces";
  import { getUsers } from "../api/users";
  

  export const UsersContext = createContext<UserProps[] | undefined>(undefined);


  export const UsersProvider = ({ children }: UsersProviderProps) => {
    const [users, setUsers] = useState<UserProps[]>([]);
  
    useEffect(() => {
      getUsers()
        .then((data) => {
          if (data) {
            setUsers(data);
          }
        })
        .catch(console.error);
    }, []);
  
    return (
        <UsersContext.Provider value={users} >
          {children}
        </UsersContext.Provider>
      );
  };
  
  export const useUsersContext = () => {
    const users = useContext(UsersContext);
  
    if (!users) {
      throw new Error("UsersContext must be used within a UsersProvider");
    }
  
    return users;
  };
  