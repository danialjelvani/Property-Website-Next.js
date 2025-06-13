import Image from "next/image";
import React from "react";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { bulletNavigation } from "./bulletNavigation";

const PropertyImages = ({ images }: any) => {
  const [retrykey, setRetryKey] = useState(0);
  return (
    <Gallery uiElements={[bulletNavigation]}>
      <section className="p-4 md:p-7 lg:p-10">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <div className="relative xl:h-200 lg:h-175 md:h-150 h-90 w-full max-w-7xl mx-auto">
              <Item
                original={images[0]}
                thumbnail={images[0]}
                width={1000}
                height={700}
              >
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    key={retrykey}
                    src={images[0]}
                    alt=""
                    className="object-cover rounded-xl cursor-pointer"
                    fill={true}
                    sizes="100vw"
                    priority={true}
                    onError={() => {
                      if (retrykey < 8) {
                        setRetryKey((prev) => prev + 1);
                      }
                    }}
                  />
                )}
              </Item>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:gap-4 gap-2 xl:h-200 lg:h-175 md:h-150 h-90 w-full max-w-7xl mx-auto">
              {images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`
                        ${
                          images.length === 3 && index === 2
                            ? "col-span-2"
                            : "col-span-1"
                        } relative
                        `}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={700}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        key={retrykey}
                        src={image}
                        alt=""
                        className="object-cover rounded-xl cursor-pointer"
                        fill={true}
                        sizes="100vw"
                        priority={true}
                        onError={() => {
                          if (retrykey < 8) {
                            setRetryKey((prev) => prev + 1);
                          }
                        }}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
