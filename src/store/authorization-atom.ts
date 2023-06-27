import { AUTH_TOKEN_KEY } from '@/lib/constants';
import { atom, useAtom } from 'jotai';
import Cookies from 'js-cookie';

export function checkIsLoggedIn() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoggedIn());

export function useAuth() {
  const [isAuthorize, setAuthorized] = useAtom(authorizationAtom);

  return { isAuthorize, setAuthorized };
};
