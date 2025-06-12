"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/loading";
import Message from "@/components/message";
import { Date } from "mongoose";
import { useMessageContext } from "@/context/messageContext";

interface IMessage {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  property: {
    _id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const Messages = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { messageCount, setMessageCount } = useMessageContext();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (response.status === 200) {
          const data = await response.json();
          setMessageCount(data.length);
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [messageCount]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section>
      <div className="container m-auto py-4 md:mt-6 max-w-6xl">
        <div className="bg-orange-500/85 px-1 md:px-5 py-8 h-150 shadow-[0_0_10px] shadow-amber-300 rounded-xl m-4">
          <h1 className="md:text-3xl text-2xl text-teal-200 text-shadow-[0_0_10px] text-shadow-white/30 text-center font-bold md:mb-10 mb-6">
            Your Messages
            <span className="text-xs md:text-sm md:-mb-5 block md:mt-3 mt-2 -mb-2 font-normal">
              You have {messageCount} message
              {messageCount === 1 ? "" : "s"}
            </span>
          </h1>

          <div className="space-y-4 bg-black/10 rounded-lg h-122 md:h-113 scrollbar overflow-y-scroll snap-y snap-mandatory scroll-smooth py-2.5 px-8 md:py-3 md:px-20">
            {messages.length === 0 ? (
              <p className="text-center text-teal-200 mt-20">
                You have no messages
              </p>
            ) : (
              messages.map((message) => (
                <Message
                  message={message}
                  key={message._id}
                  messageNumber={messages.indexOf(message) + 1}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
