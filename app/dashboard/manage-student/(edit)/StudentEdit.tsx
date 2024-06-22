import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@edge-ui/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "@/components/icons/icons";
import { Course, courses } from "@/lib/api/course.api";
import { Student, students } from "@/lib/api/student.api";
import { AxiosError } from "axios";
import { useToast } from "@edge-ui/react";
import { useGetCourses } from "@/lib/customHooks/getCourses";
import { isElement } from "react-dom/test-utils";

type StudentEditProps = {
  student: {
    id: number;
    name: string;
    email: string;
    contact: string;
    address: string;
    course: { id: number; name: string };
    activeSemester: { id: number; name: string };
    password: string;
  };
  onDone: () => void;
};

export const StudentEdit = ({ student, onDone }: StudentEditProps) => {
  // console.log(student);
  const { toast } = useToast();
  const [name, setName] = useState(`${student.name}`);
  const [email, setEmail] = useState(`${student.email}`);
  const [phone, setPhone] = useState(`${student.contact}`);
  const [address, setAddress] = useState(`${student.address}`);
  const [password, setPassword] = useState(`${student.password}`);
  const [loading, setLoading] = useState(false);
  const [activeSemester, setActiveSemester] = useState(
    student.activeSemester.id
  );
  const [courseId, setCourseId] = useState(student.course.id);
  // const [courseData, setCourseData] = useState<Course[]>([]);
  const { courseData, loading: CoursesLoading } = useGetCourses();

  const SWASTIK_TLD = "@swastikcollege.edu.np";

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email().endsWith(SWASTIK_TLD, {
      message: "Email must use Swastik College's domain name.",
    }),
    phone: z.string().length(10),
    address: z.string(),
    password: z.string().min(8).max(32),
    semester: z.number(),
    course: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const editSudents = useCallback(
    async (
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
    ) => {
      setLoading(true);
      try {
        await students.editStudent(id, {
          name,
          email,
          contact,
          address,
          courseId,
          activeSemester,
          password,
        });
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
        onDone();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to update student",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, onDone]
  );

  const requestEdit = () => {
    console.log(
      name,
      email,
      phone,
      address,
      password,
      courseId,
      activeSemester
    );

    editSudents(student.id, {
      name,
      email,
      contact: phone,
      address,
      courseId,
      activeSemester,
      password,
    });
  };

  return (
    <div className="fixed inset-[-100px] bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 w-2/5 max-w-4xl">
        <div className="flex flex-col items-center justify-center ">
          <div>Edit Student</div>
          <div className="w-5/6">
            <Form {...form}>
              <form className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          {...field}
                          onChange={(event) => setName(event.target.value)}
                          defaultValue={student.name}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          {...field}
                          onChange={(event) => setEmail(event.target.value)}
                          defaultValue={student.email}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          {...field}
                          onChange={(event) => setPhone(event.target.value)}
                          defaultValue={student.contact}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Input
                          id="address"
                          type="text"
                          {...field}
                          onChange={(event) => setAddress(event.target.value)}
                          defaultValue={student.address}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          onChange={(event) => setPassword(event.target.value)}
                          defaultValue={student.password}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="semester">Semester</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(e) => setActiveSemester(Number(e))}
                          defaultValue={String(student.activeSemester.id)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 8 }).map((_, i) => (
                              <SelectItem key={i} value={String(i + 1)}>
                                {i + 1} Semester
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="course">Course</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(e) => setCourseId(Number(e))}
                          defaultValue={String(student.course.id)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Course name" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseData.map((course) => (
                              <SelectItem
                                key={course.id}
                                value={String(course.id)}
                              >
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="mt-4 space-x-2">
            <Button
              onClick={() => {
                onDone();
              }}
            >
              Cancel
            </Button>
            <Button disabled={loading} onClick={requestEdit}>
              {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
