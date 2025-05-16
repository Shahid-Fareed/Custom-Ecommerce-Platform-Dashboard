"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUploade";
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
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("");
    const [category_id, setCategoryId] = useState(""); // State to track the selected category ID
    const [material, setMaterial] = useState({
        name: '',
        image: '',
        price: '',
        category_id: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:4001/api/v1/material/details/${id}`)
            .then(response => {
                setMaterial(response.data);
                setCategoryId(response.data.category_id);
            })
            .catch(error => {
                console.error('Error fetching Material:', error);
            });
    }, [id]);

    const handleUpload = (files: File[]) => {
        setImage(files[0]);
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setMaterial(prevState => ({
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

    useEffect(() => {
        axios.get("http://localhost:4001/api/v1/category")
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
        formData.append("name", material.name);
        formData.append("category_id", category_id); // Use the selected category_id
        formData.append("price", material.price);
        try {
            const response = await axios.post(
                `http://localhost:4001/api/v1/material/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Material updated successfully:", response);
            router.push("/material");
        } catch (error) {
            console.error("Error updating Material:", error);
        }
    };

    const options = categories.map(category => ({
        value: category.id,
        label: category.title
    }));

    return (
        <>
            <h2 className="w-full p-3 bg-[#F9FAFB] text-[16px] font-medium col-span-2 flex items-center">
                <button className="mr-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path d="M10.656 1.34399L2.688 9.31199L10.656 17.28L9.312 18.624L0 9.31199L9.312 -7.62939e-06L10.656 1.34399Z" fill="#272727" />
                        <path d="M1.34375 10.2724L1.34375 8.35243L17.6637 8.35243V10.2724L1.34375 10.2724Z" fill="#272727" />
                    </svg>
                </button>
                Edit Material
            </h2>
            <div className="col-span-2">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-8">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                            <div className="col-span-2 mb-4">
                                <ImageUpload
                                    value={material.image || (image ? image.image : '')}
                                    onUpload={handleUpload}
                                />
                            </div>
                            <Textinput
                                type="text"
                                placeholder="Title"
                                name="name"
                                error={errors.name}
                                register={register}
                                defaultValue={material.name}
                                onChange={handleInputChange}
                            />
                            <Textinput
                                type="text"
                                placeholder="Price"
                                name="price"
                                error={errors.price}
                                register={register}
                                defaultValue={material.price}
                                onChange={handleInputChange}
                            />
                            <div className="col-span-2">


                                <Select
                                    ismulti={false}
                                    options={options}
                                    placeholder={"Select Category"}
                                    onSelectChange={option => setCategoryId(option.value)}
                                    selectedValues={options.find(option => option.value === category_id)}
                                />
                            </div>
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
