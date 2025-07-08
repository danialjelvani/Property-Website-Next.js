"use client";
import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import profileDefault from "@/assets/images/profile.png";
import LoadingPage from "@/app/loading";
import { Iproperty } from "@/components/PropertyCard";
import { myFont } from "@/components/fonts";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [retrykey, setRetryKey] = useState(0);

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
      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("Failed to delete property");
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete your account? All your properties will also be deleted."
    );
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/properties/user/${session?.user?.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast.error("Failed to delete user");
      }
      toast.success("User deleted successfully");
      signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete user");
      console.log(error);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center">
      <LoadingPage />
    </div>
  ) : (
    <section className="bg-black/10 text-black">
      <div className="container max-w-6xl flex justify-center items-center lg:min-h-[80vh] m-auto">
        <div className="linkbuttonsky4 p-4 pb-8 md:pb-4 grow shadow-[0_0_10px] shadow-amber-300 rounded-xl m-2">
          <h1
            className={`text-3xl md:text-4xl ${myFont.className} text-gray-800 text-center md:ml-3 lg:ml-10 md:text-left md:mt-6`}
          >
            My Profile
          </h1>
          <div className="md:flex  md:gap-5 lg:gap-10 md:flex-row">
            <div className="md:w-1/6 md:ml md:mr-15 md:ml-6 lg:ml-10 md:flex-col gap-8 flex flex-row mt-6 md:mt-10">
              <div className="md:mb-3 mb-6 -mt-2 md:mt-0 md:w-[100px] md:h-[100px] w-20 h-20 mx-auto md:mx-0 rounded-full">
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
                <h2 className="text-md md:text-lg md:mb-6">
                  <span className="font-bold text-md md:text-xl text-gray-200">
                    Name:{" "}
                  </span>{" "}
                  <span className="md:block">{profileName}</span>
                </h2>
                <h2 className="text-md md:text-lg md:mb-6">
                  <span className="font-bold text-md md:text-xl text-gray-200">
                    Email:{" "}
                  </span>{" "}
                  <span className="md:block">{profileEmail}</span>
                </h2>

                <button
                  className="linkbuttondark rounded-md cursor-pointer w-35 h-8 md:h-10 text-sm md:text-base block text-shadow-[0_0_10px] text-shadow-white/30 text-white mb-4 mt-2 md:mb-2"
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:w-[400px] lg:w-[600px] xl:w-[700px] grow -mt-2 md:-mt-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
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

                <div className="space-y-10 snap-y">
                  {properties.map((property) => (
                    <div key={property._id} className="snap-center">
                      <Link href={`/properties/${property._id}`}>
                        <div className="relative md:h-70 h-50 w-full">
                          <Image
                            key={retrykey}
                            src={JSON.parse(property.images[0]).url}
                            className="shadow-[0_0_10px] shadow-yellow-200/60 rounded-lg object-cover"
                            fill={true}
                            alt="Property Image"
                            sizes="75vw"
                            priority={true}
                            onError={() => {
                              if (retrykey < 5) {
                                setRetryKey((prev) => prev + 1);
                              }
                            }}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN899DREwAHMAJbOoc+7QAAAABJRU5ErkJggg=="
                          />
                        </div>
                      </Link>
                      <div className="mt-3">
                        <p className="md:text-lg mb-1.5 font-semibold">
                          {property.name}
                        </p>
                        <p className="text-gray-800 text-sm md:text-base">
                          Address: {property.location.street}{" "}
                          {property.location.city} {property.location.state}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-start">
                        <Link href={`/properties/${property._id}/edit`}>
                          <button className="text-center linkbuttonamber text-white rounded-md mr-2 text-sm md:text-base w-25 h-9">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="linkbuttonred text-sm md:text-base w-25 h-9 text-white rounded-md"
                          type="button"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
