import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserProps, UsersContextProps, UsersProviderProps } from "../types/interfaces";
import { getUsers } from "../api/users";
import { getUsersFromStorage, saveUsersToStorage } from "../utils/userStorage";


export const UsersContext = createContext<UsersContextProps | undefined>(undefined);


export const UsersProvider = ({ children }: UsersProviderProps) => {

  const [users, setUsers] = useState<UserProps[]>(getUsersFromStorage);


  useEffect(() => {
    if (users.length === 0) {
      getUsers()
        .then((data) => {
          if (data && data.length > 0) {
            setUsers(data);
            saveUsersToStorage(data);
          }
        })
        .catch(console.error);
    }
  }, [users.length]);


  useEffect(() => {
    if (users.length > 0) {
      saveUsersToStorage(users);
    }
  }, [users]);


  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const addUser = (user: UserProps) => {
    setUsers((prev) => [...prev, user]);
  };
  
  const editUser = (updatedUser: UserProps) => {
    if(users.find((user) => user.id === updatedUser.id)) {

      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    }
    
  };


  return (
    <UsersContext.Provider value={{ users, deleteUser, addUser, editUser }} >
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
