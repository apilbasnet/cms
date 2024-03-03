'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from '@edge-ui/react';
import { Loading } from '@/components/loading';
import { Course, courses } from '@/lib/api/course.api';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import CourseAdd from './(comp)/CourseAdd';

const CoursePage = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const getCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await courses.getCourses();
      setCourseData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: 'Error',
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          'Failed to fetch courses',
      });
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }, [toast, router]);

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-5/6 py-8 px-8">
        <div>
          <h1 className="font-medium text-xl pb-5">Manage Course</h1>
        </div>
        <CourseAdd refresh={getCourses} />
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the courses presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Course</TableHead>
              <TableHead className="font-extrabold text-right pr-16">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant={'outline'} className="w-20 mr-2">
                    Edit
                  </Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CoursePage;
