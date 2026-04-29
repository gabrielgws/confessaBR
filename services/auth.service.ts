import { api } from '@/services/api';
import type { AuthSession, LoginRequest, RegisterRequest } from '@/types/auth';
import type { User } from '@/types/user';

export async function register(payload: RegisterRequest): Promise<AuthSession> {
  const response = await api.post<AuthSession>('/auth/register', payload);

  return response.data;
}

export async function login(payload: LoginRequest): Promise<AuthSession> {
  const response = await api.post<AuthSession>('/auth/login', payload);

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>('/me');

  return response.data;
}
