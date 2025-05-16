"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation';
import axios from "axios";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }
  

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    title: yup.string().required("Title is required"),
  });

function page({params}:any) {
   
    const id  = params?.id;
    const router = useRouter();
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [attribute, setAttribute] = useState({
        name: '',
        type: '',
      });
    useEffect(() => {
        axios.get(`http://localhost:4001/api/v1/attribute/details/${id}`)
          .then(response => {
            setAttribute(response.data);
          })
          .catch(error => {
            console.error('Error fetching Attribute:', error);
          });
      }, [id]);

      const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setAttribute(prevState => ({
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

    

  const handleSubmit = (event:any) => {
    event.preventDefault();
    axios.post(`http://localhost:4001/api/v1/attribute/update/${id}`, attribute)
      .then(response => {
        console.log('Attribute updated successfully:', response);
        router.push('/attribute');
      })
      .catch(error => {
        console.error('Error updating Attribute:', error);
      });
  };


  return (
    <>
      
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
              <button className="mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727"/>
                  <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727"/>
                </svg>
              </button>
              Edit Attribute
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-8">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                  
                  <Textinput
                    type="text"
                    placeholder="Name"
                    name="name"
                    error={errors.name}
                    register={register}
                    defaultValue={attribute.name}
                    onChange={handleInputChange}
                  />

                   <Textinput
                    type="text"
                    placeholder="Type"
                    name="type"
                    error={errors.type}
                    register={register}
                    defaultValue={attribute.type}
                    onChange={handleInputChange}
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
