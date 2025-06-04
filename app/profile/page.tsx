"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  return (
    <section className="bg-black/10">
      <div className="container m-auto py-24">
        <div className="bg-orange-500/85 px-6 py-8 mb-4 shadow-[0_0_10px] shadow-amber-300 rounded-xl  m-4 md:m-0">
          <h1 className="text-3xl font-bold text-white text-shadow-[0_0_10px] text-shadow-white/30 text-center md:text-left mt-6 md:ml-10">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 md:mx-20 mt-10">
              <div className="mb-8 shadow-md w-[200px] h-[200px] mx-auto md:mx-0 rounded-full shadow-white/60">
                <Image
                  className="rounded-full mx-auto md:mx-0"
                  src={profileDefault}
                  alt="UserPhoto"
                  height={200}
                  width={200}
                  sizes="100vw"
                />
              </div>

              <h2 className="text-xl mb-8">
                <span className="font-bold block text-2xl text-shadow-[0_0_10px] text-shadow-white/30 text-white mb-2">Name: </span> {profileName}
              </h2>
              <h2 className="text-xl mb-14">
                <span className="font-bold block text-2xl text-shadow-[0_0_10px] text-shadow-white/30 text-white mb-2">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-2xl font-semibold text-shadow-[0_0_10px] text-shadow-black/20 text-white mb-8">Your Listings</h2>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full shadow-[0_0_10px] shadow-yellow-200/60 rounded-lg object-cover"
                    src="/images/properties/a1.jpg"
                    alt="Property 1"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 1</p>
                  <p className="text-gray-700">Address: 123 Main St</p>
                </div>
                <div className="mt-2 flex justify-start">
                  <a
                    href="/add-property.html"
                    className="linkbuttonamber w-25 h-10 text-center text-white px-3 py-2 rounded-md mr-2"
                  >
                    Edit
                  </a>
                  <button
                    className="linkbuttonred w-25 h-10 text-white px-3 py-2 rounded-md"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/b1.jpg"
                    alt="Property 2"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 2</p>
                  <p className="text-gray-600">Address: 456 Elm St</p>
                </div>
                <div className="mt-2">
                  <a
                    href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
