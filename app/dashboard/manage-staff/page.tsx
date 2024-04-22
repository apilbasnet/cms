"use client";

import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edge-ui/react";
import AlertPopup from "@/components/AlertDialog";
import { useGetStaffs } from "@/lib/customHooks/getStaffs";
import { Loading } from "@/components/loading";

const ManageStaffPage = () => {
  const { staffData, loading } = useGetStaffs();

  if (loading) {
    return <Loading />;
  }

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
              <TableCell className="text-right">
                <Button variant={"outline"} className="w-20 mr-2">
                  Edit
                </Button>
                <AlertPopup onCanceled={() => {}} onConfirmed={() => {}}>
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
