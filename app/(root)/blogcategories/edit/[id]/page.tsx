"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import ImageUpload from "@/components/ImageUploade";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/ui/ReactQuill";
import axios from "axios";

interface StepSchema {
  [key: string]: yup.SchemaOf<any>;
}

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
  name: yup.string().required("Title is required"),
});

function page({ params }: any) {
  const id = params?.id;
  const router = useRouter();
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [image, setImage] = useState("");
  const [blogcategory, setBlogCategory] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    status: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/v1/blogcategories/details/${id}`)
      .then((response) => {
        setBlogCategory({
          title: response.data[0].title,
          slug: response.data[0].slug,
          description: response.data[0].description,
          image: response.data[0].image,
          status: response.data[0].status,
        });
        // setBlogCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Blog Category:", error);
      });
  }, [id]);

  const handleUpload = (files: File[]) => {
    setImage(files[0]);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setBlogCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let currentStepSchema = stepSchema;

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  const handleStatusChange = (selectedOption: any) => {
    setBlogCategory((prevState) => ({
      ...prevState,
      status: selectedOption.value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", blogcategory.title);
    formData.append("description", blogcategory.description);
    formData.append("status", blogcategory.status);
    try {
      const response = await axios.post(
        `http://localhost:4001/api/v1/blogcategories/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog Category updated successfully:", response);
      router.push("/blogcategories");
    } catch (error) {
      console.error("Error updating Blog Category:", error);
    }
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
        Edit Blog Category
      </h2>
      <div className="col-span-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-8">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
              <div className="col-span-2 mb-4">
                <ImageUpload
                  value={blogcategory.image || (image ? image.image : "")}
                  onUpload={handleUpload}
                />
              </div>

              <Textinput
                type="text"
                placeholder="Title"
                name="title"
                error={errors.title}
                register={register}
                defaultValue={blogcategory.title}
                onChange={handleInputChange}
              />

              <Textinput
                type="text"
                placeholder="Slug"
                name="slug"
                error={errors.slug}
                register={register}
                defaultValue={blogcategory.slug}
                onChange={handleInputChange}
              />

              <div className="col-span-2 ">
                <QuillEditor
                  value={blogcategory.description}
                  onChange={(value) =>
                    setBlogCategory((prevState) => ({
                      ...prevState,
                      description: value,
                    }))
                  }
                />
              </div>

              <div className="col-span-2 ">
                <Select
                  ismulti={false}
                  options={options}
                  placeholder={"Select Status"}
                  onSelectChange={handleStatusChange}
                  selectedValues={{
                    value: blogcategory.status,
                    label:
                      options.find(
                        (option) => option.value === blogcategory.status
                      )?.label || "",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <Button text="Update" className="btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default page;
