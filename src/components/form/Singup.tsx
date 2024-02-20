"use client";
import Link from "next/link";
import SubmitButton from "./SubmitButton";
import { signup } from "../../actions/auth.action";
import NewPasswordInput from "./NewPasswordInput";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const initialState = {
  message: "",
};

export default function Signup() {
  const [state, formAction] = useFormState(signup, initialState);
  const [passwordFlag, setPasswordFlag] = useState(false);

  return (
    <form
      action={formAction}
      className="border border-white rounded p-6 flex flex-col justify-around"
    >
      {state?.message && (
        <small className="text-red-500">{state.message}</small>
      )}
      <span className="font-bold text-xl">Sign up</span>
      <div className="p-1">
        <label htmlFor="name" className="block font-medium">
          First Name
        </label>
        <input id="name" name="name" type="text" className="input" required />
      </div>
      <div className="p-1">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          required
        />
      </div>
      <div className="p-1">
        <NewPasswordInput
          minLength={6}
          minDigits={1}
          minSymbol={0}
          minUpperCase={1}
          errorFlag={passwordFlag}
        />
      </div>

      <div className="my-2 flex justify-center">
        <input type="checkbox" name="agreed" className="mr-1" required />
        <small>
          {`I agree with the `}
          <a
            target="_blank"
            href={"/terms"}
            className="text-blue-500 hover:underline"
          >
            terms of use
          </a>
          {` and with `}
          <a
            target="_blank"
            href={"/privacy"}
            className="text-blue-500 hover:underline"
          >
            privacy policy
          </a>
        </small>
      </div>
      <div className="p-1">
        <SubmitButton
          text={"sign up"}
          pendingText={"signing up..."}
          className="w-full rounded p-2 bg-blue-500 hover:bg-blue-400"
        />
      </div>
      <div className="mt-2">
        <small>
          {`Already have an account? `}
          <Link href={"/login"} className="text-blue-500 hover:underline">
            Log in
          </Link>
        </small>
      </div>
    </form>
  );
}
