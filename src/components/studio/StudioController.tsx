"use client";
import { createCourse } from "@/actions/creator.course.action";
import SubmitButton from "@/components/form/SubmitButton";
import { SearchBar } from "@/components/navigation/Search";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Course } from "@/lib/models/interfaces";
import StudioCourse from "./StudioCourse";
import { intersection, union } from "@/lib/util/set";

interface StudioControllerProps {
  courseData: Course[];
  message?: string;
}
export default function StudioController(props: StudioControllerProps) {
  const [openCourseForm, setOpenCourseForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>(props.courseData);
  const [filter, setFilter] = useState("newest");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(
    props.courseData
  );

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    if (filter == "oldest") setCourses(getOldest());
    else if (filter == "newest") setCourses(getNewest());
    else if (filter == "ascending") setCourses(getAsc());
    else if (filter == "descending") setCourses(getDsc());
    else if (filter == "recent") setCourses(getRec());
  }, [filter]);

  function getOldest() {
    const sortedCourses = [...courses];
    sortedCourses.sort((a: Course, b: Course) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return sortedCourses;
  }
  function getNewest() {
    const sortedCourses = [...courses];
    sortedCourses.sort((a: Course, b: Course) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sortedCourses;
  }
  function getAsc() {
    const sortedCourses = [...courses];
    sortedCourses.sort((a: Course, b: Course) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    return sortedCourses;
  }
  function getDsc() {
    const sortedCourses = [...courses];
    sortedCourses.sort((a: Course, b: Course) => {
      return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
    });
    return sortedCourses;
  }
  function getRec() {
    const sortedCourses = [...courses];
    sortedCourses.sort((a: Course, b: Course) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return sortedCourses;
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilter(event.currentTarget.value);
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

    if (courses.length > 0) {
      const courseExists = courses.findIndex((course: Course) => {
        return course.title && course.title === title;
      });

      if (courseExists >= 0) {
        setErrorMsg("A course with this title already exists.");
        return;
      }
    }
    try {
      const data = await createCourse(title);
      if (data?.message) {
        setErrorMsg(data.message);
        return;
      }
      const newCourses = [...courses];
      newCourses.push(data.course);
      setCourses(newCourses);
      setFilter("newest");
      setErrorMsg("");
      setOpenCourseForm(false);
    } catch (error) {
      setErrorMsg(
        "There appears to be an error on our end. Please try again later."
      );
    }
  }
  function handleCancel() {
    setOpenCourseForm(false);
    setErrorMsg("");
  }

  function SearchCourses(pattern: string) {
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tokens = escapedPattern.split(" ");
    var matched: Course[] = [];
    tokens.forEach((token, index) => {
      const regex = new RegExp(token, "gi");
      const title_matches = courses.filter((course) =>
        course.title.match(regex)
      );
      const descr_matches = courses.filter((course) =>
        course.description.match(regex)
      );
      if (index == 0) {
        matched = union<Course>(descr_matches, title_matches);
      } else {
        matched = intersection<Course>(
          matched,
          union<Course>(title_matches, descr_matches)
        );
      }
    });
    setFilteredCourses(matched);
  }

  return (
    <div className="">
      <div className="flex items-center">
        <SearchBar
          placeholder="Search your courses"
          handleChange={SearchCourses}
        />
        <div>
          <select
            className="input"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="recent">Recently Visited </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="ascending">A-Z</option>
            <option value="descending">Z-A</option>
          </select>
        </div>

        <div className="flex-grow"></div>
        {!openCourseForm && (
          <button
            className="font-bold bg-blue-700  hover:bg-blue-800 h-fit p-2"
            onClick={() => setOpenCourseForm(true)}
          >
            New course
          </button>
        )}
      </div>
      {openCourseForm && (
        <NewCourseForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          state={errorMsg}
        />
      )}
      <div className="flex flex-col gap-4 py-10">
        {filteredCourses.map((course, index) => (
          <StudioCourse course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

interface CourseFormProps {
  onCancel: () => void;
  state: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
function NewCourseForm(props: CourseFormProps) {
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
          New course title:
        </label>
        <input name="title" id="title" type="text" className="input" />
        <SubmitButton
          text={"Create Course"}
          pendingText={"Creating a new course..."}
          className="w-full rounded p-2 bg-green-600 hover:bg-green-400"
        />
        <small className="text-red-500">{props.state}</small>
      </div>
    </form>
  );
}
