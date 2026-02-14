import api from '../settings/api';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  success: boolean
  code: string
  message: string
  data: {
    id: string
    fullName: string
    email: string
    birthdate: string
    token: string
  }
}


export const signIn = (data: SignInPayload) => {
  return api.post<SignInResponse>('/user/sign-in', data);
};
