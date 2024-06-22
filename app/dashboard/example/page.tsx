"use client";

import { columns } from "@/components/Table/components/columns";
import { DataTable } from "@/components/Table/components/DataTable";
import { useGetStudents } from "@/lib/customHooks/getStudents";
import { Loading } from "@/components/loading";
import { useCallback, useState } from "react";
import { students } from "@/lib/api/student.api";
import { AlertDialog, AlertDialogContent, useToast } from "@edge-ui/react";
import { AxiosError } from "axios";
import { StudentEdit } from "../manage-student/(edit)/StudentEdit";
import { set } from "zod";

type Student = {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  course: { id: number; name: string };
  activeSemester: { id: number; name: string };
  password: string;
};

export default function TaskPage() {
  const { toast } = useToast();
  const { studentData, loading: fetching, refetch } = useGetStudents();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Student | null>(null);

  const isLoading = fetching || loading;

  const onDelete = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await students.deleteStudent(id);
        toast({
          title: "Success",
          description: "Student deleted successfully",
        });
        await refetch();
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
    [toast, refetch]
  );

  const onEdit = useCallback(async (data: Student) => {
    setData(data);
    setIsEditing(!isEditing);
  }, []);

  console.log(data, isEditing);

  const columnsWithActions = columns({ onEdit, onDelete });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Students
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of students!
            </p>
          </div>
        </div>
        <DataTable data={studentData} columns={columnsWithActions} />

        {isEditing && data && (
          <StudentEdit student={data} onDone={() => setIsEditing(false)} />
        )}
      </div>
    </>
  );
}
