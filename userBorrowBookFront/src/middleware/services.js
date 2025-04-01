import bookService from "./bookService";
import userService from "./userService";
import borrowService from "./borrowService";

const Services = {
  book: bookService,
  user: userService,
  borrow: borrowService,
};

export default Services;
