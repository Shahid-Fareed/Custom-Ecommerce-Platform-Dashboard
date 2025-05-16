"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import SingleSelect from "@/components/ui/SingleSelect";
import ImageUpload from "@/components/ImageUploade";
import QuillEditor from "@/components/ui/ReactQuill";
import Textarea from "@/components/ui/Textarea";
import axios from "axios";
import { MdSystemSecurityUpdateWarning } from "react-icons/md";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    name: yup.string().required("Title is required"),
  });

function page({params}:any) {
   
     // Extracting the first id from the URL params
     const urlParts = window.location.pathname.split('/');
     const firstId = urlParts[urlParts.length - 4];
 
     const s_id =  firstId;

     

     const id = params?.id;
    
    const [stepNumber, setStepNumber] = useState<number>(0);
    
    const [image, setImage] = useState("");
    const [page, setPage] = useState({
        title: '',
        image:'',
        description: '',
        content: '',
        status: '',
        p_id: '',
      });
    useEffect(() => {
        axios.get(`http://localhost:4001/api/v1/blocks/details/${id}`)
          .then(response => {
            setPage(response.data);
          })
          .catch(error => {
            console.error('Error fetching Section:', error);
          });
      }, [id]);

      const handleUpload = (files: File[]) => {
        setImage(files[0]);
      };

      const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setPage(prevState => ({
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
        setPage(prevState => ({
          ...prevState,
          status: selectedOption.value
        }));
      };

      

      const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", page.title);
        formData.append("s_id",s_id);
        formData.append("description", page.description);
        formData.append("content", page.content);
        formData.append("status", page.status);
        try {
          const response = await axios.post(
            `http://localhost:4001/api/v1/blocks/update/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Ensure correct content type
              },
            }
          );
          console.log("Block updated successfully:", response);
        } catch (error) {
          console.error("Error updating Page:", error);
        }
      };
      

      const options = [
        { value: 1, label: "Published" },
        { value: 0 , label: "Draft" },
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
              Edit Section
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-8">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                
                <div className="col-span-2 mb-4">
                  <ImageUpload
                   value= {page.image || (image ? image.image : '')}
                   onUpload={handleUpload}
                  />            
                </div>
                 
                <div className="col-span-2 ">
                  <Textinput
                    type="text"
                    placeholder="Title"
                    name="title"
                    error={errors.title}
                    register={register}
                    defaultValue={page.title}
                    onChange={handleInputChange}
                  />
                </div> 


                  <div className="col-span-2 ">
                    <QuillEditor 
                    value={page.description}
                    onChange={value => setPage(prevState => ({ ...prevState, description: value }))}
                    />
                  </div>

                  <div className="col-span-2 ">
                    <QuillEditor 
                    value={page.content}
                    onChange={value => setPage(prevState => ({ ...prevState, content: value }))}
                    />
                  </div>

                  

                  

                  <div className="col-span-2 ">
                     <SingleSelect
                      options={options}
                      value={{
                        value: page.status,
                        label:
                          options.find((option) => option.value === page.status)
                            ?.label || "",
                      }}
                      onChange={handleStatusChange}
                    />
                  </div>
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
