import api from '../settings/api';

export interface SignUpPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUp = (data: SignUpPayload) => {
  return api.post('/user/sign-up', data);
};
