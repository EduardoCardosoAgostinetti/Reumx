import api from '../settings/api';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
}

export const signIn = (data: SignInPayload) => {
  return api.post<SignInResponse>('/user/sign-in', data);
};
