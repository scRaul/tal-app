import { CourseModule } from "@/lib/models/interfaces";

import SortableList from "../card/SortableList";
import ConfirmationButton from "../form/ConfirmationButton";
import { deleteModule } from "@/actions/creator.module.action";
import { Plus, Wifi, WifiOff, Wrench } from "lucide-react";
import Modal from "../card/Modal";
import { FormEvent, useState } from "react";
import TitleForm from "../form/TitleForm";

interface ModuleProps {
  module: CourseModule;
  onDelete: (id: number) => void;
}

export default function StudioModule(props: ModuleProps) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openRenameMod, setOpenRenameMod] = useState(false);
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
  async function handleTitleChange() {
    //todo
  }
  function handleClick(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
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
              <Modal
                trigger={
                  <Wrench
                    className="p-1"
                    onClick={() => setOpenSettings(!openSettings)}
                  />
                }
                modalOpen={openSettings}
                xOffset={-50}
                yOffset={25}
              >
                <div className="bg-gray-700 py-4 px-1 w-fit rounded">
                  <Modal
                    trigger={
                      <button
                        className="hover:bg-[#ffffff33] p-1"
                        onClick={() => setOpenRenameMod(true)}
                      >
                        Rename
                      </button>
                    }
                    modalOpen={openRenameMod}
                    xOffset={-320}
                    yOffset={-80}
                  >
                    <TitleForm
                      className="w-80 bg-indigo-950 rounded shadow-xl"
                      label={`Rename "${props.module.title}" to:`}
                      submitText={"Change title"}
                      pendingText={"changeing title"}
                      onCancel={() => setOpenRenameMod(false)}
                      state={""}
                      onSubmit={function (
                        event: FormEvent<HTMLFormElement>
                      ): Promise<void> {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </Modal>

                  <div className="mx-auto w-fit">
                    <ConfirmationButton
                      onConfirm={handleDelete}
                      buttonLabel="Delete"
                      prompt="By confirming to delete, all of this module's material will be lost"
                    />
                  </div>
                </div>
              </Modal>
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
    </details>
  );
}
