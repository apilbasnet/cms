import { Table, TableCaption, TableHeader, TableRow , TableHead, TableBody, TableCell, Button } from '@edge-ui/react';
import React from 'react'

const ManageSubjectPage = () => {
    const demoData = [
      {
        id: "1",
        Course: "Credit Card",
        Staff: "DemoName",
        Faculty: "BCA",
        Actions: "$250.00",
      },
      {
        id: "2",
        Course: "PayPal",
        Staff: "DemoName",
        Faculty: "BCA",
        Actions: "$150.00",
      },
      {
        id: "3",
        Course: "Bank Transfer",
        Staff: "UnDemoName",
        Faculty: "BCA",
        Actions: "$350.00",
      },
      {
        id: "4",
        Course: "Credit Card",
        Staff: "DemoName",
        Faculty: "BCA",
        Actions: "$450.00",
      },
      {
        id: "5",
        Course: "PayPal",
        Staff: "DemoName",
        Faculty: "BCA",
        Actions: "$550.00",
      },
    ];
  return (
    <div className="w-5/6 mt-10">
      <h1 className="font-medium text-xl text-center mb-6 ">Manage Subjects</h1>
      <div>
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the subjects presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Course</TableHead>
              <TableHead className="font-extrabold text-right pr-16">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
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
    </div>
  );
}

export default ManageSubjectPage