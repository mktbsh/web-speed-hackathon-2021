import { SignInReqBody, UserResponse } from './../../../../types/index';

export type Methods = {
  post: {
    reqBody: SignInReqBody;

    resBody: UserResponse;
  };
};
