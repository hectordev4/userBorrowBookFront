# useNavigate & navigate

## Links & Intro

- [useNavigate | React Router API Reference](https://api.reactrouter.com/v7/functions/react_router.useNavigate.html)
- [useLocation | React Router API Reference](https://api.reactrouter.com/v7/functions/react_router.useLocation.html)

> `navigate` is a function provided by the `useNavigate` hook in React Router, which allows for programmatic navigation in React applications. 
> 
> It is a crucial feature for **controlling routing and user flow within single-page applications.**

## How it works

The `navigate` function works by updating the application's URL and triggering a re-render of the appropriate components based on the new route. When called, it changes the browser's history and updates the React Router's internal state, causing the application to display the content associated with the new URL.

### Relevance

`navigate` is highly relevant in React applications for several reasons:

1. Programmatic control: It allows developers to navigate users based on certain conditions or actions, such as after form submissions or authentication checks.
2. Dynamic routing: It enables the creation of dynamic, user-driven navigation experiences.
3. Flexibility: It can be used in various scenarios where declarative navigation (like using `<Link>` components) is not sufficient.

### Main features

1. Basic navigation: `navigate('/route')` moves the user to a new page
2. Relative navigation: Supports moving through nested routes (e.g., `navigate('../settings')`).
3. Replace history: `navigate('/dashboard', { replace: true })` replaces the current entry in the history stack, preventing users from returning to the previous page.
4. Passing state: `navigate('/profile', { state: { userId: 123 } })` allows passing data between routes without using URL parameters.
5. Back and forward navigation: `navigate(-1)` and `navigate(1)` enable moving through browser history.
6. Refresh current page: `navigate('.', { replace: true })` effectively reloads the current page.

## Navigation

The `updateBook` function and the use of `state` in the `UpdateBookForm` component demonstrate how React Router allows passing data between routes during navigation.

**State in React Router Navigation**

`State` in this context refers to <mark>additional data that can be passed along with the navigation action</mark>.

It's a way to **transfer** information from one route to another without using URL parameters or query strings.

### In the `updateBook` function

```jsx
navigate(`/books/update/${book.id}`, { state: { book } });
```

This line does two things:

1. It navigates to the `/books/update/${book.id}` route.

2. It passes the entire `book` object as state.

### In the `UpdateBookForm` component

```jsx
const location = useLocation(); const book = location.state?.book || {};
```

Here, the component retrieves the state passed during navigation:

1. `useLocation()` hook accesses the current location object.

2. `location.state?.book` attempts to access the `book` object from the state.

3. If no state was passed, it defaults to an empty object.

This approach allows transferring complex data between routes without exposing it in the URL, making it useful for passing larger objects or sensitive information during navigation.

#### Retrieving the state `book`

The line `const book = location.state?.book || {};` is a <mark>concise way of writing an if/else statement</mark> using the logical OR operator (`||`) and optional chaining (`?.`). 

> It's a form of short-circuit evaluation. 

Here's how it works:

1. First, it attempts to access `location.state?.book`:
   
   - The `?.` is the optional chaining operator. It checks if `location.state` exists before trying to access `book`.
   
   - If `location.state` is `null` or `undefined`, it short-circuits and returns `undefined` instead of throwing an error.

2. If `location.state?.book` exists and is not `null` or `undefined`, its value is assigned to `book`.

3. If `location.state?.book` is `undefined` (either because `location.state` doesn't exist or because it doesn't have a `book` property), the expression evaluates to the right side of the `||` operator, which is an empty object `{}`.

This line is equivalent to the following if/else statement:

```jsx
let book;
if (location.state && location.state.book !== undefined) {
    book = location.state.book;
} else {
    book = {};
}

```



### Citations:

1. [🧭 Mastering the `useNavigate` Hook in React Router: A Complete Guide 🚀 - DEV Community](https://dev.to/anticoder03/mastering-the-usenavigate-hook-in-react-router-a-complete-guide-1dj)
2. [React Router](https://www.w3schools.com/react/react_router.asp
3. https://www.dhiwise.com/post/react-navigation-with-react-router6
4. [A Comprehensive Look at React Router Navigation](https://www.dhiwise.com/post/a-comprehensive-guide-to-react-router-navigation-in-react-applications)
5. https://www.syncfusion.com/blogs/post/react-router-navigation-techniques
6. [Main Concepts v6.29.0 | React Router](https://reactrouter.com/6.29.0/start/concepts)
7. [Navigating | React Router](https://reactrouter.com/start/library/navigating)
8. [Navigate | React Router API Reference](https://reactrouter.com/en/main/components/navigate)
