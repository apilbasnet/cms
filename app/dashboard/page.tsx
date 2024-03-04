"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
} from "@edge-ui/react";
import Image from "next/image";
import React from "react";

import { Overview } from "../../components/overview";
import { Piechart } from "../../components/piechart";
import { RightArrow } from "@/components/icons/icons";
import Link from "next/link";
import { useUser } from "@/lib/context/UserContext";

const DashboardPage = () => {
  const user = useUser();

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
                      {user.user?.role === "ADMIN"
                        ? "Total Students"
                        : user.user?.role === "TEACHER"
                        ? "Total Students"
                        : "Total Attendance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <div className="text-2xl font-bold">
                      {user.user?.role === "ADMIN"
                        ? "2"
                        : user.user?.role === "TEACHER"
                        ? "2"
                        : "4"}
                    </div>
                    <Link
                      href={"/dashboard/manage-student"}
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
                      {user.user?.role === "ADMIN"
                        ? "Total Staff"
                        : user.user?.role === "TEACHER"
                        ? "Total Attendance Taken"
                        : "Percentage Present"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <Link
                      href={"/dashboard/manage-staff"}
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
                      {user.user?.role === "ADMIN"
                        ? "Total Courses"
                        : user.user?.role === "TEACHER"
                        ? "Total Courses"
                        : "Percentage Absent"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <Link
                      href={"/dashboard/course"}
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
                    <div className="text-2xl font-bold">5</div>
                    <Link
                      href={"/dashboard/subject"}
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
                      {user.user?.role === "ADMIN"
                        ? "Attendance Per Subject"
                        : user.user?.role === "TEACHER"
                        ? "Staff Panel"
                        : "Student Panel"}
                    </CardTitle>
                    <CardDescription>
                      {user.user?.role === "ADMIN"
                        ? "Total attendance of students per subject."
                        : user.user?.role === "TEACHER"
                        ? `${user.user.name} - Attendance`
                        : `${user.user?.name} - Attendance`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>
                      {user.user?.role === "ADMIN"
                        ? "Students/Staffs Overview"
                        : user.user?.role === "TEACHER"
                        ? `${user.user.name} - Attendance`
                        : `${user.user?.name} - Attendance`}
                    </CardTitle>
                    <CardDescription>
                      Total students and staffs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Piechart />
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
