import { client } from './client';

export interface Subject {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  semesterId: number;
  courseId: number;
}

export const subjects = {
  async getSubjects(my = false) {
    const { data } = await client.get<Subject[]>('/courses/subjects', {
      params: { my },
    });
    return data;
  },
  async createSubject({
    name,
    semesterId,
    courseId,
    teacherId,
    code,
  }: {
    name: string;
    semesterId: number;
    courseId: number;
    teacherId: number;
    code: string;
  }) {
    const { data } = await client.post<Subject>('/courses/subjects', {
      name,
      semesterId,
      courseId,
      teacherId,
      code,
    });
    return data;
  },
  async editSubject(
    id: number,
    {
      name,
      semesterId,
      courseId,
      teacherId,
      code,
    }: {
      name: string;
      semesterId: number;
      courseId: number;
      teacherId: number;
      code: string;
    }
  ) {
    const { data } = await client.patch<Subject>(`/courses/subjects/${id}`, {
      name,
      semesterId,
      courseId,
      teacherId,
      code,
    });
    return data;
  },
  async deleteSubject(id: number) {
    const { data } = await client.delete<Subject>(`/courses/subjects/${id}`);
    return data;
  },
};
