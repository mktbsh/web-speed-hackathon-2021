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
};

export type ProfileImage = TImage;

export type Post = {
  createdAt: string;
  id: string;
  images: Array<TImage>;
  movie: Movie;
  sound: Sound;
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
