"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type MessageContextType = {
  messageCount: number;
  setMessageCount: (count: number) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageCount, setMessageCount] = useState<number>(0);

  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount }}>
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
