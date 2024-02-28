"use client";
import { useState } from "react";
import Modal from "../card/Modal";

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
    <Modal
      trigger={
        <button
          id="button"
          className="p-1 bg-red-600 w-full"
          onClick={() => setPrompt(true)}
        >
          {props.buttonLabel}
        </button>
      }
      modalOpen={prompt}
    >
      <div
        style={{ zIndex: 110 }}
        className=" bg-[#ffffff33] backdrop-blur-sm fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-1"
      >
        <div className="bg-yellow-600 p-2 rounded">
          <p className="font-semibold text-lg">{props.prompt}</p>
          <div className="flex justify-around">
            <button
              id={"cancel"}
              onClick={() => setPrompt(false)}
              className="p-2 w-fit rounded hover:text-green-800"
            >
              Cancel
            </button>
            <button
              id={"confirm"}
              onClick={handleConfirm}
              className="p-2 w-fit rounded hover:text-green-800"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
