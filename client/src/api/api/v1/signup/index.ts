import { SignUpReqBody, UserResponse } from './../../../../types/index';

export type Methods = {
  post: {
    reqBody: SignUpReqBody;

    resBody: UserResponse;
  };
};
