import { client } from './client';

export const RoleType = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

export interface User {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
  password: string;
  role: RoleType;
}

interface LoginResponse<T> {
  user: T;
  token: string;
}

export const users = {
  async login(email: string, password: string) {
    const { data } = await client.post<LoginResponse<User>>('/users/login', {
      email,
      password,
    });

    const token = data.token;
    if (token) localStorage.setItem('token', token);
    return data.user;
  },
  async me() {
    const { data } = await client.get<User>('/users/me');

    return data;
  },
};
