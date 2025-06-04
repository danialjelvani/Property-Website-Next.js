"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import LoadingPage from "@/app/loading";
import { Iproperty } from "@/components/PropertyCard";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Iproperty[]>([]);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = confirm("Are you sure you want to delete this property?");
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete property");
      }
      setProperties(
        properties.filter((property) => property._id !== propertyId)
      );
      alert("Property deleted successfully");
    } catch (error) {
      alert("Failed to delete property");
      console.log(error);
    }
  };

  return (
    <section className="bg-black/10">
      <div className="container max-w-7xl m-auto md:py-8">
        <div className="bg-orange-500/85 px-6 py-8 mb-4 shadow-[0_0_10px] shadow-amber-300 rounded-xl  m-4 md:m-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow-[0_0_10px] text-shadow-white/30 text-center md:text-left -mt-2 md:mt-6 md:ml-10">
            Your Profile
          </h1>
          <div className="md:flex md:flex-row">
            <div className="md:w-1/5 md:mx-20 md:flex-col gap-8 flex flex-row mt-6 md:mt-10">
              <div className="md:mb-8 mb-1 shadow-md md:w-[150px] md:h-[150px] w-20 h-20 mx-auto md:mx-0 rounded-full shadow-white/60">
                <Image
                  className="rounded-full mx-auto md:mx-0"
                  src={profileDefault}
                  alt="UserPhoto"
                  height={200}
                  width={200}
                  sizes="100vw"
                />
              </div>

              <div className="flex flex-2/3 flex-col -mt-2 md:flex-none justify-around">
                <h2 className="text-md md:text-lg md:mb-8">
                  <span className="font-bold block text-lg md:text-2xl text-shadow-[0_0_10px] text-shadow-white/30 text-white mb-0.5 md:mb-2">
                    Name:{" "}
                  </span>{" "}
                  {profileName}
                </h2>
                <h2 className="text-md md:text-lg mb-6">
                  <span className="font-bold block text-lg md:text-2xl text-shadow-[0_0_10px] text-shadow-white/30 text-white mb-0.5 md:mb-2">
                    Email:{" "}
                  </span>{" "}
                  {profileEmail}
                </h2>
              </div>
            </div>

            <div className="md:w-4/5 md:pl-4 -mt-4 md:-mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-shadow-[0_0_10px] text-shadow-black/20 text-white mb-3 md:mb-6">
                Your Listings{" "}
                <span className="text-sm">
                  ({" "}
                  {properties.length === 1
                    ? properties.length + ` property`
                    : properties.length + ` properties`}{" "}
                  )
                </span>
              </h2>
              <div className="bg-black/10 rounded-lg max-h-90 md:max-h-107 scrollbar overflow-y-scroll snap-y snap-mandatory scroll-smooth p-4 -mb-4 md:mb-0">
                {!loading && properties.length === 0 && (
                  <p>You have no properties yet.</p>
                )}
                {loading ? (
                  <div className="md:top-1/2 md:left-3/5 md:-translate-y-1/2 fixed top-1/5 left-1/2 -translate-x-1/2">
                    <LoadingPage />
                  </div>
                ) : (
                  <div className="space-y-10 snap-y">
                    {properties.map((property) => (
                      <div key={property._id} className="snap-center">
                        <Link href={`/properties/${property._id}`}>
                          <div className="relative lg:h-70 h-50 w-full">
                            <Image
                              src={JSON.parse(property.images[0]).url}
                              className="shadow-[0_0_10px] shadow-yellow-200/60 rounded-lg object-cover"
                              fill={true}
                              alt="Property Image"
                              sizes="75vw"
                              priority={true}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN899DREwAHMAJbOoc+7QAAAABJRU5ErkJggg=="
                            />
                          </div>
                        </Link>
                        <div className="mt-2">
                          <p className="text-lg font-semibold">
                            {property.name}
                          </p>
                          <p className="text-gray-700">
                            Address: {property.location.street}{" "}
                            {property.location.city} {property.location.state}
                          </p>
                        </div>
                        <div className="mt-2 flex justify-start">
                          <Link
                            href={`/properties/${property._id}/edit`}
                            className="linkbuttonamber w-25 h-10 text-center text-white px-3 py-2 rounded-md mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="linkbuttonred w-25 h-10 text-white px-3 py-2 rounded-md"
                            type="button"
                            onClick={() => handleDeleteProperty(property._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
