'use client';

import { columns } from './components/columns';
import { DataTable } from '@/components/Table/components/DataTable';
import { useGetStudents } from '@/lib/customHooks/getStudents';
import { Loading } from '@/components/loading';
import { useCallback, useState } from 'react';
import { Button, toast } from '@edge-ui/react';
import { NotificationDialog } from '@/components/NotificationDialog';
import { RoleType } from '@/lib/api/user.api';

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

export default function NotifyStudentPage() {
  const { studentData, loading: fetching, refetch } = useGetStudents();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [d, setD] = useState<Student>();

  const isLoading = fetching || loading;

  const onNotify = useCallback(async (data: Student) => {
    setNotification(true);
    setD(data);
  }, []);

  const handleNotifyAll = useCallback(async () => {
    setNotification(true);
  }, []);

  const columnsWithActions = columns({ onNotify });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Send Notification To Students
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of students!
            </p>
          </div>
          <Button variant="default" onClick={handleNotifyAll}>
            Send Notification to All
          </Button>
        </div>
        <DataTable data={studentData} columns={columnsWithActions} />

        {notification && (
          <NotificationDialog
            role={RoleType.STUDENT}
            user={d}
            onDone={() => {
              setNotification(false);
              toast({
                title: 'Notification Sent',
                description: 'Notification has been sent',
              });
            }}
          />
        )}
      </div>
    </>
  );
}
