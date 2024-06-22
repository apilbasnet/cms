"use client";
import { useCallback, useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Input,
} from "@edge-ui/react";
import { Loading } from "@/components/loading";
import { Course, courses } from "@/lib/api/course.api";
import { AxiosError } from "axios";
import CourseAdd from "./(comp)/CourseAdd";
import { useUser } from "@/lib/context/UserContext";
import { useGetCourses } from "@/lib/customHooks/getCourses";
import z from "zod";

const CoursePage = () => {
  // const [courseData, setCourseData] = useState<Course[]>([]);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { getCourses, courseData } = useGetCourses();

  const deleteCourse = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await courses.deleteCourse(id);
        toast({
          title: "Success",
          description: "Course deleted successfully",
        });
        getCourses();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to delete course",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, getCourses]
  );

  const [editCourseName, setEditCourseName] = useState("");

  const editCourse = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await courses.editCourse(id, { name: editCourseName });
        toast({
          title: "Success",
          description: "Course updated successfully",
        });
        getCourses();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to update course",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, getCourses, editCourseName]
  );

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-5/6 py-8 px-8">
        <div>
          <h1 className="font-medium text-xl pb-5">
            {user?.role === "ADMIN" ? "Manage Course" : "Course"}
          </h1>
        </div>
        {user?.role === "ADMIN" ? <CourseAdd refresh={getCourses} /> : null}
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the courses presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Course</TableHead>
              {user?.role === "ADMIN" ? (
                <TableHead className="font-extrabold text-right pr-16">
                  Actions
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                {user?.role === "ADMIN" ? (
                  <TableCell className="text-right ">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="secondary" className="mr-2">
                          Edit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Input
                              type="text"
                              placeholder="Course"
                              value={editCourseName}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => setEditCourseName(event.target.value)}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => editCourse(data.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCourse(data.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CoursePage;
