import { client } from "./client";

export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const staffs = {
  async createTeacher({ name, email, phone, address }: Staff) {
    const { data } = await client.post<Staff>("/users/teacher", {
      name,
      email,
      phone,
      address,
    });

    return data;
  },
  async getTeacher() {
    const { data } = await client.get<Staff[]>("/users/teacher");

    return data;
  },
  async editTeacher(id: number, { name, email, phone, address }: Staff) {
    const { data } = await client.patch<Staff>(`/users/teacher/${id}`, {
      name,
      email,
      phone,
      address,
    });

    return data;
  },
  async deleteTeacher(id: number) {
    const { data } = await client.delete<Staff>(`/users/teacher/${id}`);
    return data;
  },
};
