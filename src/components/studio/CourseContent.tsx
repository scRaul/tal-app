"use client";
import { CourseModule } from "@/lib/models/interfaces";
import SortableList from "../card/SortableList";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import SubmitButton from "../form/SubmitButton";
import { createModule } from "@/actions/creator.module.action";
import StudioModule from "./StudioModule";

interface CourseContentProps {
  courseId: string;
  content: CourseModule[];
}

export default function CourseContent(props: CourseContentProps) {
  const [openModuleForm, setOpenModuleForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [modules, setModules] = useState<CourseModule[]>(props.content);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  function handleDelete(id: number) {
    const updatedModules = modules.filter((module) => module.moduleId !== id);
    setModules(updatedModules);
  }

  function handleCancel() {
    setOpenModuleForm(false);
    setErrorMsg("");
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const titleInput = event.currentTarget.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const title = titleInput ? titleInput.value : "";
    if (title === "") {
      setErrorMsg("title was left blank");
      return;
    }

    if (modules.length > 0) {
      const courseExists = modules.findIndex((module: CourseModule) => {
        return module.title && module.title === title;
      });

      if (courseExists >= 0) {
        setErrorMsg("A course with this title already exists.");
        return;
      }
    }
    try {
      const data = await createModule(title, props.courseId);
      if (data?.message) {
        setErrorMsg(data.message);
        return;
      }
      var courseModule = data.module;
      courseModule.lessons = [];
      const updatedModules = [...modules];
      updatedModules.push(courseModule);
      setModules(updatedModules);

      setErrorMsg("");
      setOpenModuleForm(false);
    } catch (error) {
      setErrorMsg(
        "There appears to be an error on our end. Please try again later."
      );
    }
  }
  function handleReOrder(indexes: number[]) {
    console.log(indexes);
    const updateMod = [...modules];
    for (let i = 0; i < updateMod.length; i++) {
      updateMod[i].index = indexes[i];
    }
    setModules(updateMod);
  }
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 font-medium p-1 flex"
          onClick={() => setOpenModuleForm(true)}
        >
          <Plus />
          <span>Module</span>
        </button>
      </div>
      {openModuleForm && (
        <NewModuleForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          state={errorMsg}
        />
      )}

      <div className="mt-2">
        {/* <SortableList
          className="gap-4 [&>div]:border-b-4 [&>div]:border-r-4 [&>div]:border-[#3020AF] [&>div]:bg-[#3020AF]"
          onReOrder={handleReOrder}
        > */}
        {modules.map((module, index) => (
          <StudioModule
            module={module}
            key={index}
            onDelete={() => handleDelete(module.moduleId)}
          />
        ))}
        {/* </SortableList> */}
      </div>
    </div>
  );
}

interface ModuleProps {
  onCancel: () => void;
  state: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
function NewModuleForm(props: ModuleProps) {
  return (
    <form
      className="rounded border  max-w-xl mx-auto mt-10 pt-3 px-3"
      onSubmit={props.onSubmit}
    >
      <X
        className="hover:bg-[#ffffff33] rounded-full p-1"
        onClick={props.onCancel}
      />
      <div className="flex flex-col px-10 pb-5 gap-3">
        <label htmlFor="title" className="w-full font-bold">
          New Module title:
        </label>
        <input name="title" id="title" type="text" className="input" />
        <SubmitButton
          text={"Create Module"}
          pendingText={"Creating a new module..."}
          className="w-full rounded p-2 bg-green-600 hover:bg-green-400"
        />
        <small className="text-red-500">{props.state}</small>
      </div>
    </form>
  );
}
