"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Iproperty } from "@/components/PropertyCard";
import { toast } from "react-toastify";
import Typewriter from "./typewriter";

const BookmarkButton = ({ property }: { property: Iproperty }) => {
  if (!property) return null;

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/bookmark/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You must be logged in to bookmark a property.");
      return;
    }
    try {
      const res = await fetch(`/api/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <div className="flex items-center justify-center text-white">
      <div className="w-19">
          <Typewriter text="Loading..." speed={25}/>
      </div>
  </div>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="linkbuttonred text-white outline-1 outline-gray-100 font-bold w-full py-2 px-4 rounded-full cursor-pointer flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="linkbuttongray text-white outline-1 outline-gray-100 font-bold w-full py-2 px-4 rounded-full cursor-pointer flex items-center justify-center"
    >
      <FaRegBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
