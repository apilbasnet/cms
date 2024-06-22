"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SelectItem,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
  useToast,
} from "@edge-ui/react";
import AlertPopup from "@/components/AlertDialog";
import { Student, students } from "@/lib/api/student.api";
import { StudentEdit } from "./(edit)/StudentEdit";
import { AxiosError } from "axios";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useGetCourses } from "@/lib/customHooks/getCourses";

const ManageStudentPage = () => {
  const { courseData, loading: courseLoading } = useGetCourses();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
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

  const getStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await students.getStudent();
      setStudentData(data);
    } catch (err: any) {
      const error = err as AxiosError;
      toast({
        title: "Error",
        description:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch Students data",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteStudent = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await students.deleteStudent(id);
        toast({
          title: "Success",
          description: "Student deleted successfully",
        });
        getStudents();
      } catch (err: any) {
        const error = err as AxiosError;
        toast({
          title: "Error",
          description:
            (error.response?.data as any)?.message ||
            error.message ||
            "Failed to delete student",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast, getStudents]
  );

  useEffect(() => {
    getStudents();
  }, []);

  const filteredStudentData = studentData.filter((data) => {
    if (courseFilter === "All" && semesterFilter === "All") {
      return data.name.toLowerCase().includes(nameFilter.toLowerCase());
    } else {
      return (
        data.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        (semesterFilter === "All" ||
          data.activeSemester?.name === semesterFilter) &&
        (courseFilter === "All" || data.course?.name === courseFilter)
      );
    }
  });

  return (
    <div className="flex flex-col justify-start items-center w-4/5 p-8">
      <div>
        <h1 className="font-medium text-xl pb-5">Manage Student</h1>
      </div>

      <div className="flex  w-full justify-start mb-4 gap-4 ">
        <Input
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-52"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9   border-dashed">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Semester
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search " />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup title="Semester">
                  <CommandItem
                    onSelect={() => setSemesterFilter("All")}
                    className={cn(semesterFilter === "All" && "bg-gray-100")}
                  >
                    All
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "All"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>

                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 1")}
                    className={cn(
                      semesterFilter === "Semester 1" && "bg-gray-100"
                    )}
                  >
                    First Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 1"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 2")}
                    className={cn(
                      semesterFilter === "Semester 2" && "bg-gray-100"
                    )}
                  >
                    Second Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 2"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 3")}
                    className={cn(
                      semesterFilter === "Semester 3" && "bg-gray-100"
                    )}
                  >
                    Third Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 3"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 4")}
                    className={cn(
                      semesterFilter === "Semester 4" && "bg-gray-100"
                    )}
                  >
                    Fourth Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 4"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 5")}
                    className={cn(
                      semesterFilter === "Semester 5" && "bg-gray-100"
                    )}
                  >
                    Fifth Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 5"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 6")}
                    className={cn(
                      semesterFilter === "Semester 6" && "bg-gray-100"
                    )}
                  >
                    Sixth Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 6"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 7")}
                    className={cn(
                      semesterFilter === "Semester 7" && "bg-gray-100"
                    )}
                  >
                    Seventh Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 7"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                  <CommandItem
                    onSelect={() => setSemesterFilter("Semester 8")}
                    className={cn(
                      semesterFilter === "Semester 8" && "bg-gray-100"
                    )}
                  >
                    Eighth Semester
                    <div
                      className={cn(
                        "absolute right-2 top-2 rounded-full bg-white border-2 border-primary-foreground  ",
                        semesterFilter === "Semester 8"
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9   border-dashed">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Course
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search " />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup title="Course">
                  <CommandItem
                    onSelect={() => setCourseFilter("All")}
                    className={cn(courseFilter === "All" && "bg-gray-100")}
                  >
                    All
                  </CommandItem>
                  {courseData.map((course) => (
                    <CommandItem
                      key={course.id}
                      onSelect={() => setCourseFilter(course.name)}
                      className={cn(
                        courseFilter === course.name && "bg-gray-100"
                      )}
                    >
                      {course.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <Table className="border rounded-2xl">
        <TableCaption className="mt-5">
          A list of the students presented in Swastik College
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-extrabold">ID</TableHead>
            <TableHead className="font-extrabold">Full Name</TableHead>
            <TableHead className="font-extrabold">Email</TableHead>
            <TableHead className="font-extrabold">Course</TableHead>
            <TableHead className="font-extrabold">Semester</TableHead>
            <TableHead className="text-right font-extrabold pr-16">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredStudentData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.course?.name}</TableCell>
              <TableCell>{data.activeSemester?.name}</TableCell>

              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2 w-20"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </AlertDialogTrigger>
                  {isEditing && (
                    <AlertDialogContent>
                      <StudentEdit
                        student={data}
                        onDone={() => {
                          setIsEditing(false);
                          getStudents();
                        }}
                      />
                    </AlertDialogContent>
                  )}
                </AlertDialog>

                <AlertPopup
                  onCanceled={() => {}}
                  onConfirmed={() => {
                    deleteStudent(data.id);
                  }}
                >
                  <Button variant="destructive">Delete</Button>
                </AlertPopup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageStudentPage;
