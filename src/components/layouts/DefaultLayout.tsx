"use client";
import { usePathname } from "next/navigation";
import TopPanel from "../panel/TopPanel";
import Logo from "../navigation/Logo";
import Link from "next/link";

export default function DefaultLayout() {
  const pathname = usePathname();

  const isAuthPath = pathname == "/login" || pathname == "/signup";

  return (
    <TopPanel position="absolute" className="py-4 px-4">
      <Logo href="/" />
      <div className="flex-grow"></div>
      {!isAuthPath && (
        <>
          <Link href="/signup" className="p-2 border mr-4">
            <span>Sign up</span>
          </Link>
          <Link href="/login" className="p-2 border mr-4">
            <span>Log in</span>
          </Link>
        </>
      )}
    </TopPanel>
  );
}
