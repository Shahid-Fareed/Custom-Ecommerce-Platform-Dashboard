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
import SingleSelect from "@/components/ui/singleSelect";
import QuillEditor from "@/components/ui/ReactQuill";
import ImageUpload from "@/components/ImageUploade";
import axios from "axios";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }
  

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    title: yup.string().required("Name is required"),
  });

function page() {

   
    const [stepNumber, setStepNumber] = useState<number>(0);

    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [is_featured, setFeatured] = useState("");
    const [parent_id, setParentId] = useState("");
    const [meta_title, setMetaTitle] = useState("");
    const [meta_description, setMetaDescription] = useState("");
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

      useEffect(() => {
        // Fetch categories data from API
        axios.get("http://localhost:4001/api/v1/category")
          .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error("Error fetching categories:", error);
          });
      }, []);

  const handleDescriptionChange = (value:any) => {
    setDescription(value);
  };


  const handleUpload = (files: File[]) => {
    setIcon(files[0]);
  };

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption.value); 
  };

  const handleFeaturedChange = (selectedOption1: any) => {
    setFeatured(selectedOption1.value); 
  };

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("icon", icon);
    formData.append("is_featured", is_featured);
    formData.append("parent_id", parent_id);
    formData.append("meta_title", meta_title);
    formData.append("meta_description", meta_description);
    formData.append("status", status);
  
    axios
      .post(
        `http://localhost:4001/api/v1/category/create`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

      const options = [
        { value: 1, label: "Published" },
        { value: 0 , label: "Draft" },
      ];

      const featured = [
        { value: 1, label: "Yes" },
        { value: 0 , label: "No" },
      ];

      const category = categories.map(category => ({
        value: category.id,
        label: category.title
      }));

          
  return (
    <>
      
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
              <button className="mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727"/>
                  <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727"/>
                </svg>
              </button>
              Add Category
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>onHandleSubmit(e)}>
              <div >
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                  
                <div className="col-span-2 mb-4">
                  <ImageUpload
                   onUpload={handleUpload}
                  />            
                </div>

                <div className="col-span-2 ">
                  <Textinput
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    error={errors.title}
                    register={register}
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                </div> 

                    
                <div className="col-span-2 ">
                  <QuillEditor 
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>

                  <SingleSelect
                    options={category}
                    value={categories.find(option => option.value === parent_id)}
                    onChange={option => setParentId(option.value)}
                  />

                  <SingleSelect
                    options={featured}
                    value={featured.find(option => option.value === is_featured)}
                    onChange={handleFeaturedChange}
                  />
 
                <div className="col-span-2 ">
                  <Textinput
                    type="text"
                    placeholder="Meta Title"
                    name="meta_title"
                    value={meta_title}
                    error={errors.meta_title}
                    register={register}
                    onChange={(e)=>setMetaTitle(e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <Textarea
                    placeholder="Meta Description"
                    name="meta_description"
                    value={meta_description}
                    error={errors.meta_description}
                    register={register}
                    onChange={(e)=>setMetaDescription(e.target.value)}
                  />
                </div>

                <div className="col-span-2 mb-4">
                  <SingleSelect
                    options={options}
                    value={options.find(option => option.value === status)}
                    onChange={handleStatusChange}
                  />
                </div>
            </div>

            
              </div>
              <div>
              <Button
                text= "submit"
                className="btn-primary"
                type="submit"
              />
            </div>
            </form>
            </div>
         
    </>
  );
}

export default page;
