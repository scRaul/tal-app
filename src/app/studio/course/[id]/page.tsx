import { getCourseById } from "@/actions/creator.course.action";
import EditCourseForm from "@/components/studio/EditCourseForm";
import { Course } from "@/lib/models/interfaces";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getCourseById(params.id);
  const course: Course = data.course;
  return (
    <div className="max-w-3xl ">
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2">
        Edit Course Information
      </h1>
      <EditCourseForm course={course} />
    </div>
  );
}
