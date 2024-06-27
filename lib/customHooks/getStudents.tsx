import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Student, students } from '@/lib/api/student.api';
import { useToast } from '@edge-ui/react';

export const useGetStudents = (my = false) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<
    {
      id: number;
      name: string;
      email: string;
      contact: string;
      address: string;
      course: { id: number; name: string };
      activeSemester: { id: number; name: string };
      password: string;
    }[]
  >([]);

  const getStudent = useCallback(async () => {
    setLoading(true);
    try {
      const data = await students.getStudent(my);
      setStudentData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: 'Error',
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          'Failed to fetch courses',
      });
    } finally {
      setLoading(false);
    }
  }, [toast, my]);

  useEffect(() => {
    getStudent();
  }, [my]);

  return { loading, studentData, refetch: getStudent };
};
