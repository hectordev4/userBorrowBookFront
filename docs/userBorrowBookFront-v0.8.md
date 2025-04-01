# userBorrowBook front v0.8

## Intro and links

> `BookService`, `BookServiceContext` , `useBookService` , `BookServiceProvider`: together, these concepts **promote separation of concerns, reduce code duplication, and enable a clean architecture where API logic is decoupled from UI components**. 
> 
> This pattern is particularly relevant in modern applications that rely on dynamic data interactions with APIs.

The **v0.8** provides a structured way to manage API interactions for a book object. It demonstrates two approaches:

1. **Direct Import/Export:** A simple `BookService` object that can be imported and used directly in components.

2. **Context API:** A more robust approach using React Context:
   
   - A `BookService` object containing API functions.
   
   - A `BookServiceContext` to provide the service.
   
   - A `useBookService` hook for components to easily access the service.
   
   - A `BookServiceProvider` to wrap the application and make the service available to all components.
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
│   └── bookService.js
├── pages
│   └── Home.jsx
└── users
    ├── CreateUserForm.jsx
    ├── UpdateUserForm.jsx
    └── Users.jsx
```

## Two approaches

Table comparing **Direct Import/Export** and **Context API** approaches for managing and accessing a `BookService` in React:

| **Approach**             | **Pros**                                                                             | **Cons**                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Direct Import/Export** | - Simple and straightforward implementation.                                         | - Leads to tight coupling between components and the service, reducing flexibility.  |
|                          | - Easy to use for small-scale applications or isolated components.                   | - Does not support global state sharing across deeply nested components.             |
|                          | - No additional overhead of context creation or providers.                           | - Difficult to scale as the application grows.                                       |
| **Context API**          | - Enables global state sharing without prop drilling, improving maintainability.     | - May introduce performance overhead due to unnecessary re-renders if not optimized. |
|                          | - Decouples components from direct dependency on the service, enhancing reusability. | - Requires more boilerplate code (context creation, provider setup, hooks).          |
|                          | - Scalable and suitable for complex applications with multiple components.           | - Misuse (e.g., unsafe default values) can lead to bugs and debugging challenges.    |

This comparison highlights that **Direct Import/Export** is ideal for simple applications, while the **Context API** excels in scenarios requiring shared state management across multiple components.

## How does it work

Connecting the four concepts—`BookService`, `BookServiceContext`, `useBookService`, and `BookServiceProvider`—is crucial for creating a **scalable, modular, and maintainable application architecture.** Here's why:

1. **Centralized Service Logic (`BookService`)**:
   The `BookService` encapsulates API functions for interacting with book-related data, such as fetching, querying, or updating books. 
   
   - By centralizing these operations in one service, you ensure consistency and reusability across the application.

2. **Shared Context (`BookServiceContext`)**:
   The `BookServiceContext` acts as a bridge between the service and components, allowing the service to be accessed without directly coupling components to its implementation. 
   
   - This abstraction improves testability and flexibility, especially when scaling the application or replacing service logic.

3. **Convenient Access (`useBookService` Hook)**:
   The `useBookService` hook simplifies access to the service within React components, making it easy for developers to interact with the API without worrying about context management. 
   
   - It enhances developer productivity by providing a clean and intuitive interface.

4. **Global Availability (`BookServiceProvider`)**:
   The `BookServiceProvider` wraps the application, ensuring that all components have access to the `BookServiceContext`. 
   
   - This eliminates the need for prop drilling or redundant service instantiations, fostering a consistent and efficient way to manage API calls across the app.

#### 1. `BookService` Literal Object

This is the <mark>basic service implementation</mark>.

- **Purpose:** Encapsulates API calls related to books.

- **Structure:** It's a JavaScript object with methods like `getAllBooks`, `createBook`, `updateBook`, and `deleteBook`. Each method uses `axios` to make HTTP requests to a defined API endpoint (`API_BASE_URL`).

- **Usage:** You could import this object directly into components and call its methods.

#### 2. `BookService` with Context

This is an enhanced version that uses <mark>React's Context API</mark>.

- **Purpose:** Provides centralized access to the `BookService` and makes it easily available to components throughout your application.

- **Structure:**
  
  - It defines the same `BookService` object as before.
  
  - It creates a `BookServiceContext` using `React.createContext()`, initializing it with the `BookService` object.
  
  - It provides a <mark>custom hook</mark> `useBookService` that consumes the context using `useContext()`. This is the preferred way for components to access the service.
  
  - It defines a `BookServiceProvider` component. This component <mark>wraps</mark> a part of your application and provides the `BookService` to all its children.

- **Usage:**
  
  1. Wrap your root component (or a significant portion) with `<BookServiceProvider>`.
  
  2. In any child component that needs the service, use `const bookService = useBookService();`. You can then call methods on `bookService` (e.g., `bookService.getAllBooks()`).

#### 3. `App.jsx` (Provider)

This component demonstrates how to use the `BookServiceProvider`.

- **Purpose:** To make the `BookService` available to the entire application.

- **Structure:** It wraps the `BookList` component (and anything else within the `div`) with `<BookServiceProvider>`. This makes the `BookService` available to `BookList` and any of its child components.

#### 4. `BookList.jsx` (Consumer)

This component demonstrates how to use the `useBookService` hook.

- **Purpose:** To display a list of books fetched using the `BookService`.

- **Structure:**
  
  - It calls `const bookService = useBookService();` to get access to the `BookService`.
  
  - It uses `useEffect` to fetch books when the component mounts. It calls `bookService.getAllBooks()` to retrieve the data.
  
  - It stores the books in the component's state using `useState`.
  
  - It renders a list of books, displaying their titles and authors.

## Code `book`

### `BookService`  literal object with all functions

```java
import axios from "axios";

// Base URL for the mock API
const API_BASE_URL = "https://locahost:8080/api/v1";

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

  createBook: async (book) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  updateBook: async (book) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/books/${book.id}`, book);
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
};

export default BookService;
```

### `BookService` with Context

```java
import React, { createContext, useContext } from "react";
import axios from "axios";

// Base URL for the mock API
const API_BASE_URL = "https://645.mockapi.io/v1";

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

  createBook: async (book) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  updateBook: async (book) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/books/${book.id}`, book);
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },

  deleteBook: async (bookId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },
};

// Create a Context for the BookService
const BookServiceContext = createContext(BookService); // Provide the service as the default value

// Custom hook to use the BookService
export const useBookService = () => {
  return useContext(BookServiceContext);
};

// BookServiceProvider component
export const BookServiceProvider = ({ children }) => {
  return (
    <BookServiceContext.Provider value={BookService}>
      {children}
    </BookServiceContext.Provider>
  );
};

export default BookService;
```

### Inject `BookServiceProvider`

```jsx
import { BookServiceProvider } from "./BookService";
import BookList from "./BookList";

function App() {
  return (
    <BookServiceProvider>
      <div className="App">
        <h1>My Book App</h1>
        <BookList />
      </div>
    </BookServiceProvider>
  );
}
```

### Use the Custom Hook in a Component

```jsx
import React, { useEffect, useState } from "react";
import { useBookService } from "./BookService";

function BookList() {
  const bookService = useBookService();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }

    fetchBooks();
  }, [bookService]);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
```

Summary

- **When to Use Import/Export:** For small projects or when simplicity is key, importing/exporting your API service is often sufficient.

- **When to Use Context:** For larger applications where centralized access, dynamic configuration, or flexibility in swapping implementations is needed, React Context is often the best choice.

- **Best Practices:** Use custom hooks (`useApiService`) for consuming context values and wrap your app with a provider (`ApiServiceProvider`) at a high level in your component tree.

This approach ensures scalability and flexibility while maintaining clean and reusable code for managing API interactions.
