"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from "@edge-ui/react";
import AlertPopup from "@/components/AlertDialog";
import { Student, students } from "@/lib/api/student.api";
import { AxiosError } from "axios";

const ManageStudentPage = () => {
  const demoData = [
    {
      id: "INV001",
      FullName: "DemoName",
      Email: "$250.00",
      Course: "Credit Card",
      Faculty: "BCA",
    },
    {
      id: "INV002",
      FullName: "DemoName",
      Email: "$150.00",
      Course: "PayPal",
      Faculty: "BCA",
    },
    {
      id: "INV003",
      FullName: "UnDemoName",
      Email: "$350.00",
      Course: "Bank Transfer",
      Faculty: "BCA",
    },
    {
      id: "INV004",
      FullName: "DemoName",
      Email: "$450.00",
      Course: "Credit Card",
      Faculty: "BCA",
    },
    {
      id: "INV005",
      FullName: "DemoName",
      Email: "$550.00",
      Course: "PayPal",
      Faculty: "BCA",
    },
    {
      id: "INV006",
      FullName: "DemoName",
      Email: "$200.00",
      Course: "Bank Transfer",
      Faculty: "BCA",
    },
    {
      id: "INV007",
      FullName: "UnDemoName",
      Email: "$300.00",
      Course: "Credit Card",
      Faculty: "BCA",
    },
  ];
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<Student[]>([]);

  const getStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await students.getStudent();
      setStudentData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch Students data",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteStudent = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await students.deleteStudent(id);
        toast({
          title: "Success",
          description: "Student deleted successfully",
        });
        getStudents();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to delete student",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, getStudents]
  );

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-4/5 p-8">
      <div>
        <h1 className="font-medium text-xl pb-5">Manage Student</h1>
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
            <TableHead className="font-extrabold">Semester Id</TableHead>
            <TableHead className=" text-right font-extrabold pr-16">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.courseId}</TableCell>
              <TableCell>{data.activeSemester}</TableCell>
              <TableCell className="text-right">
                <Button variant={"outline"} className="w-20 mr-2">
                  Edit
                </Button>
                <AlertPopup onCanceled={() => {}} onConfirmed={() => {}}>
                  <Button
                    variant="destructive"
                    onClick={() => deleteStudent(data.id)}
                  >
                    Delete
                  </Button>
                </AlertPopup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageStudentPage;
