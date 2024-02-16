interface PanelProps {
  className?: string;
  children: React.ReactNode;
  position: "absolute" | "fixed";
  zIndex?: number;
}
export default function SidePanel(props: PanelProps) {
  return (
    <aside
      className={`h-full flex flex-col w-fit overflow-y-auto ${props.className} ${props.position}`}
      style={{ zIndex: props.zIndex ? props.zIndex : 100 }}
    >
      {props.children}
    </aside>
  );
}
