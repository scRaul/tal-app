import { getMyCourses } from "@/actions/course.action";
import MyCourses from "@/components/courses/MyCourses";
import CourseList from "@/components/courses/MyCourses";

export default async function StuidoPage() {
  const data = await getMyCourses();

  return (
    <main className="max-w-5xl">
      <header className="mt-20">
        <h1 className="text-3xl md:text-6xl font-mono font-bold mb-4">
          Courses
        </h1>
      </header>
      <MyCourses courseList={data} />
    </main>
  );
}
