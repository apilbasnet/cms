"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from "@edge-ui/react";
import AlertPopup from "@/components/AlertDialog";
import { Student, students } from "@/lib/api/student.api";
import { StudentEdit } from "./(edit)/StudentEdit";
import { AxiosError } from "axios";

const ManageStudentPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState<
    {
      id: number;
      name: string;
      email: string;
      contact: string;
      address: string;
      course: { id: number; name: string };
      activeSemester: { id: number; name: string };
      password: string;
    }[]
  >([]);

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
            <TableHead className="font-extrabold">Semester</TableHead>
            <TableHead className="text-right font-extrabold pr-16">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.course?.name}</TableCell>
              <TableCell>{data.activeSemester?.name}</TableCell>

              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="mr-2 w-20">
                      Edit
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <StudentEdit
                      student={data}
                      onDone={() => {
                        setIsEditing(false);
                      }}
                    />
                  </AlertDialogContent>
                </AlertDialog>

                <AlertPopup
                  onCanceled={() => {}}
                  onConfirmed={() => {
                    deleteStudent(data.id);
                  }}
                >
                  <Button
                    variant="destructive"
                    // onClick={() => deleteStudent(data.id)}
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
