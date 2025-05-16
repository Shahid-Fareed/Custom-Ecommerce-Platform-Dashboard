"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import axios from "axios";


interface StepSchema {
  [key: string]: yup.SchemaOf<any>;
}

const stepSchema: yup.SchemaOf<any> = yup.object().shape({
  title: yup.string().required("Title is required"),
});

function page({ params }: any) {

  const id = params?.id;
  const router = useRouter();
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [font, setFont] = useState({
    name: '',
    status: ''
  });
  useEffect(() => {
    axios.get(`http://localhost:4001/api/v1/font/details/${id}`)
      .then(response => {
        setFont(response.data);
      })
      .catch(error => {
        console.error('Error fetching Font:', error);
      });
  }, [id]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFont(prevState => ({
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
    setFont(prevState => ({
      ...prevState,
      status: selectedOption.value
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post(`http://localhost:4001/api/v1/font/update/${id}`, font)
      .then(response => {
        console.log('Font updated successfully:', response);
        router.push("/fonts");
      })
      .catch(error => {
        console.error('Error updating Font:', error);
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
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727" />
            <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727" />
          </svg>
        </button>
        Edit Font
      </h2>
      <div className="col-span-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-8">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">

              <Textinput
                type="text"
                placeholder="Name"
                name="name"
                error={errors.name}
                register={register}
                defaultValue={font.name}
                onChange={handleInputChange}
              />

              <Select
                ismulti={false}
                options={options}
                placeholder={"Select Status"}
                onSelectChange={handleStatusChange}
                selectedValues={{
                  value: font.status,
                  label:
                    options.find((option) => option.value === font.status)
                      ?.label || "",
                }}
              />

            </div>


          </div>
          <div>
            <Button
              text="Update"
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
