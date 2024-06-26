import { Button } from "@edge-ui/react";
import React from "react";
import { Row } from "@tanstack/react-table";

interface ActionProps<TData> {
  row: Row<TData>;
  onPresent: (data: Student) => void;
  onAbsent: (data: Student) => void;
  isPresent: (data: Student) => void;
}

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

export function Actions<TData>({
  row,
  onAbsent,
  onPresent,
}: ActionProps<TData>) {
  const data = row.original as Student;
  const isPresent = false;
  const isAttendanceTaken = true;

  return (
    <div className="space-x-4">
      <Button variant={"outline"} onClick={() => onPresent(data)}>
        Present
      </Button>
      <Button variant={"destructive"} onClick={() => onAbsent(data)}>
        Absent
      </Button>
    </div>
  );
}
