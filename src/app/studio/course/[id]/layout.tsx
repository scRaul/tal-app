import { getCourseById } from "@/actions/course.action";
import Logo from "@/components/navigation/Logo";
import SidePanel from "@/components/panel/SidePanel";
import { Course } from "@/lib/models/interfaces";
import Link from "next/link";

type CourseData = {
  message?: string;
  course?: Course;
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const data: CourseData = await getCourseById(params.id);
  const render = data.course ? data.course.title : data.message;

  return (
    <>
      <SidePanel position="fixed" className="bg-inherit border left-0">
        <Logo href="/" />
      </SidePanel>
      <header className="pl-20 py-10">
        {data.course ? (
          <Link href={`/studio/course/${params.id}`}>
            <span className="text-xl font-medium text-blue-500 hover:underline">
              {data.course.title}
            </span>
          </Link>
        ) : (
          <p className="text-red-500">{data.message}</p>
        )}
      </header>
      <main className="pl-20">{children}</main>
    </>
  );
}
