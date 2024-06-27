'use client';

import { columns } from './components/columns';
import { DataTable } from '@/components/Table/components/DataTable';
import { useGetStudents } from '@/lib/customHooks/getStudents';
import { Loading } from '@/components/loading';
import { useCallback, useState } from 'react';

import { useToast } from '@edge-ui/react';
import { useGetSubjects } from '@/lib/customHooks/getSubject';
import { students } from '@/lib/api/student.api';

export type Student = {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  course: { id: number; name: string };
  activeSemester: { id: number; name: string };
  password: string;
};

export default function AttendancePage() {
  const { toast } = useToast();
  const { studentData, loading: fetching, refetch } = useGetStudents(true);
  const [loading, setLoading] = useState(false);

  const isLoading = fetching || loading;

  const onPresent = useCallback(
    async (data: Student) => {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        await students.attendance({
          studentId: data.id,
          date: `${year}-${String(month).padStart(2, '0')}-${String(
            day
          ).padStart(2, '0')}`,
          present: true,
        });
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to mark student present',
        });
      }
    },
    [toast]
  );

  const onAbsent = useCallback(
    async (data: Student) => {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        await students.attendance({
          studentId: data.id,
          date: `${year}-${String(month).padStart(2, '0')}-${String(
            day
          ).padStart(2, '0')}`,
          present: false,
        });
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to mark student absent',
        });
      }
    },
    [toast]
  );

  const present = onPresent;

  const columnsWithActions = columns({
    onPresent,
    onAbsent,
    present,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Attendance of Students
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of students!
            </p>
          </div>
        </div>
        <DataTable data={studentData} columns={columnsWithActions as any} />
      </div>
    </>
  );
}
