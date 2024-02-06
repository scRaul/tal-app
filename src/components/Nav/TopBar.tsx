"use client";

import Header from "./Header";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AlignJustify, Search, UserCircle } from "lucide-react";
function Logo() {
  return (
    <Link href="/">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </Link>
  );
}

export function DefaultBar() {
  const pathname = usePathname();

  return (
    <Header className="bg-inherit shadow-2xl px-2">
      <Logo />
      <div className="flex-grow"></div>
      {pathname != "/login" && (
        <Link href={"/login"}>
          <div className="border rounded py-1 px-2 cursor-pointer">Log in</div>
        </Link>
      )}
      {pathname != "/signup" && (
        <Link href={"/signup"}>
          <div className="w-0  overflow-hidden md:w-full  md:border md:rounded md:py-1 md:px-2 md:cursor-pointer">
            Sign up
          </div>
        </Link>
      )}
    </Header>
  );
}

export function SessionBar() {
  const pathname = usePathname();
  return (
    <Header className="bg-inherit shadow-2xl px-2">
      <div
        className="rounded-full hover:bg-slate-200 p-2 cursor-pointer"
        onClick={() => alert("open side bar / drop down pannel ")}
      >
        <AlignJustify />
      </div>
      <Logo />
      <Link href={"/login"}>
        <div className="py-1 px-2 cursor-pointer text-blue-500">Explore</div>
      </Link>
      <div className="flex-grow"></div>
      <div
        className="cursor-pointer"
        onClick={() => alert("swap to search bar ")}
      >
        <Search />
      </div>
      <div
        className="rounded-lg p-1 mx-2 hover:bg-slate-200 cursor-pointer"
        onClick={() => alert("invoke login")}
      >
        <UserCircle />
      </div>
    </Header>
  );
}
