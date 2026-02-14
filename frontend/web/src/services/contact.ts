import api from '../settings/api';

export interface ContactPayload {
  fullName: string;
  email: string;
  message: string;
}

export const sendContactMessage = (data: ContactPayload) => {
  return api.post('/user/contact', data);
};
