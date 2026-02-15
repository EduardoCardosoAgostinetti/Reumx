import api from '../settings/api'

/* ========= PAYLOADS ========= */

export interface UpdateFullNamePayload {
  userId: string
  fullName: string
}

export interface UpdateEmailPayload {
  userId: string
  newEmail: string
}

export interface UpdatePasswordPayload {
  userId: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

/* ========= REQUESTS ========= */

export const updateFullName = (data: UpdateFullNamePayload) => {
  return api.post('/user/update-fullname', data)
}

export const updateEmail = (data: UpdateEmailPayload) => {
  return api.post('/user/update-email', data)
}

export const updatePassword = (data: UpdatePasswordPayload) => {
  return api.post('/user/update-password', data)
}