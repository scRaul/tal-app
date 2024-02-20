import { CourseModule } from "@/lib/models/interfaces";
import Collapsible from "../card/Collapsible";
import SortableList from "../card/SortableList";
import ConfirmationButton from "../form/ConfirmationButton";
import { deleteModule } from "@/actions/creator.module.action";

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
  return (
    <Collapsible
      label={props.module.title}
      startOpen={true}
      className="bg-[#0C023D] [&>header]:bg-[#3020AF] [&>header]:cursor-pointer [&>header]:text-white "
    >
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
    </Collapsible>
  );
}
