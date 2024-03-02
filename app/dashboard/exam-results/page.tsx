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

const ViewExamResultPage = () => {
  const demoData = [
    {
      id: "1",
      FullName: "DemoName",
      Email: "$250.00",
      Course: "BCA",
      Subject: "SUbject",
      
    },
    {
      id: "2",
      FullName: "DemoName",
      Email: "$150.00",
      Course: "BCA",
      Subject: "SUbject",
    },
    {
      id: "3",
      FullName: "UnDemoName",
      Email: "$350.00",
      Course: "BCA", 
      Subject: "SUbject",
    },
    {
      id: "4",
      FullName: "DemoName",
      Email: "$450.00",
      Course: "BCA", 
      Subject: "SUbject",
    },
    {
      id: "5",
      FullName: "DemoName",
      Email: "$550.00",
      Course: "BCA",
      Subject: "SUbject",
    },
    {
      id: "6",
      FullName: "DemoName",
      Email: "$200.00",
      Course: "BCA",
      Subject: "SUbject",
    },
    {
      id: "7",
      FullName: "UnDemoName",
      Email: "$300.00",
      Course: "BCA",
      Subject: "SUbject",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center w-4/5 p-8">
      <div>
        <h1 className="font-medium text-xl pb-5">Exam Results</h1>
      </div>

      <div className="flex space-x-2">
        <div className="flex mb-8 items-center  space-x-2">
          <Label className="">Course</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CSIT">CSIT</SelectItem>
              <SelectItem value="BCA">BCA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex mb-8 items-center  space-x-2">
          <Label>Semester</Label>
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

        <div className="flex mb-8 items-center  space-x-2">
          <Label className="">Subject</Label>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(1)}>1</SelectItem>
              <SelectItem value={String(2)}>2</SelectItem>
              <SelectItem value={String(3)}>3</SelectItem>
              <SelectItem value={String(4)}>4</SelectItem>
              <SelectItem value={String(5)}>5</SelectItem>
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
            <TableHead className="font-extrabold">Subject</TableHead>
            <TableHead className="font-extrabold">Course</TableHead>
            <TableHead className=" text-right font-extrabold pr-8">
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
              <TableCell>{data.Subject}</TableCell>
              <TableCell>{data.Course}</TableCell>
              <TableCell className="text-right">
                <Button variant={"outline"} className="w-20 mr-2" disabled>
                  Passed
                </Button>
                {/* <Button disabled>Failed</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewExamResultPage;
