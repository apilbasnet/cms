"use client";
import { columns } from "./components/columns";
import { DataTable } from "@/components/Table/components/DataTable";
import { useGetStaffs } from "@/lib/customHooks/getStaffs";
import { Loading } from "@/components/loading";
import { useCallback, useState } from "react";

type Staff = {
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
};

export default function NotifyStaffPage() {
  const { staffData, loading: fetching, refetch } = useGetStaffs();
  const [loading, setLoading] = useState(false);

  const isLoading = fetching || loading;

  const onNotify = useCallback(async (data: Staff) => {
    alert(data.email + " has been notified");
  }, []);

  const columnsWithActions = columns({ onNotify });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Send Notifications to Staffs
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of staffs!
            </p>
          </div>
        </div>
        <DataTable data={staffData} columns={columnsWithActions} />
      </div>
    </>
  );
}
