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
  Checkbox,
} from "@edge-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Course, courses } from "@/lib/api/course.api";
import { AxiosError } from "axios";
import { useToast } from "@edge-ui/react";

const SWASTIK_TLD = "@swastikcollege.edu.np";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  staff: z.string(),
  faculty: z.boolean(),
});

const SubjectPage = () => {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // const result = await supabase.auth.admin.createUser({
    //   user_metadata: values,
    //   email_confirm: false,
    //   role: "student",
    // });
    // console.log(result);
  };

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

  return (
    <div className="flex items-center justify-start flex-col gap-4 w-full py-8 ">
      <h1 className="font-medium text-xl">Add Subject</h1>
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
                  <Input id="name" type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="staff"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="course">Staffs</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="...">.......</SelectItem>
                      <SelectItem value="...">.......</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="course">Courses</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    {courseData.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center space-x-2 mb-4  "
                      >
                        <Checkbox id={course.name} />
                        <label
                          htmlFor={course.name}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {course.name}
                        </label>
                      </div>
                    ))}
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default SubjectPage;
