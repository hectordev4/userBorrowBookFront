# userBorrowBook front v0.6

## Intro and links

- [userBorrowBookFront/userBorrowBookFront at 06551ba5036bd27e31ed5f8b9d1495233a0bc206 · AlbertProfe/userBorrowBookFront · GitHub](https://github.com/AlbertProfe/userBorrowBookFront/tree/06551ba5036bd27e31ed5f8b9d1495233a0bc206/userBorrowBookFront)

**Project Structure**

```bash
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   └── UpdateBookForm.jsx
├── borrows
│   └── Borrows.jsx
├── index.css
├── layout
│   └── Sidebar.jsx
├── main.jsx
├── middleware
│   └── api.js
├── pages
│   └── Home.jsx
└── users
    ├── CreateUserForm.jsx
    ├── UpdateUserForm.jsx
    └── Users.jsx
```

## How it workd

This `users` domain represents a user management system with three main components: 

- `Users`,

- `CreateUserForm`, 

- and `UpdateUserForm`.

### Users

The `Users` component displays a list of users and provides f<mark>unctionality to create, update, and delete users</mark>. It uses the `useState` hook to manage the users' state and `useEffect` to fetch users from an API when the component mounts. 

The component renders a grid of user cards, each displaying basic user information and buttons for deletion and updating. It also includes a "`Create new User`" button that navigates to the creation form.

### CreateUserForm

The `CreateUserForm` component is a form for adding new users. It uses the useState hook to manage form data and includes fields for name, email, password, age, address, and date of birth. 

The `handleChange` function updates the form state as the user types, while `handleSubmit` sends a **POST** request to create a new user when the form is submitted.

### UpdateUserForm

The `UpdateUserForm` component is similar to the `CreateUserForm` but is <mark>pre-populated with existing user data</mark>.

It receives the user data through the location state, set when navigating from the `Users` component. 

This form allows editing of `user` details and includes an additional "`Archived`" checkbox.

On submission, it sends a **PUT** request to update the user's information.

## MUI

All components use Material-UI for styling and layout, providing a consistent and responsive design. They also use React Router for navigation between different views.
