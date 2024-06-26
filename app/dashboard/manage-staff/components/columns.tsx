"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { semesterId } from "../data/data";
import { DataTableColumnHeader } from "@/components/Table/components/DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

interface Staff {
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
}
[];

interface columnTableProps {
  onEdit: (data: Staff) => void;
  onDelete: (id: number) => void;
}

export const columns = ({
  onEdit,
  onDelete,
}: columnTableProps): ColumnDef<Staff>[] => [
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
