import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { Staff, staffs } from "@/lib/api/staff.api";
import { useToast } from "@edge-ui/react";

export const useGetStaffs = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState<Staff[]>([]);

  const getStaffs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await staffs.getTeacher();
      setStaffData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch staffs",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getStaffs();
  }, []);

  return { loading, staffData };
};
