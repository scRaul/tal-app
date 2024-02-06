interface HeaderProps {
  className?: string;
  children: React.ReactNode;
}
export default function Header(props: HeaderProps) {
  return (
    <header
      className={`fixed flex p-2 gap-1 w-full min-h-fit items-center ${props.className}`}
    >
      {props.children}
    </header>
  );
}
