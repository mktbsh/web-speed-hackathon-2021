import { useMatch } from 'react-location';
import { LocationGenerics } from '../../Router';
import { NotFoundPage } from '../NotFound';
import { User } from '../../types';
import { UserProfilePageItem } from '../../components/UserProfile/UserProfilePageItem';

const isUser = (arg: any): arg is User => {
  return arg && !!(arg as User).username;
};

export const UserProfilePage = () => {
  const {
    data: { user },
  } = useMatch<LocationGenerics>();

  if (isUser(user)) return <UserProfilePageItem user={user} />;
  return <NotFoundPage />;
};
