import { Lesson, Module } from "@/lib/models/interfaces";
import ModuleContainer from "../modules/ModuleContainer";

type Content = {
  module: Module;
  lessons: Lesson[];
};
interface CourseContentProps {
  content: Content[];
}

export default function CourseContent(props: CourseContentProps) {
  function handleDragEnd() {}
  return (
    <div>
      <button className="bg-blue-500 font-medium p-1">Add a module</button>
      <div className="mt-10">
        {props.content.map((group, index) => (
          <ModuleContainer
            module={group.module}
            lessons={group.lessons}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
