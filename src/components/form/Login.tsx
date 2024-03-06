"use client";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { login } from "../../actions/auth.action";

export default function Login() {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <form
      action={formAction}
      className="border border-white rounded p-6 flex flex-col justify-around"
    >
      <small className="text-red-500">{state?.message}</small>
      <span className="font-bold text-xl">Log in</span>
      <div className="p-1">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" className="input" />
      </div>
      <div className="p-1">
        <small className="float-end">
          <Link
            href={"/password-reset"}
            className="text-blue-500 hover:underline"
          >
            forgot password?
          </Link>
        </small>
      </div>
      <div className="p-1">
        <label htmlFor="code" className="block font-medium">
          Password
        </label>
        <input id="code" name="password" type="password" className="input" />
      </div>
      <div className="p-1">
        <SubmitButton
          text={"Log in"}
          pendingText={"logging in..."}
          className="w-full rounded p-2 bg-blue-500 hover:bg-blue-400"
        />
      </div>
      <div className="mt-2">
        <small>
          {`Don't have an account? `}
          <Link href={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </small>
      </div>
    </form>
  );
}
