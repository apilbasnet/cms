import { client } from "./client";

export interface Course {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
}

export const courses = {
  async getCourses() {
    const { data } = await client.get<Course[]>("/courses");

    return data;
  },
  async createCourse({ name }: { name: string }) {
    const { data } = await client.post<Course>("/courses", {
      name,
    });

    return data;
  },
  async editCourse(id: number, { name }: { name: string }) {
    const { data } = await client.patch<Course>(`/courses/${id}`, {
      name,
    });

    return data;
  },
  async deleteCourse(id: number) {
    const { data } = await client.delete<Course>(`/courses/${id}`);
    return data;
  },
};
