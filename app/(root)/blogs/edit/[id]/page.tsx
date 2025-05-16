"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import ImageUpload from "@/components/ImageUploade";
import QuillEditor from "@/components/ui/ReactQuill";
import Textarea from "@/components/ui/Textarea";
import { useRouter } from "next/navigation";
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
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("");
    const [cat_id, setCategoryId] = useState(""); // State to track the selected category ID
    const [blogs, setBlogs] = useState({
        title: '',
        slug: '',
        short_description: '',
        long_description: '',
        image: '',
        meta_title: '',
        meta_description: '',
        status: '',
        date: '',
        cat_id: ''
    });
    
    useEffect(() => {
        axios.get(`http://localhost:4001/api/v1/blogs/details/${id}`)
          .then(response => {
            setBlogs(response.data);
            // Set the initial category ID fetched from the server
            setCategoryId(response.data.cat_id);
          })
          .catch(error => {
            console.error('Error fetching Blog:', error);
          });
    }, [id]);

    const handleUpload = (files: File[]) => {
        setImage(files[0]);
    };

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setBlogs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStatusChange = (selectedOption: any) => {
      setBlogs(prevState => ({
        ...prevState,
        status: selectedOption.value
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

    useEffect(() => {
        // Fetch categories data from API
        axios.get("http://localhost:4001/api/v1/blogcategories")
          .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error("Error fetching categories:", error);
          });
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", blogs.title);
        formData.append("slug",blogs.slug);
        formData.append("short_description", blogs.short_description);
        formData.append("long_description", blogs.long_description);
        formData.append("date", blogs.date);
        formData.append("status", blogs.status);
        formData.append("cat_id", cat_id); 
        
        try {
          const response = await axios.post(
            `http://localhost:4001/api/v1/blogs/update/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Blog updated successfully:", response);
          router.push("/blogs");
        } catch (error) {
          console.error("Error updating Pattern:", error);
        }
    };
      
    const category = categories.map(category => ({
        value: category.id,
        label: category.title
    }));

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
                Edit Blogs
            </h2>
            <div className="col-span-2">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="mb-8">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                            <div className="col-span-2 mb-4">
                                <ImageUpload
                                    value={blogs.image || (image ? image.image : '')}
                                    onUpload={handleUpload}
                                />            
                            </div>
                              <Textinput
                                type="text"
                                placeholder="Title"
                                name="title"
                                error={errors.title}
                                register={register}
                                defaultValue={blogs.title}
                                onChange={handleInputChange}
                              />

                              <Textinput
                                type="text"
                                placeholder="Slug"
                                name="slug"
                                error={errors.slug}
                                register={register}
                                defaultValue={blogs.slug}
                                onChange={handleInputChange}
                              />

                              <div className="col-span-2 ">
                                <QuillEditor 
                                 value={blogs.short_description}
                                 onChange={value => setBlogs(prevState => ({ ...prevState, short_description: value }))}
                                />
                              </div>

                              <div className="col-span-2 ">
                                <QuillEditor 
                                 value={blogs.long_description}
                                 onChange={value => setBlogs(prevState => ({ ...prevState, long_description: value }))}
                                />
                              </div>

                              <div className="col-span-2 ">
                                <Select
                                    options={category}
                                    value={category.find(option => option.value === cat_id)}
                                    onChange={option => setCategoryId(option.value)}
                                />
                                </div>


                              <div className="col-span-2 ">
                              <Textinput
                                type="text"
                                placeholder="Meta Title"
                                name="meta_title"
                                error={errors.meta_title}
                                register={register}
                                defaultValue={blogs.meta_title}
                                onChange={handleInputChange}
                              />
                              </div>

                              <div className="col-span-2 ">
                              <Textarea
                               
                                placeholder="Meta Description"
                                name="meta_description"
                                error={errors.meta_description}
                                register={register}
                                defaultValue={blogs.meta_description}
                                onChange={handleInputChange}
                              />
                              </div>

                              <div className="col-span-2 ">
                              <Select
                                options={options}
                                value={{
                                value: blogs.status,
                                label:
                                     options.find((option) => option.value === blogs.status)
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
