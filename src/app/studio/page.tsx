import { getMyCourses } from "@/actions/creator.course.action";
import StudioController from "@/components/studio/StudioController";
import { Course } from "@/lib/models/interfaces";

export default async function StuidoPage() {
  const data = await getMyCourses();
  const courseData: Course[] = data?.courses || [];
  return (
    <main className="max-w-5xl">
      <header className="mt-20">
        <h1 className="text-3xl md:text-6xl font-mono font-bold mb-4">
          Courses
        </h1>
      </header>
      <StudioController courseData={courseData} message={data?.message} />
    </main>
  );
}
