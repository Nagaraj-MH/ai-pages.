import Book from "./Book";

interface User {
  name: string;
  username: string;
  email: string;
  likedBooks: Book[];
  commentsMade: number;
  profileImage: boolean;
}
export default User;
