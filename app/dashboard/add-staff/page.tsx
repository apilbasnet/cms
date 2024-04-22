"use client";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@edge-ui/react";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useToast } from "@edge-ui/react";
import { useState } from "react";
import { AxiosError } from "axios";
import { Staff, staffs } from "@/lib/api/staff.api";
import { Spinner } from "@/components/icons/icons";
import { useGetCourses } from "@/lib/customHooks/getCourses";
import { Course } from "@/lib/api/course.api";

const SWASTIK_TLD = "@swastikcollege.edu.np";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email().endsWith(SWASTIK_TLD, {
    message: "Email must use Swastik College's domain name.",
  }),
  phone: z.number().min(10).max(10),
  address: z.string(),
  password: z.string().min(8).max(32),
  course: z.number(),
});

const AddStaffPage = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<Staff[]>([]);
  const [courseId, setCourseId] = useState(0);

  const { courseData, loading: coursesLoading } = useGetCourses();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const addTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await staffs.createTeacher({
        name: `${name}`,
        email: `${email}`,
        contact: `${phone}`,
        address: `${address}`,
        password: `${password}`,
        courseId: Number(courseId),
      });
      setTeacherData([data]);
      console.log(teacherData);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to add teacher",
      });
    } finally {
      setLoading(false);
    }
  }, [toast, name, email, phone, address, password, courseId, teacherData]);

  const onSubmit = () => {
    addTeachers();
  };

  return (
    <div className="flex items-center justify-start flex-col gap-4 w-full py-8 ">
      <h1 className="font-medium text-xl">Add Staff</h1>
      <Form {...form}>
        <form
          className="w-1/2 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                    onChange={(e) => {
                      setPhone(String(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
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

          {/* <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="subject">Subjects</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <div className="flex space-x-2">
                      {subjectData.map((subject) => (
                        <div
                          key={subject.id}
                          className="flex  items-center space-x-2"
                        >
                          <Checkbox id={subject.name} />
                          <label
                            htmlFor={subject.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subject.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          /> */}

          <Button
            disabled={loading}
            onClick={addTeachers}
            type="submit"
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

export default AddStaffPage;
