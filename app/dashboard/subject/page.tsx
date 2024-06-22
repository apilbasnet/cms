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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@edge-ui/react";
import { Loading } from "@/components/loading";
import { Subject, subjects } from "@/lib/api/subject.api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/UserContext";
import SubjectAdd from "./(comp)/SubjectAdd";
import { useGetSubjects } from "@/lib/customHooks/getSubject";
import { useGetCourses } from "@/lib/customHooks/getCourses";
import { useGetStaffs } from "@/lib/customHooks/getStaffs";

const SubjectPage = () => {
  const { subjectData, loading: subjectLoading } = useGetSubjects();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { getSubjects } = useGetSubjects();
  const { courseData } = useGetCourses();

  const [editSubjectName, setEditSubjectName] = useState("");
  const [courseId, setCourseId] = useState<number>(0);
  const [semesterId, setSemesterId] = useState<number>(0);
  const [teacherId, setTeacherId] = useState<number>(0);
  const [code, setCode] = useState<string>("");
  const { staffData, loading: staffLoading } = useGetStaffs();

  const editSubject = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await subjects.editSubject(id, {
        name: editSubjectName,
        courseId,
        semesterId,
        teacherId,
        code,
      });
      toast({
        title: "Success",
        description: "Subject updated successfully",
      });
      getSubjects();
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to update subject",
      });
    } finally {
      setLoading(false);
    }
  }, []);

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

  const filteredSubjects = subjectData.sort(
    (a, b) => a.semesterId - b.semesterId
  );

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
            {filteredSubjects.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  {courseData.map((course) => {
                    if (course.id === data.courseId) {
                      return course.name;
                    }
                  })}
                </TableCell>
                <TableCell>
                  {data.semesterId}
                  {" Semester"}
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
                          <AlertDialogDescription className="space-y-2">
                            <p>Name: </p>
                            <Input
                              type="text"
                              placeholder={data.name}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => setEditSubjectName(event.target.value)}
                            />
                            <p>Course: </p>
                            <Select
                              onValueChange={(e) => setCourseId(Number(e))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={"Course"} />
                              </SelectTrigger>
                              <SelectContent>
                                {courseData.map((course) => (
                                  <SelectItem
                                    key={course.id}
                                    value={String(course.id)}
                                  >
                                    {course.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <p>Semester: </p>
                            <Select
                              required
                              onValueChange={(e) => setSemesterId(Number(e))}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semester" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 8 }).map((_, i) => (
                                  <SelectItem key={i} value={String(i + 1)}>
                                    {i + 1} Semester
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <p>Teacher: </p>
                            <Select
                              onValueChange={(e) => setTeacherId(Number(e))}
                              required
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Teacher name" />
                              </SelectTrigger>
                              <SelectContent>
                                {staffData.map((teacher) => (
                                  <SelectItem
                                    key={teacher.id}
                                    value={String(teacher.id)}
                                  >
                                    {teacher.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <p>Code: </p>
                            <Input
                              type="text"
                              placeholder={"Code"}
                              onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => setCode(event.target.value)}
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
