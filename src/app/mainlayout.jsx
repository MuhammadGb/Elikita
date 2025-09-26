"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
  navItems,
  headerImage,
  sidebarImage,
}) {
  return (
    <div className="bg-[#F0EFF5]">
      <div className="flex flex-col mx-auto overflow-hidden md:flex-row">
        <main className={`w-full`}>
          <div className="relative">
            <div className="w-full  h-[200px] md:h-[150px] xl:h-[150px] relative bg-[#1d4ed8]">
              <div className="flex flex-col items-center justify-center w-full h-full gap-2 text-white">
                <p className="mb-2 text-xl">🏥</p>
                <p className="text-lg font-semibold leading-loose text-center md:leading-normal">
                  e-Likita Hospital Consultation Assistant
                </p>
                <p className="text-sm text-gray-200">
                  Healthcare Assistant Guided Triage
                </p>
              </div>
            </div>
            <div className="relative z-10 w-full ">
              <div className="mt-10 lg:mt-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
