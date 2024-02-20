"use client";
import { Course } from "@/lib/models/interfaces";
import Image from "next/image";
import SubmitButton from "../form/SubmitButton";
import { useEffect, useState } from "react";
import ConfirmationButton from "../form/ConfirmationButton";
import { deleteCourse, updateCourse } from "@/actions/creator.course.action";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  course: null,
};
interface CourseFormProps {
  course: Course;
}

export default function EditCourseForm(props: CourseFormProps) {
  const [state, formAction] = useFormState(updateCourse, initialState);
  const [selectImage, setSelectImage] = useState(false);
  const [thumbnail, setThumbnail] = useState(props.course.thumbnail);
  const [title, setTitle] = useState(props.course.title);
  const [description, setDescription] = useState(props.course.description);
  const [isPublic, setIsPublic] = useState(props.course.isPublic);

  useEffect(() => {
    if (state.course) {
      setThumbnail(state.course.thumbnail);
      setTitle(state.course.title);
      setDescription(state.course.description);
      setIsPublic(state.course.isPublic);
    }
  }, [state]);
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.currentTarget;
    switch (name) {
      case "thumbnail":
        setThumbnail(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  }
  async function handleConfirm() {
    const id = props.course.courseId;
    try {
      await deleteCourse(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <label htmlFor="thumbnail" className="mt-10">
        Thumbnail Image:{" "}
      </label>
      <div className="flex justify-center items-center relative">
        <Image
          src={thumbnail}
          width={200}
          height={150}
          alt="thumbnail image"
          className={`${selectImage && "blur"}`}
          onClick={() => setSelectImage(true)}
        />
        {selectImage && (
          <form className="absolute ">
            <input
              type="file"
              className="input"
              name="thumbnail"
              accept="image/png, image/jpeg"
            />
            <button
              type="reset"
              className="bg-red-500 p-1 rounded mt-1 shadow-md shadow-black"
              onClick={() => setSelectImage(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <form className="py-2" action={formAction}>
        <input type="hidden" name="thumbnail" value={thumbnail} />
        <input type="hidden" name="courseId" value={props.course.courseId} />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          className="input"
          value={title}
          onChange={handleChange}
        ></input>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="input"
          value={description}
          onChange={handleChange}
        ></textarea>{" "}
        <input
          id="isPublic"
          name="isPublic"
          type="checkbox"
          className=""
          checked={isPublic}
          onChange={(e) => setIsPublic(e.currentTarget.checked)}
        ></input>
        <label htmlFor="isPublic">{" Is public?"}</label>
        <SubmitButton
          pendingText="Updating.."
          text="Update"
          className=" p-2 rounded bg-blue-500 block w-full"
        />
        {state?.message && <p>{state.message}</p>}
      </form>
      <ConfirmationButton
        className=" [&>#button]:bg-red-500  [&>dialog]:bg-slate-400"
        onConfirm={handleConfirm}
        buttonLabel="Delete"
        prompt="By confirming to delete, all of this course's material will be lost"
      />
    </>
  );
}
