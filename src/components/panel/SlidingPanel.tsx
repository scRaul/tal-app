"use client";

import { getSlideTransform } from "@/lib/css";
import { useEffect, useState } from "react";
import SidePanel from "./SidePanel";
import TopPanel from "./TopPanel";
import BottomPanel from "./BottomPanel";

interface SlidingProps {
  panelType: "Side" | "Top" | "Bottom";
  position: "absolute" | "fixed";
  isClosed: boolean;
  closeTowards: "left" | "right" | "top" | "bottom";
  zIndex?: number;
  className?: string;
  children: React.ReactNode;
}

export default function SlidingPanel(props: SlidingProps) {
  const [initState, setInitState] = useState<boolean | null>(null);
  const [interaction, setInteraction] = useState(false);
  useEffect(() => {
    if (initState == null) {
      setInitState(props.isClosed);
    }
  }, []);
  useEffect(() => {
    if (!interaction && initState != null) {
      setInteraction(true);
    }
  }, [props.isClosed]);

  const animation = getSlideTransform(
    props.closeTowards,
    props.isClosed,
    interaction
  );

  if (props.panelType == "Side")
    return (
      <SidePanel
        className={`${animation} ${props.className}`}
        position={props.position}
        zIndex={props.zIndex}
      >
        {props.children}
      </SidePanel>
    );
  else if (props.panelType == "Top")
    return (
      <TopPanel
        className={`${animation} ${props.className}`}
        position={props.position}
        zIndex={props.zIndex}
      >
        {props.children}
      </TopPanel>
    );
  else
    return (
      <BottomPanel
        className={`${animation} ${props.className}`}
        position={props.position}
        zIndex={props.zIndex}
      >
        {props.children}
      </BottomPanel>
    );
}
