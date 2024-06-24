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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "@/components/icons/icons";

const SubjectPage = () => {
  const { subjectData, loading: subjectLoading } = useGetSubjects();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const { getSubjects } = useGetSubjects();
  const { courseData } = useGetCourses();

  const { staffData, loading: staffLoading } = useGetStaffs();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    course: z.number(),
    semesterId: z.number(),
    teacherId: z.number(),
    code: z.string(),
  });

  const deleteSubject = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await subjects.deleteSubject(id);
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
      await getSubjects();
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

  const [editSubjectName, setEditSubjectName] = useState("");
  const [courseId, setCourseId] = useState(0);
  const [semesterId, setSemesterId] = useState(0);
  const [teacherId, setTeacherId] = useState(0);
  const [code, setCode] = useState("");

  const editSubject = async (id: number) => {
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
      await getSubjects();
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
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const filteredSubjects = subjectData.sort(
    (a, b) => a.semesterId - b.semesterId
  );
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
                          <AlertDialogDescription>
                            <Form {...form}>
                              <form
                                className="w-full mt-2 gap-2 space-y-2"
                                onSubmit={form.handleSubmit(() =>
                                  editSubject(data.id)
                                )}
                              >
                                <Input
                                  type="text"
                                  placeholder={data.name}
                                  value={editSubjectName}
                                  required
                                  onChange={(v) =>
                                    setEditSubjectName(v.target.value)
                                  }
                                />

                                <FormField
                                  control={form.control}
                                  name="semester"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="semester">
                                        Semester
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          required
                                          onValueChange={(e) =>
                                            setSemesterId(Number(e))
                                          }
                                          value={String(semesterId)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue
                                              placeholder={"Semester"}
                                            />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Array.from({ length: 8 }).map(
                                              (_, i) => (
                                                <SelectItem
                                                  key={i}
                                                  value={String(i + 1)}
                                                >
                                                  {i + 1} Semester
                                                </SelectItem>
                                              )
                                            )}
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="course"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="course">
                                        Course
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          onValueChange={(e) =>
                                            setCourseId(Number(e))
                                          }
                                          value={String(courseId)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Course" />
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
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="teacher"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="teacher">
                                        Teacher
                                      </FormLabel>
                                      <FormControl>
                                        <Select
                                          onValueChange={(e) =>
                                            setTeacherId(Number(e))
                                          }
                                          value={String(teacherId)}
                                          required
                                        >
                                          <SelectTrigger>
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
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="code"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel htmlFor="code">Code</FormLabel>
                                      <FormControl>
                                        <Input
                                          id="code"
                                          type="text"
                                          required
                                          placeholder={data.code}
                                          {...field}
                                          onChange={(event) =>
                                            setCode(event.target.value)
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </form>
                            </Form>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={loading}
                            onClick={() => editSubject(data.id)}
                          >
                            {loading && (
                              <Spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
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
                            onClick={() => deleteSubject(Number(data.id))}
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
