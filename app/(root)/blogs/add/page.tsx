"use client";

import UploadFile from "@/components/UploadFile";
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import fileInput from "@/components/ui/Fileinput";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/Select";
import QuillEditor from "@/components/ui/ReactQuill";
import ImageUpload from "@/components/ImageUploade";
import PageTitle from "@/components/ui/PageTitle";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import axios from "axios";
import { useDropzone } from "react-dropzone";

interface StepSchema {
  [key: string]: yup.SchemaOf<any>;
}

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function page() {
  const router = useRouter();
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [cat_id, setCatId] = useState("");
  const [image, setImage] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [long_description, setLongDescription] = useState("");
  const [meta_title, setMetaTitle] = useState("");
  const [meta_description, setMetaDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  console.log(selectedImages);

  let currentStepSchema = stepSchema;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  useEffect(() => {
    // Fetch categories data from API
    axios
      .get("http://localhost:4001/api/v1/blogcategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleShortDescriptionChange = (value: any) => {
    setShortDescription(value);
  };

  const handleLongDescriptionChange = (value: any) => {
    setLongDescription(value);
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
    formData.append("cat_id", cat_id);
    formData.append("image", image);
    formData.append("short_description", short_description);
    formData.append("long_description", long_description);
    formData.append("meta_title", meta_title);
    formData.append("meta_description", meta_description);
    formData.append("status", status);

    axios
      .post(`http://localhost:4001/api/v1/blogs/create`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res);
        router.push(`/blogs`);
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  const category = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const options = [
    { value: 1, label: "Published" },
    { value: 0, label: "Draft" },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
      console.log("newImages", newImages);
      setSelectedImages([...selectedImages, ...newImages]);
    },
  });
  const handleSingleImageUpload = (files: any) => {
    const newImages = files.map((file: any) => ({
      name: URL.createObjectURL(file),
      id: selectedImages?.length + 1,
      isFeatured: true,
    }));

    // Filter out the existing images where isFeatured is true
    const updatedImages = selectedImages.filter((image) => !image?.isFeatured);

    // Concatenate the new images with the filtered existing images
    const finalImages = updatedImages.concat(newImages);

    setSelectedImages(finalImages);
    console.log("Uploaded files:", files);
  };

  return (
    <>

      <PageTitle
        title="Add Blog"
        buttontext="Your New Blog"
        link="http://localhost:3000/blogs/add"
        icon={CiCirclePlus}
      />
      {/* <Button className="bg-blue-500">Add</Button> */}
      <div className="col-span-2">
        <form onSubmit={(e) => onHandleSubmit(e)}>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 mt-3">
            <div {...getRootProps()} className="col-span-2 mb-4 dropzone">
              <ImageUpload
                //onUpload={handleUpload}
                onUpload={handleSingleImageUpload}
                multiple={false}
              />
              <div className="flex items-center justify-center p-5">
                {selectedImages.length > 0 && (
                  <>
                    <img
                      src={selectedImages[selectedImages.length - 1]?.name}
                      alt={`Product Image`}
                      className="h-[250px] w-100% p-2 border border-gray-300"
                    />
                    {/* {selectedImages[0].name} */}
                  </>
                )}
              </div>
            </div>

            <div className="col-span-2 mb-4">
              <Textinput
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                error={errors.title}
                register={register}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-2 mb-4">
              <QuillEditor
                value={short_description}
                onChange={handleShortDescriptionChange}
              />
            </div>

            <div className="col-span-2 mb-4">
              <QuillEditor
                value={long_description}
                placeholder="Short Description"
                onChange={handleLongDescriptionChange}
              />
            </div>

            <div className="col-span-2 mb-4">
              <Select
                ismulti={false}
                options={category}
                placeholder={"Select Category"}
                onSelectChange={(option) => setCatId(option.value)}
                selectedValues={categories.find((option) => option.value === cat_id)}
              />
            </div>

            <div className="col-span-2 mb-4">
              <Textinput
                type="text"
                placeholder="Meta Title"
                name="meta_title"
                value={meta_title}
                error={errors.meta_title}
                register={register}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div className="col-span-2 mb-4">
              <Textarea
                placeholder="Meta Description"
                name="meta_description"
                value={meta_description}
                error={errors.meta_description}
                register={register}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="col-span-2 mb-4">
              <Select
                ismulti={false}
                options={options}
                placeholder={"Select Status"}
                onSelectChange={handleStatusChange}
                selectedValues={options.find((option) => option.value === status)}
              />
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
