"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import ImageUpload from "@/components/ImageUploade";
import { useRouter } from 'next/navigation';
import axios from "axios";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    name: yup.string().required("Title is required"),
  });

function page({params}:any) {
   
    const id  = params?.id;
    const router = useRouter();
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [image, setImage] = useState("");
    const [banner, setBanner] = useState({
        name: '',
        url: '',
        image:'',
        is_primary: '',
        status: ''
      });
    useEffect(() => {
        axios.get(`http://localhost:4001/api/v1/banner/details/${id}`)
          .then(response => {
            setBanner(response.data);
          })
          .catch(error => {
            console.error('Error fetching Attribute Type:', error);
          });
      }, [id]);

      const handleUpload = (files: File[]) => {
        setImage(files[0]);
      };

      const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setBanner(prevState => ({
          ...prevState,
          [name]: value
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
        setBanner(prevState => ({
          ...prevState,
          status: selectedOption.value
        }));
      };

      const handlePrimaryChange = (selectedOption: any) => {
        setBanner(prevState => ({
          ...prevState,
          is_primary: selectedOption.value
        }));
      };

      const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image); // Append the new image directly
        formData.append("name", banner.name);
        formData.append("is_primary", banner.is_primary);
        formData.append("url", banner.url);
        formData.append("status", banner.status);
        try {
          const response = await axios.post(
            `http://localhost:4001/api/v1/banner/update/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Ensure correct content type
              },
            }
          );
          console.log("Banner updated successfully:", response);
          router.push('/banners');
        } catch (error) {
          console.error("Error updating Banner:", error);
        }
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
              Edit Banner
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-8">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                
                <div className="col-span-2 mb-4">
                  <ImageUpload
                   value= {banner.image || (image ? image.image : '')}
                   onUpload={handleUpload}
                  />            
                </div>
                 
                  <Textinput
                    type="text"
                    placeholder="Title"
                    name="name"
                    error={errors.name}
                    register={register}
                    defaultValue={banner.name}
                    onChange={handleInputChange}
                  />

                  <Textinput
                    type="text"
                    placeholder="URL"
                    name="url"
                    error={errors.url}
                    register={register}
                    defaultValue={banner.url}
                    onChange={handleInputChange}
                  />

                  <Select 
                    ismulti={false}
                    options={primary}
                    placeholder={"Is Primary?"}
                    onSelectChange={handlePrimaryChange}
                    selectedValues={{
                        value: banner.is_primary,
                        label:
                          primary.find((option) => option.value === banner.is_primary)
                            ?.label || "",
                    }}
                  />

                  <Select 
                    ismulti={false}
                    options={options}
                    placeholder={"Select Status"}
                    onSelectChange={handleStatusChange}
                    selectedValues={{
                      value: banner.status,
                      label:
                        options.find((option) => option.value === banner.status)
                          ?.label || "",
                    }}
                  />
                   
                  </div>

            
              </div>
              <div>
              <Button
                text= "Update"
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
