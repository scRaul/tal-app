"use client";
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface NewPasswordProps {
  minLength: number;
  minUpperCase: number;
  minDigits: number;
  minSymbol: number;
  errorFlag: boolean;
}

export default function NewPasswordInput(props: NewPasswordProps) {
  const [password, setPassword] = useState("");
  const [errorsMsgs, setErrorMsgs] = useState<string[]>([]);
  const [hidden, setHidden] = useState(true);

  const textColor = props.errorFlag ? "text-red-500" : "";

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newPassword = event.currentTarget.value;
    setPassword(newPassword);

    const errors: string[] = [];

    if (newPassword.length < props.minLength) {
      errors.push(`Minimum length: ${props.minLength} characters`);
    }
    let upper = 0;
    let digits = 0;
    let symbol = 0;
    for (let i = 0; i < newPassword.length; i++) {
      const char = newPassword[i];
      if (/[A-Z]/.test(char)) {
        upper++;
      } else if (/\d/.test(char)) {
        digits++;
      } else if (/[\W_]/.test(char)) {
        symbol++;
      }
    }
    if (upper < props.minUpperCase) {
      errors.push(`include at least ${props.minUpperCase} uppercase letter(s)`);
    }

    if (digits < props.minDigits) {
      errors.push(`include at least ${props.minDigits} digit(s)`);
    }

    if (symbol < props.minSymbol) {
      errors.push(
        `include at least ${props.minSymbol} special character(s) [#(*$%)]`
      );
    }

    setErrorMsgs(errors);
  }
  return (
    <>
      <label htmlFor="_pssword" className="font-medium block">
        Password
      </label>
      <div className="flex items-center">
        <input
          id={"_pssword"}
          type={hidden ? "password" : "text"}
          name="password"
          value={password}
          className="input"
          onChange={handleChange}
          required
        />
        <div
          className="p-1 m-1 rounded hover:bg-[#ffffff44] text-gray-400"
          title={hidden ? "show password" : "hide password"}
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? <Eye /> : <EyeOff />}
        </div>
      </div>
      <ul className={`list-disc w-fit mx-auto ${textColor}`}>
        {errorsMsgs.map((error, index) => (
          <li key={index}>
            <small>{error}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
