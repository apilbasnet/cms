import React from "react";
import {
  Button,
  Input,
  Label,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@edge-ui/react";

const CoursePage = () => {
  const demoData = [
    {
      id: "1",
      Course: "BCA",
      Actions: "",
    },
    {
      id: "2",
      Course: "CSIT",
      Staff: "DemoName",
      Actions: "",
    }
  ];

  return (
    <>
      <div className="flex flex-col justify-start items-center w-5/6 py-8 px-8">
        <div>
          <h1 className="font-medium text-xl pb-5">Manage Course</h1>
        </div>
        <Label className="w-96 mb-6 ">
          Add Course
          <div className="flex my-2 gap-2">
            <Input type="text" placeholder="Course" ></Input>
            <Button>Add Course</Button>
          </div>
        </Label>
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the courses presented in Swastik College
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
    </>
  );
};

export default CoursePage;
