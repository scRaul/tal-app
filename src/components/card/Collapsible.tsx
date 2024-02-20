"use client";
import { ChevronDown, ChevronRight, MousePointer } from "lucide-react";
import { useState } from "react";

interface CollapsibleProps {
  className?: string;
  icon?: React.ReactElement;
  label: string;
  children: React.ReactNode;
  startOpen?: boolean;
}

function Collapsible(props: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState<boolean>(props.startOpen || false);
  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  return (
    <div className={props.className}>
      <header
        className="flex items-center justify-center"
        onClick={toggleCollapsed}
      >
        {props.icon && <div className="mr-1">{props.icon}</div>}

        <div className="font-semibold">{props.label}</div>
        <div className="flex-grow"></div>
        {collapsed ? <ChevronRight /> : <ChevronDown />}
      </header>
      {!collapsed && props.children}
    </div>
  );
}

export default Collapsible;
