"use client";
import { Search, X } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  buttonColor?: string;
  handleChange?: (text: string) => void;
}
export function SearchBar(props: SearchBarProps) {
  return (
    <search className={`flex ${props.className}`}>
      <SearchInput
        className="border rounded-l-full focus-within:border-blue-700 flex-grow pl-4"
        placeholder={props.placeholder}
        handleChange={props.handleChange}
      />
      <div
        className={`flex items-center justify-center border pr-4 p-2 rounded-r-full hover:bg-[#ffffff33] bg-[${props.buttonColor}]`}
      >
        <Search strokeWidth={1} />
      </div>
    </search>
  );
}

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  xClassName?: string;
  strokeWidth?: number;
  handleChange?: (text: string) => void;
}
export function SearchInput(props: SearchInputProps) {
  const [value, setValue] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const result = event.currentTarget.value;
    setValue(result);
    if (props.handleChange) {
      props.handleChange(result);
    }
  }
  return (
    <div
      className={`flex items-center justify-center ${props.className}`}
      tabIndex={0}
    >
      <input
        type="text"
        className="focus:outline-none bg-transparent w-full"
        placeholder={props.placeholder ? props.placeholder : "Search"}
        value={value}
        onChange={handleChange}
        autoFocus
      />

      {value.length > 0 && (
        <X
          strokeWidth={props.strokeWidth ? props.strokeWidth : 1}
          className={`rounded-full p-1 hover:bg-[#ffffff33] ${props.xClassName}`}
          onClick={() => setValue("")}
        />
      )}
    </div>
  );
}
