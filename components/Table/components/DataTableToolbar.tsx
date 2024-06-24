"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@edge-ui/react";
import { Input } from "@edge-ui/react";
import { DataTableViewOptions } from "./DataTableViewOptions";

import { priorities, semesterId } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { useGetCourses } from "@/lib/customHooks/getCourses";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { courseData, loading } = useGetCourses();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("activeSemester") && (
          <DataTableFacetedFilter
            column={table.getColumn("activeSemester")}
            title="Semester"
            options={semesterId}
          />
        )}
        {/* {table.getColumn("courseId") && (
          <DataTableFacetedFilter
            column={table.getColumn("courseId")}
            title="Courses"
            options={courseData}
          />
        )} */}
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
