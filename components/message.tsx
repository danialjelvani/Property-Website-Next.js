"use client";
import { set } from "mongoose";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMessageContext } from "@/context/messageContext";

const Message = ({
  message,
  messageNumber,
}: {
  message: any;
  messageNumber: number;
}) => {
  const [isRead, setIsRead] = useState(message.read);
  const { messageCount, setMessageCount } = useMessageContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        if (!read) {
          toast.success("Message marked as new");
        } else {
          toast.success("Message marked as read");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setMessageCount(messageCount - 1);
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Message could not be deleted");
    }
  };

  return (
    <>
      <div className=" text-white/70 z-10 relative text-right top-10 py-1 px-3 rounded-tl-lg rounded-tr-lg text-xs bg-black/55">
        Message # {messageNumber}
      </div>
      <div
        className="relative flex flex-col justify-around bg-black/10 rounded-lg h-116 md:h-107
    scrollbar overflow-y-scroll snap-y snap-mandatory scroll-smooth snap-center p-4"
      >
        {!isRead && (
          <div className="absolute z-30 top-1 left-1 ring-1 ring-white text-xs text-white rounded-lg px-2 py-">
            New
          </div>
        )}
        <h2 className="my-4">
          <span className="md:text-xl text-lg font-bold mr-2">
            Property Inquiry:
          </span>
          <span className="text-gray-300">{message.property.name}</span>
        </h2>
        <p className="text-gray-300">{message.body}</p>

        <ul className="mt-4 text-sm">
          <li>
            <strong>Name: </strong>
            <span className="text-gray-800">{message.sender.username}</span>
          </li>

          <li>
            <strong>Reply Email: </strong>
            <a href={`mailto:${message.email}`} className="text-gray-800">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className="text-gray-800">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received: </strong>
            <span className="text-gray-800">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </li>
        </ul>
        <div className="flex gap-3 justify-center md:justify-start md:mt-4">
          <button
            onClick={handleDeleteClick}
            className="self-start mt-4 linkbuttonred w-35 h-10 text-center text-white px-2 py-2 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleReadClick}
            className={`self-start mt-4 ${
              isRead ? "linkbuttonemerald" : "linkbuttonamber"
            } w-35 h-10 text-center text-white px-2 py-2 rounded-md`}
          >
            {isRead ? "Mark As New" : "Mark As Read"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;
