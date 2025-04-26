import { UserProps } from "../types/userInterfaces";


export const saveUsersToStorage = (users: UserProps[]) => {
  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users to localStorage", error);
  }
};

export const getUsersFromStorage = (): UserProps[] => {
  try {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch (error) {
    console.error("Error retrieving users from localStorage", error);
    return [];
  }
};