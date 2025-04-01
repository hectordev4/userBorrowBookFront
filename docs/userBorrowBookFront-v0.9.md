# userBorrowBook front v0.9

## Intro and links

This **v0.9** provides a comprehensive guide to implementing the approach for managing `bookService`, `userService`, and `borrowService` following best practices for modularity and scalability. 

The approach decouples services, centralizes configuration via environment variables, and combines them into a **single context** for efficient access across components.

> This approach we are implemening that combining domain services into one context can reduce <mark>"context hell" (nested providers</mark>), making our app cleaner, especially as it grows with more services.



- **Project Structure**

```bash
.
├── App.jsx
├── assets
├── books
│   ├── Books.jsx
│   ├── CreateBookForm.jsx
│   ├── DetailBook.jsx
│   └── UpdateBookForm.jsx
├── borrows
│   ├── Borrows.jsx
│   └── CreateBorrowForm.jsx
├── index.css
├── layout
│   └── Sidebar.jsx
├── main.jsx
├── middleware
│   ├── borrow.js
│   ├── userService.js
│   ├── bookService.js
│   ├── AppServicesContext.jsx
│   └── bookService.js
├── pages
│   └── Home.jsx
└── users
    ├── CreateUserForm.jsx
    ├── UpdateUserForm.jsx
    └── Users.jsx
```

## Overview

To extend our `BookService` approach for `borrows` and `users` while following the <mark>combined context pattern</mark>, we’ll create separate services for each, move the API base URL to a `.env` file, and **combine them into a single context**. 

> This makes our application more modular and easier to manage.

Steps to Implement:

- **Decouple and Create Services**: Keep `bookService` as a literal object and create new files for `userService` and `borrowService`, each with CRUD operations. For example, `userService` will handle `/users` endpoints, and `borrowService` will manage `/borrows` for borrowing books.
- **Use `.env` for API Base URL**: Create a `.env` file with `VITE_API_BASE_URL=http://localhost:8080/api/v1` to centralize configuration, accessible via `import.meta.env.VITE_API_BASE_URL` in Vite.
- **Combine Services**: Create a `services.js` file that combines all services into one object, like `{ book: bookService, user: userService, borrow: borrowService }`.
- **Update Context**: Replace the `BookServiceContext` with a new `AppServicesContext` that uses this combined object, allowing components to access any service via a custom hook.

## Step-by-Step Implementation

##### 1. Create and Configure `.env` File

To centralize the API base URL, create a `.env` file in the project root with:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

In Vite React applications, environment variables must be prefixed with `VITE_` to be exposed to client-side code, accessible via `import.meta.env.VITE_API_BASE_URL` [Using environment variables in React and Vite, CodeParrot](https://codeparrot.ai/blogs/using-environment-variables-in-react-and-vite). This enhances security by keeping sensitive configuration outside the codebase and allows easy switching between environments (e.g., development, production).

After creating the `.env` file, restart the Vite development server to ensure the variables are loaded.

##### 2. Refactor `bookService.js`

Update `bookService.js` to use the environment variable and ensure it remains a literal object. The current implementation is:

```javascript
import axios from "axios";

// Base URL for the mock API
const API_BASE_URL = "http://localhost:8080/api/v1";

const BookService = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
      throw error;
    }
  },
  // ... other methods
};
```

Refactor it to:

```javascript
import axios from "axios";

const bookService = {
  getAllBooks: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/books`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving books:", error);
      throw error;
    }
  },
  createBook: async (book) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },
  updateBook: async (bookId, book) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/books/${bookId}`, book);
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },
  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
};

export default bookService;
```

This ensures consistency with the environment variable approach and keeps `bookService` as a literal object with methods.

##### 3. Create `userService.js`

Create a new file `userService.js` for user-related CRUD operations. Based on REST API best practices [REST API Design Best Practices for Sub and Nested Resources, Moesif Blog](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Best-Practices-for-Sub-and-Nested-Resources/), use endpoints like `/users` for collection and `/users/{id}` for singletons. The implementation is:

```javascript
import axios from "axios";

const userService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving users:", error);
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving user:", error);
      throw error;
    }
  },
  createUser: async (user) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users`, user);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  updateUser: async (id, user) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default userService;
```

This mirrors the `bookService` structure, handling users with similar error handling and async/await patterns.

##### 4. Create `borrowService.js`

Create `borrowService.js` for borrow-related operations, assuming borrows are records of book borrowing (e.g., user ID, book ID, borrow date, return date). Based on a library management example [GitHub - mashrikt/library-management: RESTful API for Library Management](https://github.com/mashrikt/library-management), use endpoints like `/borrows` for collection and `/borrows/{id}` for singletons, with additional filtering (e.g., by user). The implementation is:

```javascript
import axios from "axios";

const borrowService = {
  getAllBorrows: async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/borrows`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving borrows:", error);
      throw error;
    }
  },
  getBorrowsByUser: async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/borrows?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving borrows by user:", error);
      throw error;
    }
  },
  createBorrow: async (borrow) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/borrows`, borrow);
      return response.data;
    } catch (error) {
      console.error("Error creating borrow:", error);
      throw error;
    }
  },
  updateBorrow: async (id, borrow) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/borrows/${id}`, borrow);
      return response.data;
    } catch (error) {
      console.error("Error updating borrow:", error);
      throw error;
    }
  },
  deleteBorrow: async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/borrows/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting borrow:", error);
      throw error;
    }
  },
};

export default borrowService;
```

This includes `getBorrowsByUser` for filtering, which is common in library systems to track user borrowing history.

##### 5. Combine Services into `services.js`

Create `services.js` to combine all services into one literal object, facilitating centralized access:

```javascript
import bookService from './bookService';
import userService from './userService';
import borrowService from './borrowService';

const Services = {
  book: bookService,
  user: userService,
  borrow: borrowService,
};

export default Services;
```

This approach, inspired by React context examples for multiple services [Use Multiple React Context Providers in the Same App, egghead.io](https://egghead.io/lessons/react-use-multiple-react-context-providers-in-the-same-app), reduces "context hell" by avoiding nested providers and simplifies consumption.

##### 6. Update Context with `AppServicesContext`

Replace the existing `BookServiceContext` with a new context that uses the combined `Services` object. Create `appServicesContext.js`:

```javascript
import React, { createContext, useContext } from 'react';
import Services from './services';

const AppServicesContext = createContext(Services);

export const useAppServices = () => {
  return useContext(AppServicesContext);
};

export const AppServicesProvider = ({ children }) => {
  return (
    <AppServicesContext.Provider value={Services}>
      {children}
    </AppServicesContext.Provider>
  );
};

export default AppServicesContext;
```

Update our root component (e.g., `index.js`) to use the new provider:

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppServicesProvider } from './appServicesContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppServicesProvider>
      <App />
    </AppServicesProvider>
  </React.StrictMode>
);
```

Components can now use `useAppServices()` to access any service, e.g., `const { book, user, borrow } = useAppServices();`, making it easy to manage multiple services without prop drilling.

#### Benefits and Considerations

- **Modularity**: Separating services into files enhances maintainability, as each service can be updated independently.
- **Scalability**: Combining into one context reduces complexity, especially as the application grows with more entities.
- **Security**: Using `.env` for API URLs keeps sensitive information out of the codebase, aligning with Vite best practices [How to Use Environment Variables in a React.js App with Vite, DEV Community](https://dev.to/ebereplenty/how-to-use-environment-variables-in-a-reactjs-app-with-vite-3lh0).
- **Flexibility**: Environment variables allow easy switching between development and production APIs, crucial for large-scale applications.

However,<mark> consider performance implications: if services grow large</mark>, context updates might trigger unnecessary re-renders. 

> Use React.memo or useCallback for optimization if needed, as suggested in [A Guide to useContext and React Context API, Refine](https://refine.dev/blog/usecontext-and-react-context/).

#### Comparison Table: Service Structures

| Aspect               | v0.8 (BookService)       | v0.9 (Combined Services)           |
| -------------------- | ------------------------ | ---------------------------------- |
| Context Structure    | Single context for books | Single context for all services    |
| Service Location     | One file, mixed concerns | Separate files, modular            |
| API Base URL         | Hardcoded in file        | Centralized in `.env`              |
| Scalability          | Limited to books         | Extensible to users, borrows, etc. |
| Access in Components | `useBookService()`       | `useAppServices().book`, etc.      |

This table highlights the transition from a single-service context to a more scalable, modular approach, addressing the user’s need for growth.

#### Conclusion

This implementation decouples services, uses environment variables for configuration, and combines them into a single context for easy access, aligning with React best practices for large-scale applications. It ensures maintainability, security, and scalability, suitable for managing books, users, and borrows in a library system.



### Key Citations

- [Using environment variables in React and Vite, CodeParrot](https://codeparrot.ai/blogs/using-environment-variables-in-react-and-vite)
- [REST API Design Best Practices for Sub and Nested Resources, Moesif Blog](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Best-Practices-for-Sub-and-Nested-Resources/)
- [GitHub - mashrikt/library-management: RESTful API for Library Management](https://github.com/mashrikt/library-management)
- [Use Multiple React Context Providers in the Same App, egghead.io](https://egghead.io/lessons/react-use-multiple-react-context-providers-in-the-same-app)
- [How to Use Environment Variables in a React.js App with Vite, DEV Community](https://dev.to/ebereplenty/how-to-use-environment-variables-in-a-reactjs-app-with-vite-3lh0)
- [A Guide to useContext and React Context API, Refine](https://refine.dev/blog/usecontext-and-react-context/)
