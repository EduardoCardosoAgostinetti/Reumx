import api from '../settings/api';

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const resetPassword = (data: ResetPasswordPayload) => {
  return api.post('/user/reset-password', data);
};
