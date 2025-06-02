import Image from "next/image";
import React from "react";

const propertyImages = ({ images }: any) => {
  return (
    <section className="p-4 md:p-7 lg:p-10">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover max-h-[600px] rounded-xl mx-auto"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image:string, index:number) => (
              <div
                key={index}
                className={`
                        ${
                          images.length === 3 && index === 2
                            ? "col-span-2"
                            : "col-span-1"
                        }
                        `}
              >
                <Image
                  src={image}
                  alt=""
                  className="object-cover max-h-[600px] rounded-xl w-full"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default propertyImages;
