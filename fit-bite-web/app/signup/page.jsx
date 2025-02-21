"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from 'next/script'
import "../globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
function LoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ default: "default is required" });
  const [isChecked, setIsChecked] = useState({ checked: false });
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    ContactNumber: 0,
    Address: "",
    Email: "",
    Password: "",
  });

  const handleCheckboxChange = () => {
    // Toggle the value of isChecked when the checkbox is clicked
    setIsChecked({ checked: !isChecked.checked });
  };

  // Handle input changes and update state
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //Validation Logic Here
    // const validationErrors = {};

    // if (!formData.username) {
    //   validationErrors.username = "Username is required.";
    // }
    // if (!formData.ContactNumber) {
    //   validationErrors.ContactNumber = "Please enter your Contact Number.";
    // }
    // if (!formData.Email) {
    //   validationErrors.Email = "Please enter your Email for future updates.";
    // }
    // if (!formData.Address) {
    //   validationErrors.Address = "Address is required for delivery.";
    // }

    // if (!formData.Password) {
    //   validationErrors.Password = "Password is required.";
    // }

    // if (formData.Password.includes(formData.username)) {
    //   validationErrors.Password = "Username should not be used as a password.";
    // }
    // if (formData.Email.length > 1 && formData.Email.length < 10) {
    //   validationErrors.Email = "Please enter correct E-mail id";
    // }
    // if (formData.Email.length <= 1) {
    //   validationErrors.Email = "Please enter your Email for future updates.";
    // }
    // if (formData.ContactNumber.length < 10 || formData.ContactNumber.length > 10) {
    //   validationErrors.ContactNumber = "Please enter correct Contact Number";
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    // } else {
    //   setErrors(validationErrors);
    // }
  };
  const isFormValid = () => {
    // Check if there are any errors in the errors state
    return Object.values(errors).every((error) => error === "");
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})
    const validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required.";
    }
    if (!formData.ContactNumber) {
      validationErrors.ContactNumber = "Please enter your Contact Number.";
    }
    if (!formData.Email) {
      validationErrors.Email = "Please enter your Email for future updates.";
    }
    if (!formData.Address) {
      validationErrors.Address = "Address is required for delivery.";
    }

    if (!formData.Password) {
      validationErrors.Password = "Password is required.";
    }

    if (formData.Password.includes(formData.username)) {
      validationErrors.Password = "Username should not be used as a password.";
    }
    if (formData.Email.length > 1 && formData.Email.length < 10) {
      validationErrors.Email = "Please enter correct E-mail id";
    }
    if (formData.Email.length < 1) {
      validationErrors.Email = "Please enter your Email for future updates.";
    }
    if (
      formData.ContactNumber.length > 0 &&
      formData.ContactNumber.length < 10 ||
      formData.ContactNumber.length > 10 || formData.ContactNumber.length < 0
    ) {
      validationErrors.ContactNumber = "Please enter correct Contact Number";
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

    // Convert form data to JSON
    const jsonDataFinal = JSON.stringify(formData, null, 2);
    // console.log("String form Data Final", jsonDataFinal);
    if (Object.keys(validationErrors).length == 0) {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonDataFinal,
      });

      if (response.status === 200) {
        setSubmitted(true);
        // console.log("Form data submitted successfully", formData);
        toast.success("😎 Account created successfully!", {
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
          router.replace("/login");
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
  };

  return (
    <div className="flex flex-col  min-h-screen mb-32 sm:mb-0 ">

      <Script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
        strategy="lazyOnload"
      ></Script>

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
  

      <div className="flex justify-center items-center">
        <span className="hidden md:block w-[600px] h-[600px] lg:mr-56">
          <dotlottie-player
            src="https://lottie.host/6b7f76e1-159a-4be5-82b4-c114766a601c/ak5NUSShW9.json"
            background="transparent"
            speed="1"
            className="w-[100px] h-[100px] "
            loop
            autoplay
          ></dotlottie-player>
        </span>
        <div className=" text-sm sm:text-[16px] md:mr-12 w-[30rem] md:w-[40rem]">
          <Image
            src="/logo.png"
            alt="Logo"
            className="mx-auto mb-4 "
            height={100}
            width={100}
          />
          <form
            onSubmit={handleSubmit}
            action="/api/signup"
            method="POST"
            className="border border-purple-400  rounded-xl pt-6 pb-8 mb-4 mx-8 sm:mx-0 px-8 "
          >
            <div className="mb-4 ">
              <h1 className="text-md sm:text-[22px] font-bold mt-2 mb-2 text-gray-400">
                Create a New Account
              </h1>
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                type="text"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                placeholder="******************"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs italic">{errors.Email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">{errors.Password}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="contactNumber"
              >
                Contact Number
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="ContactNumber"
                type="number"
                placeholder="******************"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleInputChange}
              />
              {errors.ContactNumber && (
                <p className="text-red-500 text-xs italic">
                  {errors.ContactNumber}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="Address"
              >
                Address
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Address"
                type="Address"
                placeholder="******************"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
              />
              {errors.Address && (
                <p className="text-red-500 text-xs italic">{errors.Address}</p>
              )}
            </div>

            <div className="flex justify-between">
              <div className="flex">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="form-checkbox h-5 w-5 "
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700 mb-2 "
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              className={`bg-gradient-to-r from-violet-500 to-pink-500  hover:bg-indigo-700 w-full mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ${
                isFormValid() ? "" : ""
              }`}
              type="submit"
              // disabled={!isFormValid()}
            >
              {submitted ? "User Created" : "Sign Up"}
            </button>
          </form>
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Already have an account?
              <Link
                href="/login"
                className="ml-1 text-blue-500 hover:text-blue-800"
              >
                Sign In
              </Link>
            </p>
          </div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 Zomato. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
