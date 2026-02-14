import api from '../settings/api';

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = (data: ForgotPasswordPayload) => {
  return api.post('/user/forgot-password', data);
};
