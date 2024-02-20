import { getCourseContent } from "@/actions/creator.course.action";
import CourseContent from "@/components/studio/CourseContent";
import { CourseModule } from "@/lib/models/interfaces";

//fetch all modules + lesson(lesson - content);

export default async function ContentPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getCourseContent(params.id);
  const content: CourseModule[] = data?.content.modules || [];

  return (
    <div className="max-w-3xl ">
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2">
        Course Content
      </h1>
      <CourseContent content={content} courseId={params.id} />
    </div>
  );
}
