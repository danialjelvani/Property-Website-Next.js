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
import BookmarkButton from "@/components/bookmarkButton";
import ShareButtons from "@/components/shareButtons";
import PropertyContactForm from "@/components/propertyContactForm";

const PropertyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                scroll={false}
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
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
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
