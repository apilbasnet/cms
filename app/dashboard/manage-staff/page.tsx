"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@edge-ui/react";
import AlertPopup from "@/components/AlertDialog";
import { useGetStaffs } from "@/lib/customHooks/getStaffs";
import { Loading } from "@/components/loading";
import { StaffEdit } from "./(edit)/StaffEdit";
import { useEffect, useState } from "react";
import { staffs } from "@/lib/api/staff.api";
import { AxiosError } from "axios";

const ManageStaffPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState<
    {
      id: number;
      name: string;
      email: string;
      contact: string;
      address: string;
      password: string;
      course: { id: number; name: string };
    }[]
  >([]);

  const getStaffs = async () => {
    try {
      setLoading(true);
      const data = await staffs.getTeacher();
      setStaffData(data as any);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch staffs",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffs();
  }, []);

  const deleteStaff = async (id: number) => {
    try {
      await staffs.deleteTeacher(id);
      getStaffs();
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to delete staff",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  console.log(staffData);

  return (
    <div className="flex flex-col justify-start items-center w-4/5 p-8">
      <div>
        <h1 className="font-medium text-xl pb-5">Manage Staffs</h1>
      </div>
      <Table className="border rounded-2xl">
        <TableCaption className="mt-5">
          A list of the staffs presented in Swastik College
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-extrabold">ID</TableHead>
            <TableHead className="font-extrabold">Full Name</TableHead>
            <TableHead className="font-extrabold">Email</TableHead>
            <TableHead className="font-extrabold">Contact</TableHead>
            <TableHead className="font-extrabold">Course</TableHead>
            <TableHead className=" text-right font-extrabold pr-16">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.contact}</TableCell>
              <TableCell>{data.course.name}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="mr-2 w-20">
                      Edit
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <StaffEdit
                      staff={data}
                      onDone={() => {
                        setIsEditing(false);
                      }}
                    />
                  </AlertDialogContent>
                </AlertDialog>

                <AlertPopup
                  onCanceled={() => {}}
                  onConfirmed={() => {
                    deleteStaff(data.id);
                  }}
                >
                  <Button variant="destructive">Delete</Button>
                </AlertPopup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageStaffPage;
