"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
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
  course: z.string().length(4),
  faculty: z.string(),
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

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const addTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await staffs.createTeacher({
        id: 0,
        name: `${name}`,
        email: `${email}`,
        phone: `${phone}`,
        address: `${address}`,
      });
      setTeacherData([data]);
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
  }, [toast, name, email, phone, address]);

  const onSubmit = () => {
    addTeachers();
  };

  console.log(teacherData);

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
                      setPhone(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={loading} onClick={addTeachers} className="w-full">
            {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddStaffPage;
