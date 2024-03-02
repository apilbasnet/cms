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

export default function DashboardPage() {
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
                      Total Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <div className="text-2xl font-bold">1</div>
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
                      Total Staff
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
                      Total Courses
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
                    <CardTitle>Attendance Per Subject</CardTitle>
                  <CardDescription>
                    Total attendance of students per subject.
                  </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Students/Staffs Overview</CardTitle>
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
}
