"use client";
import { useState } from "react";

interface ConfirmationButtonProps {
  className?: string;
  buttonLabel: string;
  prompt: string;
  onConfirm: () => void;
}
export default function ConfirmationButton(props: ConfirmationButtonProps) {
  const [prompt, setPrompt] = useState(false);
  function handleConfirm() {
    setPrompt(false);
    props.onConfirm();
  }
  return (
    <div className={props.className}>
      <button
        id="button"
        onClick={() => setPrompt(true)}
        className="p-2 w-fit rounded"
      >
        {props.buttonLabel}
      </button>
      <dialog open={prompt} className="p-2">
        <p>{props.prompt}</p>
        <div className="flex items-center justify-evenly">
          <button
            id={"cancel"}
            onClick={() => setPrompt(false)}
            className="p-2 w-fit rounded hover:text-white"
          >
            Cancel
          </button>
          <button
            id={"confirm"}
            onClick={handleConfirm}
            className="p-2 w-fit rounded hover:text-white"
          >
            Confirm
          </button>
        </div>
      </dialog>
    </div>
  );
}
