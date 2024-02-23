import { getCourseById } from "@/actions/creator.course.action";
import LinkItem, { LinkItemOpt } from "@/components/navigation/LinkItem";
import SidePanel from "@/components/panel/SidePanel";
import {
  BarChartBig,
  Info,
  Keyboard,
  LibraryBig,
  NotebookText,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const data = await getCourseById(params.id);
  const course = data.course;
  const studioLinks: LinkItemOpt[] = [
    { label: "Studio", href: "/studio", icon: <LibraryBig /> },

    {
      label: "Course Info",
      href: `/studio/course/${params.id}`,
      icon: <Info />,
    },

    {
      label: "Content",
      href: `/studio/course/${params.id}/content`,
      icon: <NotebookText />,
    },

    {
      label: "Stats",
      href: `/studio/course/${params.id}/stats`,
      icon: <BarChartBig />,
    },

    {
      label: "Demo",
      href: `/studio/course/${params.id}/demo`,
      icon: <Keyboard />,
    },
  ];

  return (
    <>
      <header className="md:pl-24 pt-10">
        {course && (
          <Link href={`/studio/course/${params.id}`}>
            <h1 className="text-xl font-medium hover:underline">
              <span className="text-[#ffffff33]">Course:</span>
              <span className=""> {course.title}</span>
            </h1>
          </Link>
        )}
      </header>
      <main className="md:pl-24">{children}</main>
      <SidePanel
        position="fixed"
        className="left-0 top-0 bg-inherit shadow-lg shadow-blue-500 text-[#ffffff55] w-20 hidden md:block"
      >
        {studioLinks.map((link, index) => (
          <LinkItem
            className="flex-col border-b mt-5 p-5 hover:text-blue-500 w-full"
            label={link.label}
            href={link.href}
            icon={link.icon}
            key={index}
          />
        ))}
      </SidePanel>
    </>
  );
}
