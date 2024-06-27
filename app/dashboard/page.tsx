'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
} from '@edge-ui/react';
import React, { useEffect } from 'react';

import { Overview } from '../../components/overview';
import { Piechart } from '../../components/piechart';
import { RightArrow, Spinner } from '@/components/icons/icons';
import Link from 'next/link';
import { useUser } from '@/lib/context/UserContext';
import { IStats, users } from '@/lib/api/user.api';

const DashboardPage = () => {
  const user = useUser();
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<IStats>({
    courses: 0,
    subjects: 0,
    teachers: 0,
    students: 0,
    admins: 0,
    totalClasses: 0,
    presentClasses: 0,
    absentClasses: 0,
    totalSubjects: 0,
    studentsPerCourse: [],
    attendance: [],
  });

  const getStats = async () => {
    try {
      setLoading(true);
      const data = await users.getStatistics();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="hidden flex-col md:flex w-screen ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight w-full text-center">
              Dashboard
            </h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {user.user?.role === 'ADMIN'
                        ? 'Total Students'
                        : user.user?.role === 'TEACHER'
                        ? 'Total Students'
                        : 'Total Attendance'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <div className="text-2xl font-bold">
                      {user.user?.role === 'ADMIN'
                        ? stats.students
                        : user.user?.role === 'TEACHER'
                        ? stats.students
                        : stats.presentClasses + stats.absentClasses || 0}
                    </div>
                    <Link
                      href={'/dashboard/manage-student'}
                      className="text-xs text-muted-foreground flex gap-1 items-center"
                    >
                      More info
                      <RightArrow />
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {user.user?.role === 'ADMIN'
                        ? 'Total Staff'
                        : user.user?.role === 'TEACHER'
                        ? 'Total Attendance Taken'
                        : 'Present days'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.user?.role === 'ADMIN'
                        ? stats.teachers
                        : user.user?.role === 'TEACHER'
                        ? 0
                        : stats.presentClasses}
                    </div>
                    <Link
                      href={'/dashboard/manage-staff'}
                      className="text-xs text-muted-foreground flex gap-1 items-center"
                    >
                      More info
                      <RightArrow />
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {user.user?.role === 'ADMIN'
                        ? 'Total Courses'
                        : user.user?.role === 'TEACHER'
                        ? 'Total Courses'
                        : 'Absent days'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user.user?.role === 'ADMIN'
                        ? stats.courses
                        : user.user?.role === 'TEACHER'
                        ? stats.courses
                        : stats.absentClasses}
                    </div>
                    <Link
                      href={'/dashboard/course'}
                      className="text-xs text-muted-foreground flex gap-1 items-center"
                    >
                      More info
                      <RightArrow />
                    </Link>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Subjects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.subjects}</div>
                    <Link
                      href={'/dashboard/subject'}
                      className="text-xs text-muted-foreground flex gap-1 items-center"
                    >
                      More info
                      <RightArrow />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>
                      {user.user?.role === 'ADMIN'
                        ? 'Attendance Per Subject'
                        : user.user?.role === 'TEACHER'
                        ? 'Staff Panel'
                        : 'Student Panel'}
                    </CardTitle>
                    <CardDescription>
                      {user.user?.role === 'ADMIN' ||
                      user.user?.role === 'TEACHER'
                        ? 'Total students per course.'
                        : `${user.user?.name} - Attendance`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview
                      data={
                        user.user?.role === 'STUDENT'
                          ? stats.attendance
                          : stats.studentsPerCourse
                      }
                    />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>
                      {user.user?.role === 'STUDENT'
                        ? 'Attendance Overview'
                        : 'Students/Staffs Overview'}
                    </CardTitle>
                    <CardDescription>
                      {user.user?.role === 'STUDENT'
                        ? 'Total present and absent ratio.'
                        : 'Total students and staffs.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Piechart
                      stats={
                        user.user?.role === 'STUDENT'
                          ? [
                              { name: 'Present', value: stats.presentClasses },
                              { name: 'Absent', value: stats.absentClasses },
                            ]
                          : [
                              {
                                name: 'Students',
                                value: stats.students,
                              },
                              {
                                name: 'Staffs',
                                value: stats.admins + stats.teachers || 0,
                              },
                            ]
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
