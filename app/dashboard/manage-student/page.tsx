import React from "react";
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
} from "@edge-ui/react";

const ManageStudentPage = () => {
  const demoData = [
    {
      id: "INV001",
      FullName: "DemoName",
      Email: "$250.00",
      Course: "Credit Card",
    },
    {
      id: "INV002",
      FullName: "DemoName",
      Email: "$150.00",
      Course: "PayPal",
    },
    {
      id: "INV003",
      FullName: "UnDemoName",
      Email: "$350.00",
      Course: "Bank Transfer",
    },
    {
      id: "INV004",
      FullName: "DemoName",
      Email: "$450.00",
      Course: "Credit Card",
    },
    {
      id: "INV005",
      FullName: "DemoName",
      Email: "$550.00",
      Course: "PayPal",
    },
    {
      id: "INV006",
      FullName: "DemoName",
      Email: "$200.00",
      Course: "Bank Transfer",
    },
    {
      id: "INV007",
      FullName: "UnDemoName",
      Email: "$300.00",
      Course: "Credit Card",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-center w-4/5 py-8 px-8">
      <div>
        <h1 className="font-medium text-xl pb-5">Manage Student</h1>
      </div>
      <Table className="border rounded-2xl">
        <TableCaption className="mt-5">A list of the students presented in Swastik College</TableCaption>
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
                <Button variant={"outline"} className="w-20 mr-2">
                  Edit
                </Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageStudentPage;
