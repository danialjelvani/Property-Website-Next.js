import React from "react";
import Image from "next/image";
import { useState } from "react";

const propertyHeaderImage = ({ image }: { image: string }) => {
  const [retrykey, setRetryKey] = useState(0);

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1 relative h-[500px] w-full justify-items-center">
          <Image
            key={retrykey}
            src={image}
            alt="Property Image"
            className="object-cover [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            fill={true}
            sizes="100vw"
            onError={() => {
              if (retrykey < 6) {
                setRetryKey((prev) => prev + 1);
              }
            }}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default propertyHeaderImage;
