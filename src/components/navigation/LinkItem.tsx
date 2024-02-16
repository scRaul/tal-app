"use client";
import Link from "next/link";

//external use
export interface LinkItemOpt {
  label: string;
  href?: string;
  icon?: React.ReactElement;
}
interface LinkItemProps {
  label: string;
  href?: string;
  icon?: React.ReactElement;
  className?: string;
  onHoverCallBack?: (label: string) => void;
}

export default function LinkItem(props: LinkItemProps) {
  function handleItemHover(label: string) {
    if (props.onHoverCallBack) {
      props.onHoverCallBack(label);
    }
  }
  return (
    <Link
      href={props.href ? props.href : ""}
      className={`flex items-center w-fit gap-1 ${props.className}`}
      onMouseEnter={() => handleItemHover(props.label)}
    >
      {props.icon ? props.icon : null}
      {props.label}
    </Link>
  );
}
