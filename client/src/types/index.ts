export type User = {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  password: string;
  posts: Array<Post>;
  profileImage: ProfileImage;
  username: string;
};

export type TImage = {
  alt: string;
  id: string;
  width: number;
  height: number;
};

export type ProfileImage = TImage;

export type Post = {
  createdAt: string;
  id: string;
  images: Array<TImage> | null;
  movie: Movie | null;
  sound: Sound | null;
  text: string;
  user: User;
};

export type Sound = {
  artist: string;
  id: string;
  title: string;
};

export type Movie = {
  id: string;
};

export type Comment = {
  createdAt: string;
  id: string;
  post: Post;
  text: string;
  user: User;
};

export type TermsResponse = {
  rawHTML: string;
};

export type InfiniteResponse<T> = {
  items: T[];
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};

export type PostsResponse = InfiniteResponse<Post>;

export type SignInReqBody = {
  name: string;
  password: string;
  username: string;
};

export type SignUpReqBody = {
  name: string;
  password: string;
  username: string;
};

export type UserResponse = {
  createdAt?: string;
  description?: string;
  id?: string;
  name: string;
  password: string;
  posts?: Array<Post>;
  profileImage?: ProfileImage;
  username: string;
};
