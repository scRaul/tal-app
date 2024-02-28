import { X } from "lucide-react";
import SubmitButton from "./SubmitButton";

interface TitleFormProps {
  label: string;
  submitText: string;
  pendingText: string;
  className?: string;
  onCancel: () => void;
  state: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
export default function TitleForm(props: TitleFormProps) {
  return (
    <form
      className={`p-2 max-w-3xl  mx-auto ${props.className}`}
      onSubmit={props.onSubmit}
    >
      <X
        className="hover:bg-[#ffffff33] rounded-full p-1"
        onClick={props.onCancel}
      />
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="w-full font-bold pl-4">
          {props.label}
        </label>
        <input name="title" id="title" type="text" className="input" />
        <SubmitButton
          text={props.submitText}
          pendingText={props.pendingText}
          className="w-full rounded p-2 bg-green-600 hover:bg-green-400"
        />
        <small className="text-red-500">{props.state}</small>
      </div>
    </form>
  );
}
