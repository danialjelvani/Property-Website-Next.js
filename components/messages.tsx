"use client";
import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/app/loading";
import Message from "@/components/message";
import { Date } from "mongoose";
import { useMessageContext } from "@/context/messageContext";
import { myFont } from "./fonts";

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
      <div className="container max-w-6xl md:flex justify-center items-center md:min-h-[80vh] m-auto mt-1">
        <div className="linkbuttonsky4 grow px-2 md:px-5 py-3 lg:py-5 shadow-[0_0_10px] shadow-sky-300 rounded-xl mx-2">
          <h1 className={`md:text-3xl text-2xl ${myFont.className} text-gray-800 text-center md:mb-10 mb-6`}>
            Your Messages
            <span className="text-xs md:text-sm md:-mb-5 block md:mt-3 mt-2 -mb-2 font-sans">
              You have {messageCount} message
              {messageCount === 1 ? "" : "s"}
            </span>
          </h1>

          <div className="space-y-4 text-black bg-black/10 rounded-lg h-120 md:h-113 scrollbar overflow-y-scroll snap-y snap-mandatory scroll-smooth py-2.5 px-3 md:py-3 md:px-20">
            {messages.length === 0 ? (
              <p className="text-center text-white mt-20">
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
