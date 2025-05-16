"use client";

import UploadFile from "@/components/UploadFile";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import fileInput from "@/components/ui/Fileinput";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import QuillEditor from "@/components/ui/ReactQuill";
import ImageUpload from "@/components/ImageUploade";
import { useRouter } from "next/navigation";
import axios from "axios";

interface StepSchema {
  [key: string]: yup.SchemaOf<any>;
}

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
  title: yup.string().required("Name is required"),
});

function page() {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [descriptionList, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  let currentStepSchema = stepSchema;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  const handleDescriptionChange = (value: any) => {
    setDescription(value);
  };

  const handleUpload = (files: File[]) => {
    setImage(files[0]);
  };

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption.value);
  };

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", descriptionList);
    formData.append("image", image);
    formData.append("status", status);

    axios
      .post(`http://localhost:4001/api/v1/blogcategories/create`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
        router.push("/blogcategories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = [
    { value: 1, label: "Published" },
    { value: 0, label: "Draft" },
  ];

  return (
    <>
      <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
        <button className="mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z"
              fill="#272727"
            />
            <path
              d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z"
              fill="#272727"
            />
          </svg>
        </button>
        Add Blog Category
      </h2>
      <div className="col-span-2">
        <form onSubmit={(e) => onHandleSubmit(e)}>
          <div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
              <div className="col-span-2 mb-4">
                <ImageUpload onUpload={handleUpload} />
              </div>

              <Textinput
                type="text"
                placeholder="Category Name"
                name="title"
                value={title}
                error={errors.title}
                register={register}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Select
                ismulti={false}
                options={options}
                placeholder={"Select Status"}
                onSelectChange={handleStatusChange}
                selectedValues={options.find((option) => option.value === status)}
              />

              <div className="col-span-2 mb-16">
                <QuillEditor
                  value={descriptionList}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
          </div>
          <div>
            <Button text="submit" className="btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
