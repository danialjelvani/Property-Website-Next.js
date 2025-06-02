import React from "react";
import Image from "next/image";

const propertyHeaderImage = ({ image }: { image: string }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1 justify-items-center">
          <Image
            src={image}
            alt=""
            className="object-cover h-[500px] w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default propertyHeaderImage;
