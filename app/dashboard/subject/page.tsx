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
import { Subject, subjects } from "@/lib/api/subject.api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/UserContext";
import SubjectAdd from "./(comp)/SubjectAdd";
import { useGetSubjects } from "@/lib/customHooks/getSubject";
import { useGetCourses } from "@/lib/customHooks/getCourses";

const SubjectPage = () => {
  const { subjectData, loading: subjectLoading } = useGetSubjects();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { getSubjects } = useGetSubjects();
  const { courseData } = useGetCourses();

  const [editSubjectName, setEditSubjectName] = useState("");
  const editSubject = useCallback(async (id: number) => {
    // try {
    //   setLoading(true);
    //   await subjects.editSubject(id, { name: editSubjectName });
    //   toast({
    //     title: "Success",
    //     description: "Subject updated successfully",
    //   });
    //   getSubjects();
    // } catch (err: any) {
    //   const error = err as AxiosError;
    //   toast({
    //     title: "Error",
    //     description:
    //       (error.response?.data as any)?.message ||
    //       error.message ||
    //       "Failed to update subject",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  console.log(courseData);

  const deleteSubject = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await subjects.deleteSubject(id);
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
      getSubjects();
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to delete subject",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-5/6 py-8 px-8">
        <div>
          <h1 className="font-medium text-xl ">
            {user?.role === "ADMIN" ? "Manage Subjects" : "Subjects"}
          </h1>
        </div>
        {user?.role === "ADMIN" ? <SubjectAdd refresh={getSubjects} /> : null}
        <Table className="border rounded-2xl">
          <TableCaption className="mt-5">
            A list of the subjects presented in Swastik College
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-extrabold">ID</TableHead>
              <TableHead className="font-extrabold">Subject</TableHead>
              <TableHead className="font-extrabold">Course</TableHead>
              <TableHead className="font-extrabold">Semester</TableHead>
              {/* <TableHead className="font-extrabold">Teacher</TableHead> */}
              {user?.role === "ADMIN" ? (
                <TableHead className="font-extrabold text-right pr-16">
                  Actions
                </TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjectData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {/* {data.courseId} */}
                  {courseData.map((course) => {
                    if (course.id === data.courseId) {
                      return course.name;
                    }
                  })}
                </TableCell>
                <TableCell>
                  {data.semesterId}
                  {"'th Semester"}
                </TableCell>
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
                              placeholder="Subject"
                              value={editSubjectName}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => setEditSubjectName(event.target.value)}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => editSubject(data.id)}
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
                            onClick={() => deleteSubject(data.id)}
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

export default SubjectPage;
