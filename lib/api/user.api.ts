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

interface Stat {
  id: number;
  name: string;
  count: number;
}

export interface IStats {
  courses: number;
  subjects: number;
  teachers: number;
  students: number;
  admins: number;
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  totalSubjects: number;
  studentsPerCourse: Stat[];
  attendance: Stat[];
}
export const users = {
  async getStatistics() {
    const { data } = await client.get<IStats>('/statistics');

    return data;
  },
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
  async notifyAll(title: string, message: string, role: RoleType) {
    const { data } = await client.post('/users/notify', {
      title,
      message,
      sentToId: -1,
      role,
    });

    return data;
  },
  async notify(id: number, title: string, message: string, role: RoleType) {
    const { data } = await client.post('/users/notify', {
      title,
      message,
      sentToId: id,
      role,
    });

    return data;
  },
};
