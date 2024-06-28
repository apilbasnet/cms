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
} from '@edge-ui/react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { Spinner } from '@/components/icons/icons';

import { Staff, staffs } from '@/lib/api/staff.api';
import { AxiosError } from 'axios';
import { useToast } from '@edge-ui/react';
import { useGetCourses } from '@/lib/customHooks/getCourses';

type StaffEditProps = {
  staff: {
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
  };
  onDone: () => void;
};

export const StaffEdit = ({ staff, onDone }: StaffEditProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(`${staff.name}`);
  const [email, setEmail] = useState(`${staff.email}`);
  const [phone, setPhone] = useState(`${staff.contact}`);
  const [address, setAddress] = useState(`${staff.address}`);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(staff.course.id);
  const [password, setPassword] = useState(`${staff.password}`);

  const { courseData, loading: CoursesLoading } = useGetCourses();

  const SWASTIK_TLD = '@swastikcollege.edu.np';

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email().endsWith(SWASTIK_TLD, {
      message: "Email must use Swastik College's domain name.",
    }),
    phone: z.string().length(10),
    address: z.string(),
    semester: z.number(),
    course: z.number(),
    password: z.string().min(8).max(32),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  interface StaffForEdit {
    id?: number;
    name: string;
    email: string;
    contact: string;
    address: string;
    courseId: number;
    subjects: any[];
    password: string;
  }

  const editStaff = useCallback(
    async (
      id: number,
      { name, email, contact, address, courseId, password }: StaffForEdit
    ) => {
      setLoading(true);

      try {
        await staffs.editTeacher(id, {
          name,
          email,
          contact,
          address,
          courseId,
          subjects: [],
          password,
        });
        toast({
          title: 'Success',
          description: 'Staff updated successfully',
        });
        onDone();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: 'Error',
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            'Failed to update student',
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, onDone]
  );

  const requestEdit = () => {
    editStaff(staff.id, {
      name,
      email,
      contact: phone,
      address,
      courseId,
      subjects: [],
      password,
    });
  };

  return (
    <div className="fixed inset-[-100px] bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 w-2/5 max-w-4xl">
        <div className="flex flex-col items-center justify-center ">
          <div>Edit Staff</div>
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
                          defaultValue={staff.name}
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
                          defaultValue={staff.email}
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
                          defaultValue={staff.contact}
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
                          defaultValue={staff.address}
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
                          defaultValue={staff.password}
                        />
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
                          defaultValue={String(staff.course.id)}
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
