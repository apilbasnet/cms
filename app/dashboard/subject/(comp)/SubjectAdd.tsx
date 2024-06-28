'use client';
import { Spinner } from '@/components/icons/icons';
import {
  Button,
  Input,
  useToast,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Select,
  Form,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FormMessage,
} from '@edge-ui/react';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useGetCourses } from '@/lib/customHooks/getCourses';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { subjects } from '@/lib/api/subject.api';
import { useGetStaffs } from '@/lib/customHooks/getStaffs';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  course: z.number(),
});

export default function SubjectAdd({ refresh }: { refresh: () => void }) {
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState<number | undefined>();
  const [semesterId, setSemesterId] = useState<number | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { courseData, loading: coursesLoading } = useGetCourses();
  const [teacherId, setTeacherId] = useState<number | undefined>();
  const [code, setCode] = useState<string>('');
  const { staffData, loading: staffLoading } = useGetStaffs();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const addSubject = useCallback(async () => {
    try {
      setSubmitting(true);
      const subject = await subjects.createSubject({
        name,
        courseId: courseId!,
        semesterId: semesterId!,
        teacherId: teacherId!,
        code,
      });
      console.log(subject);
      toast({
        title: 'Success',
        description: `Successfully created a new subject ${subject.name}`,
        variant: 'default',
      });
      await refresh();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);

      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Failed to create that subject',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  }, [name, toast, courseId, semesterId, teacherId, code, refresh]);

  return (
    <div className=" mb-4  w-3/4  ">
      <Form {...form}>
        <form
          className="w-full  mt-2  gap-2 flex flex-col  items-center"
          onSubmit={form.handleSubmit(addSubject)}
        >
          <div className="flex gap-2 w-2/3">
            <Input
              type="text"
              placeholder="Subject name"
              value={name}
              required
              onChange={(v) => setName(v.target.value)}
            />
          </div>
          <div className="flex gap-4 w-full justify-center text-center items-center">
            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="semester">Semester</FormLabel>
                  <FormControl>
                    <Select
                      required
                      onValueChange={(e) => setSemesterId(Number(e))}
                      value={String(semesterId)}
                    >
                      <SelectTrigger className="w-36">
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
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="course">Course</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => setCourseId(Number(e))}
                      value={String(courseId)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseData.map((course) => (
                          <SelectItem key={course.id} value={String(course.id)}>
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
                  <FormLabel htmlFor="teacher">Teacher</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => setTeacherId(Number(e))}
                      value={String(teacherId)}
                      required
                    >
                      <SelectTrigger className="w-32">
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
                      {...field}
                      onChange={(event) => setCode(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={submitting} className="mt-7" onClick={addSubject}>
              {submitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Add Subject
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
