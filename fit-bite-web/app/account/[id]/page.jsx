"use client";
import React, { useEffect, useState } from "react";
import { UserContext } from "@/app/Context/UserProvider";
import { menuData } from "../../dishdata";
import Link from "next/link";
import { addtoCart } from "@/app/functions/cart";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
//when you place a order the dishes of different restaurant should be in order dashboard for those restaurants only
function page({ params }) {
  const [slug, setSlug] = useState(params.id);
  const [dish, setDish] = useState({});
  const { setCountAgain } = React?.useContext(UserContext);
  const [itemData, setitemData] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({ });
  
    const [isChecked, setIsChecked] = useState({ checked: false });
    const [formData, setFormData] = useState({
      name: "",
      Description: "",
      Price: 0,
      Carbohydrates:0,
      Protein:0,
      Fat: 0,
      Calories:0,
      restaurantId:slug,
      type:""
    });
    let router = useRouter();
  // async function render() {

  //   try {
  //       const response = await fetch(`/api/item?id=${slug}&dish=desserts`, {
  //         method: "GET",
  //       });
  //       if (response) {
  //         setitemData(res.result);
  //         // console.log(res.result, "response orders");
  //       }
  //   }catch (err) {
  //   console.log(err)
  //   }
  //   }
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      restaurantId: slug,
      image: "https://res.cloudinary.com/dkv7cimyy/image/upload/v1740123654/hack2/k7y0mnlaufgojdj3g47t.jpg",

    }));
}


// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // setActiveStep(2)
    // Convert form data to JSON
    // const jsonData = JSON.stringify(formData, null, 2);
    setErrors({})
    const validationErrors = {};

    if (!formData.name) {
      validationErrors.name = "Please enter product name.";
    }

    if (!formData.Description) {
      validationErrors.Description = "Description is required.";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }

    //     {  "username": "Abhi",
    //     "ContactNumber": 679234567890,
    //     "Email": "abhi2y@email.com",
    //     "Password": "abhi",
    //     "Address": "PNT Colony"
    //   }
    // Log the JSON data (you can send it to a server or save it as needed)

    // Convert form data to JSON
   const jsonDataFinal = JSON.stringify(formData, null, 2);
   console.log("String form Data Final", jsonDataFinal);
       // console.log("String form Data Final", jsonDataFinal);
       if (Object.keys(validationErrors).length == 0) {
       try {
         const response = await fetch(`/api/add-product`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: jsonDataFinal,
         });
   
         if (response.status === 200) {
           setSubmitted(true);
           // console.log("Form data submitted successfully", formData);
           toast.success("😎 Product created successfully!", {
             position: "bottom-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "dark",
           });
           setTimeout(() => {
             router.replace("/dishes");
           }, 3000);
           setFormData({
             username: "",
             ContactNumber: 0,
             Address: "",
             Email: "",
             Password: "",
           });
         } else {
           console.error("Form submission failed");
         }
       } catch (error) {
         console.error("Error:", error);
       }}
     
    
    //  console.log(formData);
  };
 
  return (
    <div>
        <h2 className="text-xl text-gray-400 shadow-md text-bold ml-0 mt-12 ml-8">Add Product</h2>
    <div className="flex flex-col justify-center items-center mt-12 md:mt-36 mx-4">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-row items-center justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-4"
          height={100}
          width={100}
        />
        {/* <h1 className="text-[22px] font-bold mt-2 mb-2 text-black ml-4">
          Zomato
        </h1> */}
      </div>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          action="/api/signup"
          method="POST"
          className="border border-purple-400 rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="******************"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please enter your desired Username
            </p> */}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="Description"
              type="text"
              placeholder="******************"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
            />
            {errors.Description && (
              <p className="text-red-500 text-xs italic">{errors.Description}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>
          <label htmlFor="dropdown" className="block text-lg font-semibold mb-2 text-gray-700">
        Select Type:
      </label>
      <select
        id="dropdown"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Select an option</option>
        <option value="Weight Gain">Weight Gain</option>
        <option value="Weight Loss">Weight Loss</option>
        <option value="Balanced Diet">Balanced Diet</option>
      </select>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold my-2"
              htmlFor="Price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="Price"
              type="number"
              placeholder="******************"
              name="Price"
              value={formData.Price}
              onChange={handleInputChange}
            />
            {errors.Price && (
              <p className="text-red-500 text-xs italic">{errors.Price}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>
          <div className="mb-6 flex justify-between">
            <label
              className="block text-gray-700 font-bold mb-2 p-2"
              htmlFor="Protein"
            >
              Protein
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-fit p-2"
              id="Protein"
              type="number"
              placeholder="******************"
              name="Protein"
              value={formData.Protein}
              onChange={handleInputChange}
            />
            {errors.Protein && (
              <p className="text-red-500 text-xs italic">{errors.Protein}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
       
            <label
              className="block text-gray-700 font-bold mb-2 p-2"
              htmlFor="Calories"
            >
              Calories
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline w-fit p-2"
              id="Calories"
              type="number"
              placeholder="******************"
              name="Calories"
              value={formData.Calories}
              onChange={handleInputChange}
            />
            {errors.Calories && (
              <p className="text-red-500 text-xs italic">{errors.Calories}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
            </div>
            <div className="mb-6 flex">
     
            <label
              className="block text-gray-700 font-bold mb-2 p-2"
              htmlFor="Carbohydrates"
            >
              Carbohydrates
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outlin p-2"
              id="Carbohydrates"
              type="number"
              placeholder="******************"
              name="Carbohydrates"
              value={formData.Carbohydrates}
              onChange={handleInputChange}
            />
            {errors.Carbohydrates && (
              <p className="text-red-500 text-xs italic">{errors.Carbohydrates}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
       
            <label
              className="block text-gray-700 font-bold mb-2 p-2"
              htmlFor="Fat"
            >
              Fat
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="Fat"
              type="number"
              placeholder="******************"
              name="Fat"
              value={formData.Fat}
              onChange={handleInputChange}
            />
            {errors.Fat && (
              <p className="text-red-500 text-xs italic">{errors.Fat}</p>
            )}
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>

          <button
            className={`bg-gradient-to-r from-violet-500 to-pink-500  hover:bg-indigo-700 w-full mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline `}
            type="submit"
            // disabled={!isFormValid()}
          >
            {submitted ? "Submitted" : "Submit"}
          </button>
        </form>
  
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Fit-Bite. All rights reserved.
        </p>
      </div>
    </div>
    </div>
  );
}

export default page;
