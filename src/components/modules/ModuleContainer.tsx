import { Lesson, Module } from "@/lib/models/interfaces";
import Collapsible from "../card/Collapsible";
import { GripHorizontal } from "lucide-react";

interface ModuleProps {
  module: Module;
  lessons: Lesson[];
  index: number;
}

export default function ModuleContainer(props: ModuleProps) {
  return (
    <Collapsible
      label={props.module.title}
      icon={<GripHorizontal className="text-gray-500" />}
      startOpen={true}
      headerClassName="bg-[#ffffff22] text-xl p-2 cursor-pointer"
      className="shadow-lg shadow-black my-5 "
    >
      <div className="p-1 pb-3">
        {props.lessons.map((lesson, index) => (
          <div
            className="p-2 border border-[#ffffff33] my-2 flex items-center cursor-pointer"
            key={index}
          >
            <GripHorizontal className="text-gray-500" size={20} />
            <p className="pl-4">{lesson.title}</p>
          </div>
        ))}

        <div className="flex">
          <div className="flex-grow"></div>
          <button className="bg-blue-500 font-medium p-1">Add a Lesson</button>
        </div>
      </div>
    </Collapsible>
  );
}
