import Link from "next/link";

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactElement;
}
interface NavMenuProps {
  className?: string;
  itemClassName?: string;
  navItems: NavItem[];
}
export default function NavMenu(props: NavMenuProps) {
  return (
    <nav className={`h-fit ${props.className}`}>
      {props.navItems.map((link, index) => (
        <div
          key={index}
          className={`rounded-md p-3 cursor-pointer  ${props.itemClassName}`}
        >
          <Link href={link.href} className="flex items-center ">
            {link.icon ? link.icon : null}
            {link.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
