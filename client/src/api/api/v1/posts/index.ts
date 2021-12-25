import { Movie, NewPostResponse, PostsResponse, Sound, TImage } from '../../../../types';

export type Methods = {
  get: {
    query?: {
      page?: number;
      limit?: number;
    };

    resBody: PostsResponse;
  };

  post: {
    reqBody: {
      images: TImage[];
      movie?: Movie;
      sound?: Sound;
      text: string;
    };

    resBody: NewPostResponse;
  };
};
