"use client";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from "@edge-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const notificationSchema = z.object({
  Notification: z.string().min(2, {
    message: "Notification must be at least 2 characters.",
  }),
});

const NotifyStudentPage = () => {
  const demoData = [
    {
      id: "1",
      FullName: "DemoName",
      Email: "$250.00",
      Course: "Credit Card",
    },
    {
      id: "2",
      FullName: "DemoName",
      Email: "$150.00",
      Course: "PayPal",
    },
    {
      id: "3",
      FullName: "UnDemoName",
      Email: "$350.00",
      Course: "Bank Transfer",
    },
    {
      id: "4",
      FullName: "DemoName",
      Email: "$450.00",
      Course: "Credit Card",
    },
    {
      id: "5",
      FullName: "DemoName",
      Email: "$550.00",
      Course: "PayPal",
    },
    {
      id: "6",
      FullName: "DemoName",
      Email: "$200.00",
      Course: "Bank Transfer",
    },
    {
      id: "7",
      FullName: "UnDemoName",
      Email: "$300.00",
      Course: "Credit Card",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center w-4/5 p-8">
      <div>
        <h1 className="font-medium text-xl pb-5">
          Send Notification to Students
        </h1>
      </div>

      <div className="flex space-x-2">
        <div className="flex mb-8 items-center  space-x-2">
          <Label className="">Course</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='CSIT'>CSIT</SelectItem>
              <SelectItem value='BCA'>BCA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex mb-8 items-center  space-x-2">
          <Label className="">Semester</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(1)}>1st Semester</SelectItem>
              <SelectItem value={String(2)}>2nd Semester</SelectItem>
              <SelectItem value={String(3)}>3rd Semester</SelectItem>
              <SelectItem value={String(4)}>4th Semester</SelectItem>
              <SelectItem value={String(5)}>5th Semester</SelectItem>
              <SelectItem value={String(6)}>6th Semester</SelectItem>
              <SelectItem value={String(7)}>7th Semester</SelectItem>
              <SelectItem value={String(8)}>8th Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="border rounded-2xl">
        <TableCaption className="mt-5">
          A list of the students presented in Swastik College
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-extrabold">ID</TableHead>
            <TableHead className="font-extrabold">Full Name</TableHead>
            <TableHead className="font-extrabold">Email</TableHead>
            <TableHead className="font-extrabold">Course</TableHead>
            <TableHead className=" text-right font-extrabold pr-16">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.FullName}</TableCell>
              <TableCell>{data.Email}</TableCell>
              <TableCell>{data.Course}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Send Notification</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Send Notification</AlertDialogTitle>
                      <AlertDialogDescription>
                        <Textarea placeholder="Send Message"></Textarea>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NotifyStudentPage;
