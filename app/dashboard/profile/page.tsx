"use client";
import { useUser } from "@/lib/context/UserContext";
import React from "react";

const ProfilePage = () => {
  const { user } = useUser();

  return <div>{user ? `Hello ${user.name}` : "ProfilePage"}</div>;
};

export default ProfilePage;
