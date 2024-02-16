import CourseContent from "@/components/courses/CourseContent";
import CourseForm from "@/components/courses/CourseForm";
import { Course, Lesson, Module } from "@/lib/models/interfaces";

export default function TestPage() {
  return (
    <div className="pt-5 max-w-3xl mx-auto">
      {/* <h1 className="text-2xl md:text-4xl text-blue-500 my-2">
        Edit Course Information
      </h1>
      <CourseForm course={course} /> */}

      <h1 className="text-2xl md:text-4xl text-blue-500 my-2">
        {course.title}
      </h1>
      <CourseContent content={content} />
    </div>
  );
}

const course: Course = {
  courseId: 1,
  creatorId: 1,
  title: "C++ Introduction",
  description: "Intro to C++",
  published: false,
  thumbnail:
    "https://www.freecodecamp.org/news/content/images/2022/11/laptop-gfe4d4bfc0_1280.png",
};

const module1: Module = {
  moduleId: 1,
  courseId: 1,
  title: "Data Types",
  index: 1,
  published: false,
};
const module2: Module = {
  moduleId: 2,
  courseId: 1,
  title: "Control Flow",
  index: 2,
  published: false,
};
const lesson1: Lesson = {
  lessonId: 1,
  moduleId: 1,
  title: "Number types",
  content: "int double float",
  published: false,
  index: 1,
};
const lesson2: Lesson = {
  lessonId: 2,
  moduleId: 1,
  title: "Text types",
  content: "string char",
  published: false,
  index: 2,
};
const lesson3: Lesson = {
  lessonId: 3,
  moduleId: 2,
  title: "Branching",
  content: "if else ?",
  published: false,
  index: 1,
};
const content = [
  {
    module: module1,
    lessons: [lesson1, lesson2],
  },
  {
    module: module2,
    lessons: [lesson3],
  },
];
