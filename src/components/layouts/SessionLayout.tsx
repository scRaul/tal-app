"use client";
import TopPanel from "../panel/TopPanel";
import Logo from "../navigation/Logo";
import { CircleUser } from "lucide-react";
import SlidingPanel from "../panel/SlidingPanel";
import { useEffect, useState } from "react";
import { signout } from "@/actions/auth.action";
import { useRouter } from "next/navigation";

interface SessionProps {
  userName: string;
}
export default function SessionLayout(props: SessionProps) {
  const router = useRouter();
  const [closeSignOut, setCloseSignOut] = useState(true);
  async function handleLogOut() {
    await signout();
    router.refresh();
  }
  return (
    <>
      <TopPanel position="absolute" className="py-4 px-4">
        <Logo href="/" />
        <div className="flex-grow"></div>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => setCloseSignOut(!closeSignOut)}
        >
          <CircleUser />
          <span>{props.userName}</span>
        </div>
      </TopPanel>
      <SlidingPanel
        panelType="Side"
        closeTowards="right"
        position="absolute"
        isClosed={closeSignOut}
        className="px-5 w-full"
      >
        <div className="flex pt-16">
          <div
            className="flex-grow"
            onClick={() => setCloseSignOut(true)}
          ></div>
          <div className="pt-10 p-4 rounded border shadow-2xl shadow-black bg-blue-600">
            <button
              type="submit"
              className="rounded p-2 cursor-pointer bg-red-700 hover:bg-red-500 active:bg-red-600 font-medium"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="flex-grow" onClick={() => setCloseSignOut(true)}></div>
      </SlidingPanel>
    </>
  );
}
