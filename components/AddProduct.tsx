"use client";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Import UploadFile and Select components here
// import UploadFile from "@/components/UploadFile";
import Select from "@/components/Select";
import { useDropzone } from "react-dropzone";
import { Switch } from "antd";
import ImageUploader from "./ImageUploade";
import Alert from "./ui/Alert";
import axios from "axios";
// import "@/node_modules/antd/dist/antd.css";

interface Step {
  id: number;
  title?: string;
}

const steps: Step[] = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  // {
  //   id: 4,
  //   title: "Social Links",
  // },
];

interface StepSchema {
  [key: string]: yup.SchemaOf<any>;
}

interface Attribute {
  value: string;
  label: string;
}
const stepSchema: yup.SchemaOf<any> = yup.object().shape({
  name: yup.string().required("Product title is required"),
  sku: yup.string().required("SKU is required"),
});

const personalSchema: yup.SchemaOf<any> = yup.object().shape({
  // fname: yup.string().required("First name is required"),
  // lname: yup.string().required("Last name is required"),
});

const addressSchema: yup.SchemaOf<any> = yup.object().shape({
  // address: yup.string().required("Address is required"),
});

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedFittingStyle, setSelectedFittingStyles] = useState("");
  const [selectedPrittingStyles, setSelectedPrittingStyles] = useState("");
  const [selectedSlabs, setSelectedSlabs] = useState({});
  const [prices, setPrices] = useState({});
  const [formattedResults, setFormattedResults] = useState([]);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sizeChartImage, setSizeChartImage] = useState(null);

  const [price, setPrice] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [longdescription, setLongDescription] = useState("");
  const [image, setImage] = useState("");
  const [is_featured, setFeatured] = useState("");

  const [selectedValues, setSelectedValues] = useState<Attribute[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<Attribute[]>([]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [featuredIndices, setFeaturedIndices] = useState<Set<number>>(
    new Set()
  );

  const [categories, setCategories] = useState<Attribute[]>([]);
  const [attributesList, setAttributeList] = useState<Attribute[]>([]);
  const [attributesListTypes, setAttributeListTypes] = useState([]);
  const [fittingStylesList, setFittingStylesList] = useState([]);
  const [printingStylesList, setPrintingStylesList] = useState([]);
  const [priceSlabList, setPriceSlabList] = useState([]);

  const [isSubmited, setIsSubmited] = useState(false);

  console.log("selectedImages", selectedImages);

  let currentStepSchema: yup.SchemaOf<any>;

  console.log("stepNumber", stepNumber);

  switch (stepNumber) {
    case 0:
      currentStepSchema = stepSchema;
      break;
    case 1:
      currentStepSchema = personalSchema;
      break;
    case 2:
      currentStepSchema = addressSchema;
      break;
    // case 3:
    //   currentStepSchema = socialSchema; // You need to define socialSchema
    //   break;
    default:
      currentStepSchema = stepSchema;
  }

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files, value } = event.target;
    const list = [...attributesListTypes];

    if (name === "svg" && files && files.length > 0) {
      const formData = new FormData();
      formData.append("svg", files[0]);

      axios
        .post("http://localhost:4001/api/v1/products/createsvg", formData)
        .then((response) => {
          console.log("Response: ", response);

          const updatedList = list.map((item, idx) => {
            if (idx === index) {
              return { ...item, [name]: files[0]?.name };
            }
            return item;
          });

          setAttributeListTypes(updatedList);
        })
        .catch((error) => {
          console.error("Error uploading SVG:", error);
        });
    } else {
      const updatedList = list.map((item, idx) => {
        if (idx === index) {
          console.log("Asdasd: ", idx);
          return { ...item, [name]: value };
        }
        return item;
      });

      setAttributeListTypes(updatedList);
    }
  };

  useEffect(() => {
    console.log("I'm here");
    console.log("selectedAttribute: ", selectedAttribute);
    if (selectedAttribute?.value !== "") {
      axios
        .get(
          `http://localhost:4001/api/v1/attribute/${selectedAttribute.label}`
        )
        .then((response: any) => {
          const formattedArray = response.data.map((item, index) => {
            return {
              attribute_id: item.id,
              default_color: "",
              svg: "",
              sort_order: 0,
              price: 0,
              name: item?.name,
            };
          });

          setAttributeListTypes(formattedArray);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [selectedAttribute]);

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/v1/category`)
      .then((response: any) => {
        console.log("ASDasdasd111111: ", response.data);
        const data = [];
        for (let i = 0; i < response.data.length; i++) {
          data.push({
            value: response.data[i].id,
            label: response.data[i].title,
          });
        }
        console.log("ASDasdasd: ", data);
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get(`http://localhost:4001/api/v1/attributetype`)
      .then((response: any) => {
        const data = [];
        for (let i = 0; i < response.data.length; i++) {
          data.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setAttributeList(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get(`http://localhost:4001/api/v1/fittingstyle`)
      .then((response: any) => {
        console.log("response ali: ", response.data);
        const datas = [];
        for (let i = 0; i < response.data.length; i++) {
          datas.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setFittingStylesList(datas);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get(`http://localhost:4001/api/v1/printingstyle`)
      .then((response: any) => {
        const datas = [];
        for (let i = 0; i < response.data.length; i++) {
          datas.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setPrintingStylesList(datas);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get(`http://localhost:4001/api/v1/priceslab`)
      .then((response: any) => {
        setPriceSlabList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    //console.log("step number changed");
  }, [stepNumber]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    let totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    if (isLastStep) {
      console.log(data);
      setIsSubmited(!isSubmited);
    } else {
      setStepNumber(stepNumber + 1);
      setIsSubmited(!isSubmited);
    }
  };

  const handlePrev = () => {
    setStepNumber(stepNumber - 1);
  };

  const options: Attribute[] = [
    { value: "Customizable", label: "Customizable" },
    { value: "Simple", label: "Simple" },
  ];
  const options2: Attribute[] = [
    { value: "red2", label: "Red2" },
    { value: "blue2", label: "Blue2" },
    { value: "green2", label: "Green2" },
  ];

  const optionsStatus: Attribute[] = [
    { value: "1", label: "Active" },
    { value: "2", label: "De active" },
  ];

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    setFrontImage(file);
  };
  const handleSizeChartImageChange = (e) => {
    const file = e.target.files[0];
    setSizeChartImage(file);
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    setBackImage(file);
  };

  const handelProductType = (selectedOptions: any) => {
    setProductType(selectedOptions);
  };

  const handelCategorySelect = (selectedOptions: any) => {
    console.log(selectedOptions);
    setSelectedCategory(selectedOptions);
  };

  const handelAttributeSelect = (selectedOptions: any) => {
    setSelectedAttribute(selectedOptions);
  };

  const handelStatusSelect = (selectedOptions: any) => {
    setStatus(selectedOptions);
  };

  const handelFittingStyle = (selectedOptions: any) => {
    setSelectedFittingStyles(selectedOptions);
  };

  const handelPrintingStyle = (selectedOptions: any) => {
    setSelectedPrittingStyles(selectedOptions);
  };

  const handlePriceChange = (event, id) => {
    const newPrices = { ...prices, [id]: event.target.value };
    setPrices(newPrices);
  };

  const handleSlabSelect = (id) => {
    setSelectedSlabs({ ...selectedSlabs, [id]: !selectedSlabs[id] });
  };

  useEffect(() => {
    const results = Object.keys(selectedSlabs)
      .map((id) => {
        if (selectedSlabs[id] && prices[id]) {
          return { slab_id: id, slabprice: prices[id] };
        }
        return null;
      })
      .filter((result) => result !== null);
    setFormattedResults(results);
  }, [selectedSlabs, prices]);

  const handleSelectChange = (selectedOptions: Attribute[]) => {
    setSelectedValues(selectedOptions);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
      console.log("newImages", newImages);
      setSelectedImages([...selectedImages, ...newImages]);
    },
  });

  const handleDeleteImage = (e: any, index: number) => {
    e.preventDefault();
    console.log("deleteImage");
    const newImages = [...selectedImages];
    newImages.splice(index, 1);

    const newFeaturedIndices = new Set(featuredIndices);
    newFeaturedIndices.delete(index);

    setSelectedImages(newImages);
    // setFeaturedIndices(newFeaturedIndices);
  };

  const handleToggleFeatured = (index: number) => {
    const newFeaturedIndices = new Set(featuredIndices);

    if (newFeaturedIndices.has(index)) {
      newFeaturedIndices.delete(index);
    } else {
      newFeaturedIndices.add(index);
    }
    setFeaturedIndices(newFeaturedIndices);
  };

  const toggleIsFeatured = (id: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.map((image) => {
        if (image.id === id) {
          // Assuming your image object has an 'id' property
          return {
            ...image,
            isFeatured: true,
          };
        } else {
          return {
            ...image,
            isFeatured: false,
          };
        }
        return image;
      });
      return updatedImages;
    });
  };

  const handleFileChange = (files: string[]) => {
    const newFiles = { ...selectedImages, ...files };
    setSelectedImages(newFiles);
  };

  const handleMultipleImageUpload = (files: any) => {
    let newImages = files.map((file: any) => ({
      name: URL.createObjectURL(file),
      id: selectedImages?.length + 1,
      isFeatured: false,
    }));

    console.log("newImages", newImages);
    setSelectedImages([...selectedImages, ...newImages]);

    console.log("Uploaded files:", files);
  };

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

  const handelSubmitOrder = (e: any) => {
    e.preventDefault();

    let multicat = selectedCategory.map((cat) => cat.value);
    let attributss = attributesListTypes?.filter((att) => att?.svg !== "");
    console.log("bhai  bjhaiL ", attributss);

    console.log(multicat);
    console.log("Typeof: ", typeof multicat);

    const formdata = new FormData();
    formdata.append("name", name);
    // formdata.append("price", "");
    formdata.append("short_description", shortdescription);
    formdata.append("long_description", longdescription);
    formdata.append("meta_title", metaTitle);
    formdata.append("meta_description", metaDescription);
    formdata.append("is_featured", "1");
    formdata.append("status", status.value);
    formdata.append("product_type", productType.value);
    formdata.append("featured_image_front", frontImage);
    formdata.append("back_image", backImage);
    formdata.append("attribute_type_id", selectedAttribute.value);
    formdata.append("category_id", JSON.stringify(multicat));
    formdata.append("size_table", sizeChartImage);
    formdata.append("selectedSlabs", JSON.stringify(formattedResults));
    formdata.append("selectedAttributeType", JSON.stringify(attributss));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4001/api/v1/products/create",
      data: formdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isSubmited && (
        <Alert
          dismissible
          icon="akar-icons:double-check"
          className="fixed right-10 top-10 z-50 light-mode alert-success"
        >
          This is an alert—check it out!
        </Alert>
      )}
      <div className="mt-5">
        <div className="py-5">
          <p className="text-center text-[15px] text-[#2a2a2a]">
            Please complete steps below to add a product.
          </p>
          <p className="text-center text-[15px] text-[#2a2a2a]">
            It's easy as 1, 2, 3...
          </p>
        </div>
        <div className="grid grid-cols-9">
          <div className="col-span-3"></div>
          <div className="flex z-[5] items-center justify-center relative md:mx-8 col-span-3">
            {steps.map((item, i) => (
              <div
                className="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
                key={i}
              >
                <div
                  className={`${
                    stepNumber >= i
                      ? "bg-[#6CA7FF] text-white ring-[#6CA7FF] ring-2 ring-offset-2"
                      : "bg-[#F9FAFB] text-slate-900 text-opacity-70"
                  }  transition duration-150 icon-box md:h-20 md:w-20 h-14 w-14 rounded-full flex flex-col items-center justify-center relative z-[66] md:text-lg text-base font-medium`}
                >
                  {stepNumber <= i ? (
                    <span> {i + 1}</span>
                  ) : (
                    <span className="text-3xl">
                      <Icon icon="bx:check-double" />
                    </span>
                  )}
                </div>
                <div
                  className={`${
                    stepNumber >= i ? "bg-[#6CA7FF]" : "bg-[#F9FAFB]"
                  } absolute top-1/2 h-[2px] w-full`}
                ></div>
                <div
                  className={` ${
                    stepNumber >= i
                      ? " text-slate-900 dark:text-slate-300"
                      : "text-slate-500 dark:text-slate-300 dark:text-opacity-40"
                  } absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100`}
                >
                  <span className="w-max">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3"></div>
        </div>

        <div className="conten-box col-span-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {stepNumber === 0 && (
              <div>
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10">
                  <div className="lg:col-span-2 md:col-span-2 col-span-1">
                    <h4 className="text-base text-center text-[#2a2a2a]">
                      Enter your product detail below
                    </h4>
                  </div>
                  <div className="col-span-2">
                    <div {...getRootProps()} className="dropzone">
                      <ImageUploader
                        onUpload={handleSingleImageUpload}
                        multiple={false}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Upload Front Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFrontImageChange}
                    />

                    <p>Upload Back Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackImageChange}
                    />
                    <p>Size Chart Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSizeChartImageChange}
                    />

                    <div>
                      {frontImage && (
                        <div>
                          <h3>Front Image Preview:</h3>
                          <img
                            src={URL.createObjectURL(frontImage)}
                            alt="Front"
                            width="200"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {backImage && (
                        <div>
                          <h3>Back Image Preview:</h3>
                          <img
                            src={URL.createObjectURL(backImage)}
                            alt="Back"
                            width="200"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      {sizeChartImage && (
                        <div>
                          <h3>Size Chart Preview:</h3>
                          <img
                            src={URL.createObjectURL(sizeChartImage)}
                            alt="Back"
                            width="200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <Textinput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Type your Product Title"
                    name="name"
                    error={errors.name}
                    register={register}
                  />
                  <Textinput
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    type="text"
                    placeholder="Meta Title"
                    name="merttitle"
                    error={errors.name}
                    register={register}
                  />
                  <Textinput
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    type="text"
                    placeholder="Meta Description"
                    name="metadescription"
                    error={errors.name}
                    register={register}
                  />

                  <Select
                    ismulti={true}
                    onSelectChange={handelProductType}
                    selectedValues={productType}
                    options={options}
                    placeholder={"Product Type"}
                  />
                  <Select
                    ismulti={true}
                    options={categories}
                    placeholder={"Select Category"}
                    onSelectChange={handelCategorySelect}
                    selectedValues={selectedCategory}
                  />

                  <Select
                    ismulti={false}
                    options={attributesList}
                    placeholder={"Select Attributtes"}
                    selectedValues={selectedAttribute}
                    onSelectChange={handelAttributeSelect}
                  />

                  <Select
                    ismulti={false}
                    options={fittingStylesList}
                    placeholder={"Fitting Styles"}
                    selectedValues={selectedFittingStyle}
                    onSelectChange={handelFittingStyle}
                  />

                  <Select
                    ismulti={false}
                    options={printingStylesList}
                    placeholder={"Printing Styles"}
                    selectedValues={selectedPrittingStyles}
                    onSelectChange={handelPrintingStyle}
                  />

                  <Select
                    ismulti={false}
                    options={optionsStatus}
                    placeholder={"Status"}
                    onSelectChange={handelStatusSelect}
                    selectedValues={status}
                  />

                  <Textarea
                    placeholder="short Description"
                    name="shortDescription"
                    register={register}
                    value={shortdescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />

                  <Textarea
                    placeholder="Long Description"
                    name="longDescription"
                    register={register}
                    value={longdescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                  />
                  <br />
                </div>
                {attributesListTypes.map((attribute, index) => (
                  <div key={index} className="w-100">
                    <h5>{attribute?.name}</h5>
                    <label>default_color</label>
                    <input
                      type="color"
                      name="default_color"
                      value={attribute.default_color}
                      onChange={(event) => handleInputChange(index, event)}
                    />

                    <label>svg</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="svg"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <label>sort_order</label>
                    <input
                      type="number"
                      name="sort_order"
                      value={attribute.sort_order}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <label>price</label>
                    <input
                      type="number"
                      name="price"
                      value={attribute.price}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                ))}

                <div>
                  <h6>Select Price Slabs</h6>
                  {priceSlabList.map((slab: any) => (
                    <div key={slab.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedSlabs[slab.id] || false}
                          onChange={() => handleSlabSelect(slab.id)}
                        />
                        Slab ID: {slab.id}, Min Quantity: {slab.min_quantity},
                        Max Quantity: {slab.max_quantity}
                      </label>
                    </div>
                  ))}
                  <p>Enter Prices for Selected Slabs</p>
                  {Object.keys(selectedSlabs).map(
                    (id) =>
                      selectedSlabs[id] && (
                        <div key={id}>
                          <p>Price for Slab ID {id}:</p>
                          <input
                            type="number"
                            value={prices[id] || ""}
                            onChange={(e) => handlePriceChange(e, id)}
                          />
                        </div>
                      )
                  )}
                </div>

                <button onClick={(e) => handelSubmitOrder(e)}>
                  Submit Order
                </button>
              </div>
            )}

            {stepNumber === 1 && (
              <div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="md:col-span-2 col-span-1 mt-8">
                    <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                      Upload your product images and select a featured image for
                      the product.
                    </h4>
                  </div>
                  <div className="col-span-2">
                    {/* <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div> */}
                    <div {...getRootProps()} className="dropzone">
                      <ImageUploader
                        onUpload={handleMultipleImageUpload}
                        multiple={true}
                      />
                    </div>
                    {selectedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-5">
                        {selectedImages.map((image, index) => (
                          <div key={index} className="image-container">
                            <img
                              src={image?.name}
                              alt={`Product Image ${index}`}
                              className="h-[250px] w-100%"
                            />
                            {/* <div className="image-actions mt-2 flex justify-between items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value={image?.id}  defaultChecked={image?.isFeatured === true ? true :false} className="sr-only peer" onChange={()=>toggleIsFeatured(image?.id)}/>
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div> */}
                            {/* </label> */}
                            <Switch
                              checked={image?.isFeatured}
                              defaultChecked={true}
                              onChange={() => toggleIsFeatured(image?.id)}
                            />

                            {image?.isFeatured ? <>Ha</> : <>Nhe</>}

                            <button
                              onClick={(e) => handleDeleteImage(e, index)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {stepNumber === 2 && (
              <div>
                <div className="grid grid-cols-1 gap-5">
                  <div className="mt-8">
                    <h4 className="text-base text-slate-800 dark:text-slate-300 my-6">
                      Upload your product images and select featured image for
                      product.
                    </h4>
                  </div>
                  <Textinput
                    type="text"
                    placeholder="Meta Title"
                    name="metatitle"
                    error={errors.metatitle}
                    register={register}
                  />
                  <Textinput
                    type="text"
                    placeholder="Product URL"
                    name="producturl"
                    error={errors.producturl}
                    register={register}
                  />
                  <Textarea
                    type="text"
                    placeholder="Meta Detail"
                    name="metadetail"
                    error={errors.address}
                    register={register}
                  />
                </div>
              </div>
            )}

            <div
              className={`${
                stepNumber > 0 ? "flex justify-between" : " text-right"
              } mt-10`}
            >
              {stepNumber !== 0 && (
                <Button
                  text="prev"
                  className="btn-primary"
                  onClick={handlePrev}
                />
              )}
              <Button
                text={stepNumber !== steps.length - 1 ? "next" : "submit"}
                className="btn-primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
