import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { Subject, subjects } from "@/lib/api/subject.api";
import { useToast } from "@edge-ui/react";

export const useGetSubjects = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subjectData, setSubjectData] = useState<Subject[]>([]);

  const getSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await subjects.getSubjects();
      setSubjectData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch courses",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getSubjects();
  }, []);

  return { loading, subjectData, getSubjects };
};
