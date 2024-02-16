"use client";
import { Course } from "@/lib/models/interfaces";
import Image from "next/image";
import SubmitButton from "../form/SubmitButton";
import { ChangeEvent, useState } from "react";

interface CourseFormProps {
  course: Course;
}

export default function CourseForm(props: CourseFormProps) {
  const [selectImage, setSelectImage] = useState(false);
  const [thumbnail, setThumbnail] = useState(props.course.thumbnail);
  const [title, setTitle] = useState(props.course.title);
  const [description, setDescription] = useState(props.course.description);
  const [published, setPublished] = useState(props.course.published);
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

  return (
    <>
      <label htmlFor="thumbnail">Thumbnail Image: </label>
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

      <form className="py-2">
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
          id="published"
          type="checkbox"
          className=""
          checked={published}
          onChange={(e) => setPublished(e.currentTarget.checked)}
        ></input>
        <label htmlFor="published">{" Is public?"}</label>
        <SubmitButton
          pendingText="Updating.."
          text="Update"
          className="block float-right p-2 mt-5 rounded bg-blue-500"
        />
      </form>
    </>
  );
}
