import { Course } from "@/lib/models/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CoursePreviewProps {
  course: Course;
}

export default function StudioCourse(props: CoursePreviewProps) {
  const [hovering, setHovering] = useState(false);
  const course = props.course;

  return (
    <div className="flex border border-[#ffffff33]" key={course.courseId}>
      <Image
        src={course.thumbnail}
        width={100}
        height={75}
        alt="course thumbnail"
      />
      <Link
        href={`/studio/course/${course.courseId}/content`}
        className="pl-4 p-2 cursor-pointer relative flex-grow"
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
      >
        <p className="font-bold">{course.title}</p>
        <p className="font-light">{course.description}</p>
        {hovering && (
          <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
            <span className="text-blue-500 font-xl font-extrabold ">
              Edit/Manage Course
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}
