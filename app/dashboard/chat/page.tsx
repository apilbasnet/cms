import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";
import React from "react";

const Chat = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="z-10 border rounded-lg h-screen w-full text-sm lg:flex">
      <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={20} />
    </div>
  );
};

export default Chat;
