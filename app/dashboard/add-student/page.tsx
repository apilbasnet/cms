"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@edge-ui/react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "@/lib/api/client";
import { Course, courses } from "@/lib/api/course.api";
import { AxiosError } from "axios";
import { Student, students } from "@/lib/api/student.api";
import { get } from "http";
import { Spinner } from "@/components/icons/icons";
import { useRouter } from "next/navigation";

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

const AddStudentPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSemester, setActiveSemester] = useState(0);
  const [courseId, setCourseId] = useState(0);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   // const result = await supabase.auth.admin.createUser({
  //   //   user_metadata: values,
  //   //   email: values.email,
  //   //   email_confirm: false,
  //   //   password: values.password,
  //   //   role: 'student',
  //   // });
  //   // console.log(result);
  // };

  const createStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await students.createStudent({
        name,
        email,
        contact: phone,
        address: address,
        password: password,
        courseId: Number(courseId),
        activeSemester: Number(activeSemester),
      });
      setStudentData([data]);
      console.log(studentData);
      toast({
        title: "Success",
        description: "Student created successfully",
      });
      router.push("/dashboard/manage-student");
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch courses",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, name, email, phone, address, password, courseId, activeSemester]);

  const getCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courses.getCourses();
      setCourseData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch courses",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getCourses();
  }, []);

  const onSubmit = () => {
    createStudents();
  };

  return (
    <div className="flex items-center justify-start flex-col gap-4 w-full py-8">
      <h1 className="font-medium text-xl">Add student</h1>
      <Form {...form}>
        <form className="w-1/2 space-y-4">
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
                    value={String(activeSemester)}
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
                    value={String(courseId)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Course name" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseData.map((course) => (
                        <SelectItem key={course.id} value={String(course.id)}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            onClick={createStudents}
            className="w-full"
          >
            {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddStudentPage;
