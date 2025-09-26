"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userLocation, setUserLocation] = useState(window.location.pathname);
  useEffect(() => {
    console.log(window.location.pathname);
    console.log(window.location.pathname?.includes("profile"));
  }, []);

  return (
    <div className="h-[8rem] w-full relative  ">
      <div div className="absolute z-10 w-full h-full nav_banner"></div>
      <Image
        src={
          userLocation?.includes("profile")
            ? "/images/profile_bg.svg"
            : "/assets/img/bg-image.png"
        }
        layout="fill"
        alt="profile"
        className="object-cover"
      />
      <div className="absolute z-20 px-5 py-1 font-medium bg-white rounded-full text-slate-600 left-12 top-8">
        <h3>Create Patient Profile</h3>
      </div>
    </div>
  );
};

export default Navbar;
