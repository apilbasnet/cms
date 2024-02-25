"use client";
import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState, useMemo } from "react";
import {
  Home,
  Profile,
  Class,
  Subject,
  Collapse,
  Logout,
  AddStaff,
  ManageStaff,
  Notify,
  Attendance,
  Message,
  ExamResult,
  Chat,
} from "./icons/icons";
import SwastikIcon from "./icons/Swastik.png";
import Image from "next/image";
import { Result } from "postcss";

const menuItems = [
  { id: 1, label: "Dashboard", link: "/", icon: Home },
  { id: 2, label: "Profile", link: "/profile", icon: Profile },
  { id: 3, label: "Course", link: "/course", icon: Class },
  { id: 4, label: "Subject", link: "/subject", icon: Subject },
  { id: 5, label: "Class", link: "/class", icon: Class },
  { id: 6, label: "Add Staff", link: "/add-staff", icon: AddStaff },
  { id: 7, label: "Manage Staff", link: "/manage-staff", icon: ManageStaff },
  { id: 8, label: "Add Student", link: "/add-student", icon: AddStaff },
  {
    id: 9,
    label: "Manage Student",
    link: "/manage-student",
    icon: ManageStaff,
  },
  { id: 10, label: "Notify Staff", link: "/notify-staff", icon: Notify },
  { id: 11, label: "Notify Student", link: "/notify-student", icon: Notify },
  {
    id: 12,
    label: "View Attendance",
    link: "/view-attendance",
    icon: Attendance,
  },
  {
    id: 13,
    label: "View Exam Results",
    link: "/exam-results",
    icon: ExamResult,
  },
  {
    id: 14,
    label: "Student Feedback",
    link: "/student-feedback",
    icon: Message,
  },
  { id: 15, label: "Staff Feedback", link: "/staff-feedback", icon: Message },
  { id: 16, label: "Chat", link: "/chat", icon: Chat },
];

const Header = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu && activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={`h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col scroll-smooth   ${
        toggleCollapse ? "w-20" : "w-60"
      }`}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col  overflow-auto ">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center pl-1  w-28 ">
            <Link href="/">
              <Image src={SwastikIcon} alt="Swastik" />
            </Link>
            {/* <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              
            </span> */}
          </div>
          {isCollapsible && (
            <button
              className={`p-4 rounded bg-light-lighter absolute right-0  ${
                toggleCollapse ? "rotate-180" : ""
              }`}
              onClick={handleSidebarToggle}
            >
              <div>
                <Collapse />
              </div>
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-10  ">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            return (
              <div
                key={menu.id}
                className={`flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap ${
                  activeMenu && activeMenu.id === menu.id
                    ? "bg-light-lighter"
                    : ""
                }`}
              >
                <Link href={menu.link} legacyBehavior>
                  <a className="flex py-3 px-3 items-center w-full h-full ">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Link href="/logout">
        <div className={`${getNavItemClasses({})} px-3 py-4  `}>
          <div className="w-10 ">
            <Logout />
          </div>
          {!toggleCollapse && (
            <span className={classNames("text-md font-medium text-text-light")}>
              Logout
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Header;
