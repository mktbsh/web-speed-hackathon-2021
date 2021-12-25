import { CommentsResponse } from '../../../../../../types';

export type Methods = {
  get: {
    query: {
      limit?: number;
      page: number;
    };

    resBody: CommentsResponse;
  };
};
