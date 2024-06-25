import { Button } from "@edge-ui/react";
import React from "react";
import { Row } from "@tanstack/react-table";

interface NotifyButtonProps<TData> {
  row: Row<TData>;
  onNotify: (data: Student) => void;
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

export function NotificationToStudent<TData>({
  row,
  onNotify,
}: NotifyButtonProps<TData>) {
  const data = row.original as Student;
  return (
    <Button variant={"secondary"} onClick={() => onNotify(data)}>
      Send Notification
    </Button>
  );
}
