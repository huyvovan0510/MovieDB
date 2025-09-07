import clientNetwork from './ClientNework';
import { Profile } from '@/types';

const API_ROUTES = {
  GET_PROFILE: (accountId: string) => `/account/${accountId}`,
};

export const getProfile = async (accountId: string): Promise<Profile> => {
  const response = await clientNetwork.get(API_ROUTES.GET_PROFILE(accountId));
  return response.data;
};
