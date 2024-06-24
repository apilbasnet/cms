import { count } from "console";
import { client } from "./client";

export interface Staff {
  id?: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  password?: string;
  courseId: number;
  subjects?: any[];
}

export const staffs = {
  async createTeacher(body: Staff) {
    const { data } = await client.post<Staff>("/users/teacher", body);

    return data;
  },
  async getTeacher() {
    const { data } = await client.get<
      {
        id: number;
        name: string;
        email: string;
        contact: string;
        address: string;
        password: string;
        course: {
          id: number;
          name: string;
        };
      }[]
    >("/users/teacher");

    return data;
  },
  async editTeacher(id: number, payload: Staff) {
    const { data } = await client.patch<Staff>(`/users/teacher/${id}`, payload);

    return data;
  },
  async deleteTeacher(id: number) {
    const { data } = await client.delete<Staff>(`/users/teacher/${id}`);
    return data;
  },
};
