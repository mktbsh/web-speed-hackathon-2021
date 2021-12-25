import { PostsResponse } from '../../../../../../types';

export type Methods = {
  get: {
    query?: {
      page?: number;
      limit?: number;
    };

    resBody: PostsResponse;
  };
};
