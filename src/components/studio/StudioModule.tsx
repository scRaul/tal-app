import { CourseModule } from "@/lib/models/interfaces";
import Collapsible from "../card/Collapsible";
import SortableList from "../card/SortableList";
import ConfirmationButton from "../form/ConfirmationButton";
import { deleteModule } from "@/actions/creator.module.action";
import {
  Plus,
  ToggleLeft,
  ToggleRight,
  Wifi,
  WifiOff,
  Wrench,
} from "lucide-react";

interface ModuleProps {
  module: CourseModule;
  onDelete: (id: number) => void;
}

export default function StudioModule(props: ModuleProps) {
  async function handleDelete() {
    try {
      const result = await deleteModule(props.module.moduleId);
      if (result.message === "deleted") {
        props.onDelete(props.module.moduleId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleClick(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    console.log("div");
    event.stopPropagation();
    event.preventDefault();
  }
  return (
    <details open={true} className="w-full relative border-dashed border px-2">
      <summary className="relative" onClick={() => console.log("summary")}>
        <span className="font-bold text-lg">{props.module.title}</span>
        <span className="absolute t-0 right-0">
          <div className="flex gap-4 " onClick={handleClick}>
            <div
              title="make it public"
              className="rounded-md hover:bg-[#ffffff33]"
            >
              {props.module.isPublic ? (
                <Wifi className=" p-1" />
              ) : (
                <WifiOff className=" p-1" />
              )}
            </div>
            <div
              title="add a lesson entry"
              className="rounded-md hover:bg-[#ffffff33]"
            >
              <Plus className="p-1" />
            </div>
            <div title="settings" className="rounded-md hover:bg-[#ffffff33]">
              <Wrench className="p-1" />
            </div>
          </div>
        </span>
      </summary>
      <SortableList className="gap-4 p-4 [&>div]:bg-white">
        {props.module.lessons.map((lesson, index) => (
          <div className="pl-1" key={index}>
            <p className="text-lg text-black">{lesson.title}</p>
          </div>
        ))}
      </SortableList>
      <div className="flex justify-between items-center py-3 px-2">
        <button className="bg-blue-500 rounded  p-2">Add a Lesson</button>
        <ConfirmationButton
          className=" [&>#button]:bg-red-500  [&>dialog]:bg-slate-400"
          onConfirm={handleDelete}
          buttonLabel="Delete"
          prompt="By confirming to delete, all of this module's material will be lost"
        />
      </div>
    </details>
  );
}
