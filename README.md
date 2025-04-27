# User Management Dashboard

## Purpose

This is a **User Management Dashboard** where:

- A list of users with details such as Name, Email, Company, Phone, and Website are listed
  - The request to jsonplaceholder is made and then all the users are stored locally through localStorage - the task is small, otherwise other state management tools can be used such as Redux.
  - The emails are displayed as clickable links that open the user's default email client when clicked (using `mailto:`).
  - The phones are formatted as prefix, 9 digits and extension - this can be modified for special needs and also third party libraries can be used
  - The urls are listed as they are coming from jsonplaceholder - if they are stored properly the link is opening the page. 

- Edit existing users
  -All the fields has rules - the required fields are marked and if we try to save we will receive ui message that they are required
  -The url has rule for validation - if we try to type not url we will receive message
  -The email has rule for validation 
  -The prefix can be changed - only 359 and 48 are added and the prefix of the edited phone number

- Delete users from the list.
  - Popconfirm window appears - if we confirm delete locally the user from the list

- Create new users
  -Add new user with the same modal we are using for edit 
  -All the rules are applicable

-Notification
  -There are notification for creating and editing user as a popup window

The application uses **React** with **TypeScript** and **Ant Design** for the UI. It’s bundled using **Vite**.

## Features

- **User List**: Displayed in a table format with columns for Name, Company, Email, Phone, and Website.
- **Pagination**: 5 users per page, with navigation to switch between pages.
- **Create User**: Open a modal to input new user data.
- **Edit User**: Edit existing user details via a modal.
- **Delete User**: Remove a user from the list.

## Technologies

- **React** for building UI components.
- **TypeScript** for static typing.
- **Ant Design** for pre-built UI components.
- **Vite** for fast bundling and development server.

## Setup

1. Clone the repository:
   git clone https://github.com/plamena-petkova/Userboard-app.git

2. Install dependencies:
  cd Userboard-app
  npm install

3. Start the development server:
  npm run dev
