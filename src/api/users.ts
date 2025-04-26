import { UserProps } from "../types/userInterfaces";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

  export async function getUsers(): Promise<UserProps[]> {
    const url = BASE_URL;
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


  export async function updateUser(user: UserProps): Promise<UserProps | null> {
    const url = `${BASE_URL}/${user.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const updatedUser = await response.json();
     
      return updatedUser; 
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
      return null;
    }
  }

  export async function createUser(user: UserProps): Promise<UserProps | null> {
    const url = BASE_URL;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const createdUser = await response.json();
     
      return createdUser; 
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
      return null;
    }
  }


  export async function deleteUserRequest(id: string): Promise<boolean> {
    const url = `${BASE_URL}/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
      return false;
    }
  }
  