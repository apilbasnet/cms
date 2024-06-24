"use client";

import { columns } from "./components/columns";
import { DataTable } from "@/components/Table/components/DataTable";
import { useGetStaffs } from "@/lib/customHooks/getStaffs";
import { Loading } from "@/components/loading";
import { useCallback, useState } from "react";
import { staffs } from "@/lib/api/staff.api";
import { AxiosError } from "axios";
import { StaffEdit } from "./(edit)/StaffEdit";
import { useToast } from "@edge-ui/react";

type Staff = {
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

export default function StaffListPage() {
  const { toast } = useToast();
  const { staffData, loading: fetching, refetch } = useGetStaffs();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Staff | null>(null);

  const isLoading = fetching || loading;

  const onDelete = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await staffs.deleteTeacher(id);
        toast({
          title: "Success",
          description: "Staff deleted successfully",
        });
        await refetch();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to delete Staff",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, refetch]
  );

  const onEdit = useCallback(async (data: Staff) => {
    setData(data);
    setIsEditing(!isEditing);
  }, []);

  console.log(staffData);

  const columnsWithActions = columns({ onEdit, onDelete });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Manage Staffs</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of staffs!
            </p>
          </div>
        </div>
        <DataTable data={staffData} columns={columnsWithActions} />

        {isEditing && data && (
          <StaffEdit
            staff={data}
            onDone={() => {
              setIsEditing(false);
              refetch();
            }}
          />
        )}
      </div>
    </>
  );
}
