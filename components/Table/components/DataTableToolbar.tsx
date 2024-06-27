'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@edge-ui/react';
import { Input } from '@edge-ui/react';
import { DataTableViewOptions } from './DataTableViewOptions';

import { priorities, semesterId } from '../data/data';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { useGetCourses } from '@/lib/customHooks/getCourses';
import { Loading } from '@/components/loading';
import { CalendarDaysIcon } from '@/components/icons/icons';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { courseData, loading } = useGetCourses();

  const courseOptions = courseData.map((course) => ({
    label: course.name,
    value: course.name,
  }));

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn('activeSemester') && (
          <DataTableFacetedFilter
            column={table.getColumn('activeSemester')}
            title="Semester"
            options={semesterId}
          />
        )}
        {table.getColumn('course') && (
          <DataTableFacetedFilter
            column={table.getColumn('course')}
            title="Courses"
            options={courseOptions}
          />
        )}
        {table.getColumn('subject') && (
          <DataTableFacetedFilter
            column={table.getColumn('subject')}
            title="Subject"
            options={courseOptions}
          />
        )}
        {/* {
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <CalendarDaysIcon className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        } */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
