'use client';

import { ColumnDef } from '@tanstack/react-table';

import { semesterId } from '@/components/Table/data/data';
import { DataTableColumnHeader } from '@/components/Table/components/DataTableColumnHeader';
import { Actions } from './Actions';
import type { Student } from '../page';

interface columnTableProps {
  onPresent: (data: Student) => void;
  onAbsent: (id: Student) => void;
  present: (id: Student) => void;
}

export const columns = ({
  onPresent,
  onAbsent,
  present,
}: columnTableProps): ColumnDef<Student>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'email',
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
    accessorKey: 'contact',
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Contact
      </div>
    ),
    cell: ({ row }) => {
      const contact: number = row.getValue('contact');
      return (
        <div className="flex space-x-2 text-muted-foreground text-xs font-semibold">
          {contact}
        </div>
      );
    },
  },

  {
    id: 'Attendance',
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">Date</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{new Date().toDateString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'activeSemester',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),

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
      const rowValueName = String((row.getValue(id) as any)?.name);
      const filterValue = String(value);

      return filterValue.includes(rowValueName);
    },
  },
  {
    accessorKey: 'course',
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
      const rowValueName = String((row.getValue(id) as any)?.name);
      const filterValue = String(value);

      return filterValue.includes(rowValueName);
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className="text-xs hover:text-black hover:cursor-default ">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Actions
          row={row}
          onAbsent={onAbsent as any}
          onPresent={onPresent as any}
          isPresent={present as any}
        />
      );
    },
  },
];
