import { client } from "./client";

export interface Student {
  id?: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  courseId: number;
  activeSemester: number;
  password: string;
}

export const students = {
  async createStudent({
    email,
    name,
    contact,
    address,
    password,
    courseId,
    activeSemester,
  }: Omit<Student, "id">) {
    const { data } = await client.post<Student>("/users/student", {
      email,
      name,
      address,
      contact,
      password,
      courseId,
      activeSemester,
    });

    return data;
  },
  async getStudent() {
    const { data } = await client.get<
      {
        id: number;
        name: string;
        email: string;
        contact: string;
        address: string;
        course: { id: number; name: string };
        activeSemester: { id: number; name: string };
        password: string;
      }[]
    >("/users/student");

    return data;
  },

  async editStudent(
    id: number,
    {
      name,
      email,
      contact,
      address,
      courseId,
      activeSemester,
      password,
    }: Student
  ) {
    const { data } = await client.patch<Student>(`/users/student/${id}`, {
      name,
      email,
      contact,
      address,
      courseId,
      activeSemester,
      password,
    });

    return data;
  },

  async deleteStudent(id: number) {
    const { data } = await client.delete<Student>(`/users/student/${id}`);
    return data;
  },
};
