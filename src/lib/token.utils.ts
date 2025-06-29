import {atom} from "jotai";
import Cookies from 'js-cookie';

const ConfigValue = {
  AUTH_TOKEN_KEY: 'auth_token',
  EMAIL_VERIFIED: 'email_verified',
}

//TODO: must be used later
// import {ConfigValue} from '@/config';

export const AUTH_TOKEN_KEY = ConfigValue.AUTH_TOKEN_KEY;
export const EMAIL_VERIFIED = ConfigValue.EMAIL_VERIFIED;

export function setAuthToken(token: string) {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 });
}

export function removeAuthToken() {
  Cookies.remove(AUTH_TOKEN_KEY);
}
export function checkHasAuthToken() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkHasAuthToken());
export function useToken() {
  return {
    setToken(token: string) {
      Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 });
    },
    getToken() {
      return Cookies.get(AUTH_TOKEN_KEY);
    },
    removeToken() {
      Cookies.remove(AUTH_TOKEN_KEY);
    },
    hasToken() {
      const token = Cookies.get(AUTH_TOKEN_KEY);
      if (!token) return false;
      return true;
    },
    setEmailVerified(emailVerified: boolean | null) {
      Cookies.set(EMAIL_VERIFIED, JSON.stringify({ emailVerified }));
    },
    getEmailVerified() {
      const emailVerified = Cookies.get(EMAIL_VERIFIED);
      return emailVerified ? JSON.parse(emailVerified) : true;
    },
  };
}
export const getAuthToken = () => {

  return Cookies.get(AUTH_TOKEN_KEY);
};
