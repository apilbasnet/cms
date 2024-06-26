"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@edge-ui/react";
import { Checkbox } from "@edge-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@edge-ui/react";

import { labels, priorities, semesterId } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

interface Student {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  course: { id: number; name: string };
  activeSemester: { id: number; name: string };
  password: string;
}
[];

interface columnTableProps {
  onEdit: (data: Student) => void;
  onDelete: (id: number) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: columnTableProps): ColumnDef<Student>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Email
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center font-semibold text-xs text-muted-foreground">
          {row.original.email}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "contact",
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Contact
      </div>
    ),
    cell: ({ row }) => {
      const contact: number = row.getValue("contact");
      return (
        <div className="flex space-x-2 text-muted-foreground text-xs font-semibold">
          {contact}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Address
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center font-semibold text-xs text-muted-foreground">
          <div className="max-w-32">{row.original.address}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "activeSemester",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
    // cell: ({ row }) => {
    //   return (
    //     <div className="flex items-center">
    //       <span>{row.original.activeSemester?.name}</span>
    //     </div>
    //   );
    // },
    cell: ({ row }) => {
      const semester = semesterId.find(
        (semester) => semester.label === row.original.activeSemester.name
      );

      if (!semester) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{semester.label}</span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      const rowValueName = String(row.getValue(id)?.name);
      const filterValue = String(value);

      return filterValue.includes(rowValueName);
    },
  },
  {
    accessorKey: "course",
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Course
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.course?.name}</span>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      const rowValueName = String(row.getValue(id)?.name);
      const filterValue = String(value);

      return filterValue.includes(rowValueName);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];
