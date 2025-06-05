"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { fetchPropertyById } from "@/utils/requests";
import PropertyHeaderImage from "@/components/propertyHeaderImage";
import { Iproperty } from "@/components/PropertyCard";
import PropertyDetails from "@/components/propertyDetails";
import LoadingSpinner from "@/app/loading";
import PropertyImages from "@/components/propertyImages";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Iproperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const property = await fetchPropertyById(id);

        // Parse the database images array

        if (property && property.images) {
          const updatedImages: {}[] = [];
          for (const str of property.images) {
            const parsedStr = JSON.parse(str);
            updatedImages.push(parsedStr.url);
          }
          property.images = updatedImages;
        }

        setProperty(property);
      } catch (error) {
        console.log("Error Fetching Property:", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) fetchProperty();
  }, [id]);

  if (!property && !loading) {
    return (
      <h1 className="font-bold text-center text-2xl mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <div>
      {loading && <LoadingSpinner />}
      {property && !loading && (
        <div>
          <PropertyHeaderImage image={property.images[0]} />

          <section>
            <div
              className="bg-black/40 p-6 w-full
            [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_80%,transparent)]"
            >
              <Link
                href="/properties"
                className="text-teal-200 hover:text-yellow-600 w-full xl:ml-20
                active:text-shadow-2xs active:text-shadow-yellow-200 active:transition-all active:duration-200"
              >
                <FaArrowLeft className="inline m-2 mt-1" /> Back to Properties
              </Link>
            </div>
          </section>

          {/*     <!-- Property Info -->
           */}
          <section className="-mt-5 text-black">
            <div className="container max-w-7xl m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-[70%_28%] w-full gap-6">
                <PropertyDetails property={property} />

                {/*           <!-- Sidebar -->
                 */}
                <aside className="space-y-4">
                  <button className="linkbuttongray text-white outline-1 outline-gray-100 font-bold w-full py-2 px-4 rounded-full cursor-pointer flex items-center justify-center">
                    <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                  </button>
                  <button className="linkbuttonred text-white outline-1 outline-red-100 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-share mr-2"></i> Share Property
                  </button>

                  {/*             <!-- Contact Form -->
                   */}
                  <div className="bg-orange-400/90 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-1 focus:shadow-outline"
                          id="phone"
                          name="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none !bg-transparent border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-1 focus:shadow-outline"
                          id="message"
                          name="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="linkbuttondark cursor-pointer text-white font-bold py-2 px-4 rounded-full w-full
                          flex items-center justify-center outline-1 outline-gray-100"
                          type="submit"
                        >
                          <i className="fas fa-paper-plane mr-2"></i> Send
                          Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/*     <!-- Images -->
           */}

          <PropertyImages images={property.images} />
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
