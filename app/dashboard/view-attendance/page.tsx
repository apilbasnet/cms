'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { FaCalendarCheck as CalendarIcon } from 'react-icons/fa';
import { DateRange } from 'react-day-picker';

import { Button } from '@edge-ui/react';
import { Calendar } from '@edge-ui/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Label,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@edge-ui/react';

function ViewAttandancePage() {
  const [date, setDate] = React.useState<Date>();

  const demoData = [] as any[];

  return (
    <div className="flex flex-col w-4/5 p-8 space-y-4">
      <div className="flex flex-col justify-start items-center  ">
        <div>
          <h1 className="font-medium text-xl pb-5">View Attendance</h1>
        </div>

        <div className="flex space-x-2 mb-3">
          <div className="flex items-center  space-x-2">
            <Label className="">Course</Label>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSIT">CSIT</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center  space-x-2">
            <Label>Semester</Label>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={String(1)}>1st Semester</SelectItem>
                <SelectItem value={String(2)}>2nd Semester</SelectItem>
                <SelectItem value={String(3)}>3rd Semester</SelectItem>
                <SelectItem value={String(4)}>4th Semester</SelectItem>
                <SelectItem value={String(5)}>5th Semester</SelectItem>
                <SelectItem value={String(6)}>6th Semester</SelectItem>
                <SelectItem value={String(7)}>7th Semester</SelectItem>
                <SelectItem value={String(8)}>8th Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center  space-x-2">
            <Label className="">Subject</Label>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={String(1)}>1</SelectItem>
                <SelectItem value={String(2)}>2</SelectItem>
                <SelectItem value={String(3)}>3</SelectItem>
                <SelectItem value={String(4)}>4</SelectItem>
                <SelectItem value={String(5)}>5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={`w-[280px] justify-start text-left font-normal ${
                !date && 'text-muted-foreground'
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the students presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Full Name</TableHead>
              <TableHead className="font-extrabold">Email</TableHead>
              <TableHead className="font-extrabold">Course</TableHead>
              <TableHead className="font-extrabold">Faculty</TableHead>
              <TableHead className=" text-right font-extrabold pr-8">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.FullName}</TableCell>
                <TableCell>{data.Email}</TableCell>
                <TableCell>{data.Course}</TableCell>
                <TableCell>{data.Faculty}</TableCell>
                <TableCell className="text-right">
                  <Button variant={'outline'} className="w-20 mr-2" disabled>
                    Present
                  </Button>
                  {/* <Button>Absent</Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ViewAttandancePage;
