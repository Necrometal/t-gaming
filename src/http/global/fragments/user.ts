import { ProfileDataSimple } from './profile';

export const UserDataSimple = {
  id: true,
  email: true,
};

export const UserDataWithProfileSimple = {
  ...UserDataSimple,
  profile: ProfileDataSimple,
};
