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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edge-ui/react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabase from "@/lib/client";

const SWASTIK_TLD = "@swastikcollege.edu.np";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  course: z.string().length(4),
  faculty: z.string(),
  staff: z.string(),
});

const SubjectPage = () => {
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
            name="course"
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
                <FormLabel htmlFor="faculty">Faculty</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Faculty name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="CSIT">CSIT</SelectItem>
                    </SelectContent>
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
