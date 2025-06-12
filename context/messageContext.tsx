"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type MessageContextType = {
  messageCount: number;
  setMessageCount: any;
  unreadCount: number;
  setUnreadCount: any;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageCount, setMessageCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  return (
    <MessageContext.Provider
      value={{ messageCount, setMessageCount, unreadCount, setUnreadCount }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
