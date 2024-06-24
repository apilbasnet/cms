"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Table/components/DataTableColumnHeader";
import { SendNotifyButton } from "./SendNotifyButton";

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
  onNotify: (data: Staff) => void;
}

export const columns = ({ onNotify }: columnTableProps): ColumnDef<Staff>[] => [
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
    // cell: ({ row }) => {
    //   const priority = priorities.find(
    //     (priority) => priority.value === row.getValue("courseId")
    //   );

    //   if (!priority) {
    //     return null;
    //   }

    //   return (
    //     <div className="flex items-center">
    //       {priority.icon && (
    //         <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //       )}
    //       <span>{priority.label}</span>
    //     </div>
    //   );
    // },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SendNotifyButton row={row} onNotify={onNotify} />;
    },
  },
];
