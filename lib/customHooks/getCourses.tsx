import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { Course, courses } from "@/lib/api/course.api";
import { useToast } from "@edge-ui/react";

export const useGetCourses = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<Course[]>([]);

  const getCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courses.getCourses();
      setCourseData(data);
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
    getCourses();
  }, []);

  return { loading, courseData, getCourses };
};
