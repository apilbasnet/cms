'use client';
import { Spinner } from '@/components/icons/icons';
import { courses } from '@/lib/api/course.api';
import { Button, Input, useToast, Label } from '@edge-ui/react';
import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';

export default function CourseAdd({ refresh }: { refresh: () => void }) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const addCourse = useCallback(async () => {
    try {
      setSubmitting(true);
      const course = await courses.createCourse({ name });
      toast({
        title: 'Success',
        description: `Successfully created a new course ${course.name}`,
        variant: 'default',
      });
      refresh();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast({
        title: 'Error',
        description: 'Failed to create that course',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  }, [name, refresh, toast]);

  return (
    <div className="flex my-2 gap-2 w-1/2">
      <Input
        type="text"
        placeholder="Course name"
        value={name}
        onChange={(v) => setName(v.target.value)}
      />
      <Button disabled={submitting} onClick={addCourse}>
        {submitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}Add
        Course
      </Button>
    </div>
  );
}
