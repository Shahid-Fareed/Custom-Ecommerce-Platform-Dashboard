"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import axios from "axios";


interface StepSchema {
    [key: string]: yup.SchemaOf<any>;
  }
  
  

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
    // name: yup.string().required("Name is required"),
  });

function page() {

   
    const [stepNumber, setStepNumber] = useState<number>(0);

    const [min_quantity, setMinQuantity] = useState("");
    const [max_quantity, setMaxQuantity] = useState("");

    let currentStepSchema = stepSchema;

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(currentStepSchema),
        mode: "all",
      });




  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    

    let formData = new FormData();
    formData.append("min_quantity", min_quantity);
    formData.append("max_quantity", max_quantity);
  
    axios
      .post(
        `http://localhost:4001/api/v1/priceslab/create`,
        formData,
        {
          headers: {
            "Content-Type": `application/json`,
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

      
      
  return (
    <>
      <div className="wrapper grid grid-cols-6">
        <SideBar />
        <div className="col-start-2 col-span-5">
          <TopBar />
          <main className="grid grid-cols-1 lg:grid-cols-2 p-10">
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
              <button className="mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                  <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727"/>
                  <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727"/>
                </svg>
              </button>
              Add Price Slab
            </h2>
            <div className="col-span-2">
            <form onSubmit={(e)=>onHandleSubmit(e)}>
              <div className= "mb-8">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">

                  <Textinput
                    type="text"
                    placeholder="Min Quantity"
                    name="min_quantity"
                    value={min_quantity}
                    error={errors.min_quantity}
                    register={register}
                    onChange={(e)=>setMinQuantity(e.target.value)}
                  />

                  <Textinput
                    type="text"
                    placeholder="Max Quantity"
                    name="max_quantity"
                    value={max_quantity}
                    error={errors.max_quantity}
                    register={register}
                    onChange={(e)=>setMaxQuantity(e.target.value)}
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
          </main>
        </div>
      </div>
    </>
  );
}

export default page;
