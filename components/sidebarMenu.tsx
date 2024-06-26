"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMemo } from "react";
import {
  Home,
  Profile,
  Class,
  Subject,
  Logout,
  AddStaff,
  ManageStaff,
  Notify,
  Attendance,
} from "./icons/icons";
import SwastikIcon from "./icons/Swastik.png";
import Image from "next/image";
import { useUser } from "@/lib/context/UserContext";
import { RoleType } from "@/lib/api/user.api";

const menuItems = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: Home,
    role: [RoleType.ADMIN, RoleType.STUDENT, RoleType.TEACHER],
  },
  {
    label: "Profile",
    link: "/dashboard/profile",
    icon: Profile,
    role: [RoleType.ADMIN, RoleType.STUDENT, RoleType.TEACHER],
  },
  {
    label: "Course",
    link: "/dashboard/course",
    icon: Class,
    role: [RoleType.ADMIN, RoleType.STUDENT, RoleType.TEACHER],
  },
  {
    label: "Subject",
    link: "/dashboard/subject",
    icon: Subject,
    role: [RoleType.ADMIN, RoleType.STUDENT, RoleType.TEACHER],
  },

  {
    label: "Add Student",
    link: "/dashboard/add-student",
    icon: AddStaff,
    role: [RoleType.ADMIN],
  },
  {
    label: "Manage Student",
    link: "/dashboard/manage-student",
    icon: ManageStaff,
    role: [RoleType.ADMIN],
  },
  {
    label: "Add Staff",
    link: "/dashboard/add-staff",
    icon: AddStaff,
    role: [RoleType.ADMIN],
  },
  {
    label: "Manage Staff",
    link: "/dashboard/manage-staff",
    icon: ManageStaff,
    role: [RoleType.ADMIN],
  },

  {
    label: "Notify Staff",
    link: "/dashboard/notify-staff",
    icon: Notify,
    role: [RoleType.ADMIN],
  },
  {
    label: "Notify Student",
    link: "/dashboard/notify-student",
    icon: Notify,
    role: [RoleType.ADMIN, RoleType.TEACHER],
  },
  {
    label: "Attendance",
    link: "/dashboard/attendance",
    icon: Attendance,
    role: [RoleType.ADMIN, RoleType.TEACHER],
  },

  // {
  //   label: "Chat",
  //   link: "/dashboard/chat",
  //   icon: Chat,
  //   role: [RoleType.ADMIN, RoleType.STUDENT, RoleType.TEACHER],
  // },
];

const SidebarMenu = () => {
  const { logout, user } = useUser();
  const pathname = usePathname();

  const filteredItems = useMemo(() => {
    return menuItems.filter((menu) =>
      menu.role.includes(user?.role as RoleType)
    );
  }, [user]);

  const activeMenu = useMemo(
    () => filteredItems.find((menu) => menu.link === pathname),
    [filteredItems, pathname]
  );

  const getNavItemClasses = (menu: Partial<(typeof menuItems)[0]>) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-muted rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-muted"]: activeMenu && activeMenu.link === menu.link,
      }
    );
  };

  return (
    <div
      className={`h-screen px-4 py-2 bg-light flex justify-between flex-col scroll-smooth w-60 border-r`}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col  overflow-auto ">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center justify-center pl-1  w-28 ">
            <Link href="/dashboard">
              <Image src={SwastikIcon} alt="Swastik" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start pt-10 pb-2">
          {filteredItems.map(({ icon: Icon, ...menu }) => {
            return (
              <div
                key={menu.label}
                className={`flex items-center cursor-pointer hover:bg-muted rounded w-full overflow-hidden whitespace-nowrap ${
                  activeMenu && activeMenu.link === menu.link ? "bg-muted" : ""
                }`}
              >
                <Link href={menu.link} legacyBehavior>
                  <a className="flex py-3 px-3 items-center w-full h-full ">
                    <div style={{ width: "2.5rem" }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={classNames(
                        "text-md font-medium text-text-light"
                      )}
                    >
                      {menu.label}
                    </span>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t py-2">
        <button
          className={`${getNavItemClasses({})} px-3 py-4 text-destructive`}
          onClick={logout}
        >
          <div className="w-10">
            <Logout />
          </div>
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
