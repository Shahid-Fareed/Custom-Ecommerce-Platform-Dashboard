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
import { useRouter } from 'next/navigation';
import axios from "axios";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }
  

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

function page() {

   
    const [stepNumber, setStepNumber] = useState<number>(0);
    const router = useRouter();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [is_primary, setPrimary] = useState("");
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


  const handleUpload = (files: File[]) => {
    setImage(files[0]);
  };

  const handlePrimaryChange = (selectedOption: any) => {
    setPrimary(selectedOption.value); 
  };

  const handleStatusChange = (selectedOption: any) => {
    setStatus(selectedOption.value); 
  };

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    

    let formData = new FormData();
    formData.append("name", name);
    formData.append("url", url);
    formData.append("image", image);
    formData.append("is_primary", is_primary);
    formData.append("status", status);
  
    axios
      .post(
        `http://localhost:4001/api/v1/banner/create`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push('/banners');
      })
      .catch((err) => {
        console.log(err);
      });
  };

      const options = [
        { value: 1, label: "Published" },
        { value: 0 , label: "Draft" },
      ];

      const primary = [
        { value: 1, label: "Yes" },
        { value: 0 , label: "No" },
      ];

      
      
  return (
    <>
      
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
              <button className="mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727"/>
                  <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727"/>
                </svg>
              </button>
              Add Banner
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>onHandleSubmit(e)}>
              <div className="mb-8">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                  
                <div className="col-span-2 mb-4">
                  <ImageUpload
                   onUpload={handleUpload}
                  />            
                </div>


                  <Textinput
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    error={errors.name}
                    register={register}
                    onChange={(e)=>setName(e.target.value)}
                  />

                  <Textinput
                    type="text"
                    placeholder="URL"
                    name="url"
                    value={url}
                    error={errors.url}
                    register={register}
                    onChange={(e)=>setUrl(e.target.value)}
                  />

                  <Select 
                    ismulti={false}
                    options={primary}
                    placeholder={"Is Primary?"}
                    onSelectChange={handlePrimaryChange}
                    selectedValues={primary.find(pri => pri.value === is_primary)}
                  />

                  <Select 
                    ismulti={false}
                    options={options}
                    placeholder={"Select Status"}
                    onSelectChange={handleStatusChange}
                    selectedValues={options.find(option => option.value === status)}
                  />
 
                  
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
