import { Button } from "@edge-ui/react";
import React from "react";
import { Row } from "@tanstack/react-table";

interface NotifyButtonProps<TData> {
  row: Row<TData>;
  onNotify: (data: Staff) => void;
}

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

export function SendNotifyButton<TData>({
  row,
  onNotify,
}: NotifyButtonProps<TData>) {
  const data = row.original as Staff;
  return (
    <Button variant={"secondary"} onClick={() => onNotify(data)}>
      Send Notification
    </Button>
  );
}
