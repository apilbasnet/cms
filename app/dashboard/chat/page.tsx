import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";
import React from "react";

const Chat = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={10} />;
};

export default Chat;
