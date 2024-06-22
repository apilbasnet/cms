"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  Button,
  useToast,
} from "@edge-ui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@edge-ui/react";
import { useCallback, useState } from "react";
import { StudentEdit } from "@/app/dashboard/manage-student/(edit)/StudentEdit";
import AlertPopup from "@/components/AlertDialog";
import { students } from "@/lib/api/student.api";
import { AxiosError } from "axios";
import { Loading } from "@/components/loading";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (data: Student) => void;
  onDelete: (id: number) => void;
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

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const data = row.original as Student;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onEdit(data)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(data.id)}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
