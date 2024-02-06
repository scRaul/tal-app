import { SessionBar, DefaultBar } from "./TopBar";
import { cookies } from "next/headers";
export default async function NavLayout() {
  const hasSession = cookies().has("session");
  const cookie = cookies().get("session");
  console.log(cookie);
  if (hasSession) {
    return <SessionBar />;
  } else {
    return <DefaultBar />;
  }
}
