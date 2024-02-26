'use client';
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useMemo } from 'react';
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
} from './icons/icons';
import SwastikIcon from './icons/Swastik.png';
import Image from 'next/image';
import { useUser } from '@/lib/context/UserContext';
import supabase from '@/lib/client';

const menuItems = [
  { label: 'Dashboard', link: '/', icon: Home },
  { label: 'Profile', link: '/profile', icon: Profile },
  { label: 'Course', link: '/course', icon: Class },
  { label: 'Subject', link: '/subject', icon: Subject },
  { label: 'Class', link: '/class', icon: Class },
  { label: 'Add Staff', link: '/add-staff', icon: AddStaff },
  { label: 'Manage Staff', link: '/manage-staff', icon: ManageStaff },
  { label: 'Add Student', link: '/add-student', icon: AddStaff },
  {
    label: 'Manage Student',
    link: '/manage-student',
    icon: ManageStaff,
  },
  { label: 'Notify Staff', link: '/notify-staff', icon: Notify },
  { label: 'Notify Student', link: '/notify-student', icon: Notify },
  {
    label: 'View Attendance',
    link: '/view-attendance',
    icon: Attendance,
  },
  {
    label: 'View Exam Results',
    link: '/exam-results',
    icon: ExamResult,
  },
  {
    label: 'Student Feedback',
    link: '/student-feedback',
    icon: Message,
  },
  { label: 'Staff Feedback', link: '/staff-feedback', icon: Message },
  { label: 'Chat', link: '/chat', icon: Chat },
];

const SidebarMenu = () => {
  // const [toggleCollapse, setToggleCollapse] = useState(false);
  // const [isCollapsible, setIsCollapsible] = useState(false);
  const { user, logout } = useUser();

  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const getNavItemClasses = (menu: Partial<(typeof menuItems)[0]>) => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-muted rounded w-full overflow-hidden whitespace-nowrap',
      {
        ['bg-muted']: activeMenu && activeMenu.link === menu.link,
      }
    );
  };

  // const onMouseOver = () => {
  //   setIsCollapsible(!isCollapsible);
  // };

  // const handleSidebarToggle = () => {
  //   setToggleCollapse(!toggleCollapse);
  // };

  if (!user) {
    return null;
  }

  return (
    <div
      className={`h-screen px-4 py-2 bg-light flex justify-between flex-col scroll-smooth w-60 border-r`}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="flex flex-col  overflow-auto ">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center justify-center pl-1  w-28 ">
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
          {/* {isCollapsible && (
            <button
              className={`p-4 rounded bg-muted absolute right-0  ${
                toggleCollapse ? 'rotate-180' : ''
              }`}
              onClick={handleSidebarToggle}
            >
              <div>
                <Collapse />
              </div>
            </button>
          )} */}
        </div>

        <div className="flex flex-col items-start pt-10 pb-2">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            return (
              <div
                key={menu.label}
                className={`flex items-center cursor-pointer hover:bg-muted rounded w-full overflow-hidden whitespace-nowrap ${
                  activeMenu && activeMenu.link === menu.link ? 'bg-muted' : ''
                }`}
              >
                <Link href={menu.link} legacyBehavior>
                  <a className="flex py-3 px-3 items-center w-full h-full ">
                    <div style={{ width: '2.5rem' }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {/* {!toggleCollapse && ( */}
                    <span
                      className={classNames(
                        'text-md font-medium text-text-light'
                      )}
                    >
                      {menu.label}
                    </span>
                    {/* )} */}
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
          {/* {!toggleCollapse && ( */}
          <span className={classNames('text-md font-medium text-text-light')}>
            Logout
          </span>
          {/* )} */}
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
