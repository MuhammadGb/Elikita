"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/profile");
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24"></main>
  );
}
