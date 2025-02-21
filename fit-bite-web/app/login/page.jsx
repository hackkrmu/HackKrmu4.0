"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { ToastContainer, toast } from "react-toastify";
// import { injectStyle } from "react-toastify/dist/inject-style";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserProvider";
function LoginPage() {
  const { login, setLoggedIn } = React.useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ username: "Username is required" });
  const [isChecked, setIsChecked] = useState({ checked: false });
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  let router = useRouter();
  const handleCheckboxChange = () => {
    // Toggle the value of isChecked when the checkbox is clicked
    setIsChecked({ checked: !isChecked.checked });
  };
  // IF REMEMBER ME IS CHECKED DO THIS
  //   if(isChecked.checked === true) {

  //     console.log("Don't ask for password for this user again")
  // }

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

    // if (!formData.Email) {
    //   validationErrors.Email = "Please enter your Email for future updates.";
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
    // if (formData.Email.length < 1) {
    //   validationErrors.Email = "Please enter your Email for future updates.";
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);

    //   //   console.log(validationErrors)
    //   // setShouldSignup(false);
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

    // setActiveStep(2)
    // Convert form data to JSON
    // const jsonData = JSON.stringify(formData, null, 2);
    setErrors({});
    const validationErrors = {};

    if (!formData.Email) {
      validationErrors.Email = "Please enter your Email for future updates.";
    }

    if (!formData.Password) {
      validationErrors.Password = "Password is required.";
    }

    // if (formData.Password.includes(formData.username)) {
    //   validationErrors.Password = "Username should not be used as a password.";
    // }
    if (formData.Email.length > 1 && formData.Email.length < 10) {
      validationErrors.Email = "Please enter correct E-mail id";
    }
    if (formData.Email.length < 1) {
      validationErrors.Email = "Please enter your Email for future updates.";
    }
    if (formData.Password.length <= 1) {
      validationErrors.Password = "Please enter correct password";
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
    // console.log("String form Data Final", jsonDataFinal);
    // console.log(Object.keys(validationErrors).length)
    if (Object.keys(validationErrors).length == 0) {
      try {
        console.log("Logging in");
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonDataFinal,
        });
        // console.log(response.body);
        if (response.status === 201) {
          // Parse the JSON response and extract the token
          const responseData = await response.json();
          const token = responseData.token;

          localStorage.setItem("token", token);
          setSubmitted(true);

          toast.success("🎉 Signed In successfully! Redirecting 🤗", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setLoggedIn(true);
          setTimeout(() => {
            router.push("/dishes");
          }, 3000);

          login();
          setFormData({
            Email: "",
            Password: "",
          });
        } else {
          console.error("Form submission failed");
          toast.error("👹 User Not Found!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setFormData({
            Email: "",
            Password: "",
          });
          setIsChecked({ checked: false });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    //  console.log(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center sm:mt-24 md:mt-36 mx-4 sm:mx-0 mb-32 sm:mb-0 ">
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
          className="mx-auto mb-4 "
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
          className="border border-purple-400 rounded-2xl px-8 pt-6 pb-8 mb-4 mx-8 text-sm"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            {/* <p className="text-red-500 text-xs italic">
              Please enter your desired Username
            </p> */}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <input
                id="remember-me"
                type="checkbox"
                className="form-checkbox h-5 w-5 "
                checked={isChecked.checked}
                name="checked"
                // value={isChecked.checked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-xs sm:text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/account"
              className="inline-block align-baseline font-bold text-xs ml-8 sm:ml-0 sm:text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className={`bg-gradient-to-r from-violet-500 to-pink-500  hover:bg-indigo-700 w-full mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ${
              isFormValid() ? "" : ""
            }`}
            type="submit"
            // disabled={!isFormValid()}
          >
            {submitted ? "Signed In" : "Sign In"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-500 text-xs">
            {`Don't`} have an account?
            <Link
              href="/signup"
              className="ml-1 text-blue-500 hover:text-blue-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Zomato. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
