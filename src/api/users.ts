import { UserProps } from "../types/userInterfaces";




  export async function getUsers(): Promise<UserProps[]> {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const users = await response.json();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
      return [];
    }
  }