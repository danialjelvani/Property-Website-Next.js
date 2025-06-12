"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useMessageContext } from "@/context/messageContext";

const UnreadMessageCount = ({ session }: any) => {

const { unreadCount, setUnreadCount } = useMessageContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessageCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessageCount();
  }, [session]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
