import Book from "./Book";

interface User {
  name: string;
  email: string;
  likedBooks: Book[];
  commentsMade: number;
}
export default User;
