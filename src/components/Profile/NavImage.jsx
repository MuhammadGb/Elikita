"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavImage = () => {
  const pathName = usePathname();

  return (
    <div className="relative h-[8rem] w-full ">
      {pathName?.includes("profile") ? (
        <div div className="absolute z-10 w-full h-full nav_banner"></div>
      ) : (
        ""
      )}
      <Image
        src={
          pathName?.includes("profile")
            ? "/images/profile_bg.svg"
            : "/assets/img/bg-image.png"
        }
        quality={100}
        priority
        fill
        //className="w-full h-full"
        // layout="fill"
        className="object-cover"
        alt="profile"
      />
    </div>
  );
};

export default NavImage;
