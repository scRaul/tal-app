import { cookies } from "next/headers";
import DefaultLayout from "./DefaultLayout";
import SessionLayout from "./SessionLayout";

export default function AppLayout() {
  const hasSession = cookies().has("session");
  const userName = cookies().get("userName")?.value;
  if (!hasSession) {
    return <DefaultLayout />;
  } else if (userName) {
    return <SessionLayout userName={userName} />;
  } else {
    <DefaultLayout />;
  }
}
