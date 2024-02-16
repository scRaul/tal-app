"use client";
import { createCourse } from "@/actions/course.action";
import SubmitButton from "@/components/form/SubmitButton";
import { SearchBar } from "@/components/navigation/Search";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Course } from "@/lib/models/interfaces";
import MyCourseList from "./MyCourseList";

const initialState = {
  message: "",
};
interface CourseListProps {
  courseList: {
    message?: string;
    courses?: Course[];
  };
}
export default function MyCourses(props: CourseListProps) {
  const [newCourse, setNewCourse] = useState(false);
  const [state, formAction] = useFormState(createCourse, initialState);

  return (
    <>
      <div className="flex items-center">
        <SearchBar placeholder="Search your courses" />

        <div className=" p-1">
          <select className="input">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="ascending">A-Z</option>
            <option value="descending">Z-A</option>
          </select>
        </div>

        <div className="flex-grow"></div>
        {!newCourse && (
          <button
            className="font-bold bg-blue-700  hover:bg-blue-800 h-fit p-2"
            onClick={() => setNewCourse(true)}
          >
            New course
          </button>
        )}
      </div>
      {newCourse && (
        <form
          className="rounded border  max-w-xl mx-auto mt-10 pt-3 px-3"
          action={formAction}
        >
          <X
            className="hover:bg-[#ffffff33] rounded-full p-1"
            onClick={() => {
              setNewCourse(false);
            }}
          />
          <div className="flex flex-col px-10 pb-5 gap-3">
            <label htmlFor="title" className="w-full font-bold">
              New course title:
            </label>
            <input name="title" id="title" type="text" className="input" />
            <SubmitButton
              text={"Create Course"}
              pendingText={"starting a new course..."}
              className="w-full rounded p-2 bg-green-600 hover:bg-green-400"
            />
            {state && <small>{state.message}</small>}
          </div>
        </form>
      )}
      {props.courseList.message && <p>{props.courseList.message}</p>}
      {props.courseList.courses && (
        <div className="mt-20">
          <MyCourseList courseList={props.courseList.courses} />
        </div>
      )}
    </>
  );
}
