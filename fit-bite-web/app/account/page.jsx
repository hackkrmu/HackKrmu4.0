"use client";
import React from "react";
import { UserContext } from "../Context/UserProvider";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

import "../globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Page() {
  // console.log(restaurantTypes.items[0])
  const { loggedIn, userData, contextLoading } = React.useContext(UserContext);

  let [toggleEdit, SetToggleEdit] = useState(false);
  let [toggleRestaurants, SetToggleRestaurants] = useState(false);
  const [errors, setErrors] = useState({ default: "default is required" });
  const [submitted, setSubmitted] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});

  const router = useRouter();

  // console.log(userData?.username, "above form");
  const [formData, setFormData] = useState({
    username: "",
    ContactNumber: 0,
    Address: "",
    Email: "",
    Password: "",
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    //Validation Logic Here
    const validationErrors = {};

    if (formData.username.length > 0 && formData.username.length < 4) {
      validationErrors.username =
        "Username should have more than 4 characters.";
    }
    if (formData.Password.length > 0 && formData.Password.length < 5) {
      validationErrors.Password = "Password should be atleast of 5 characters.";
    }
    console.log(
      formData.Password.includes(formData.username),
      formData.Password.length > 0
    );
    if (
      formData.Password.length > 0 &&
      formData.Password.includes(formData.username)
    ) {
      validationErrors.Password = "Username should not be used as a password.";
    }
    if (formData.Email.length > 1 && formData.Email.length < 10) {
      validationErrors.Email = "Please enter correct E-mail id";
    }
    if (
      formData.ContactNumber.length > 0 &&
      formData.ContactNumber.length < 10 &&
      formData.ContactNumber.length > 10
    ) {
      validationErrors.ContactNumber = "Please enter correct Contact Number";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors(validationErrors);
    }
  };
  const isFormValid = () => {
    // Check if there are any errors in the errors state
    return Object.values(errors).every((error) => error === "");
  };
  // Handle form submission
  const handleSubmit = async (id, e) => {
    e.preventDefault();

    const validationErrors = {};

    if (formData.username.length > 0 && formData.username.length < 4) {
      validationErrors.username =
        "Username should have more than 4 characters.";
    }

    if (formData.Password.length > 0 && formData.Password.length < 5) {
      validationErrors.Password = "Password should be atleast of 5 characters.";
    }

    if (formData.Password.includes(formData.username)) {
      validationErrors.Password = "Username should not be used as a password.";
    }
    if (formData.Email.length > 1 && formData.Email.length < 10) {
      validationErrors.Email = "Please enter correct E-mail id";
    }
    if (
      formData.ContactNumber.length > 0 &&
      formData.ContactNumber.length < 10 &&
      formData.ContactNumber.length > 10
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
    //     "Address": "California"
    //   }
    // Log the JSON data (you can send it to a server or save it as needed)

    // Convert form data to JSON
    const jsonDataFinal = JSON.stringify(formData, null, 2);
    // console.log("String form Data Final", jsonDataFinal);
    try {
      const response = await fetch(`/api/account/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonDataFinal,
      });
      let res = await response.json();
      if (response.status === 200) {
        toast.success("😎 AccountInfo updated successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // console.log(res.token)
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        setSubmitted(true);
        console.log("Account Information Successfully Updated", formData);
        setTimeout(() => {
          router.push("/");
        }, 3000);
        setFormData({
          username: "",
          ContactNumber: 0,
          Address: "",
          Email: "",
          Password: "",
        });
      } else {
        toast.error("👹 Invalid Data! Try Again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //  console.log(formData);
  };
  //   mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  //   setTimeout(() => {
  //       const decoded = jwt.decode(user.value);

  //       if (loggedIn) {
  //         // let token = localStorage.getItem('token')
  //         console.log(decoded);
  //       }
  //       if (decoded.Email) {

  //         const user = User.find({
  //           Email: decoded.Email,
  //         });
  //         console.log("user", user);
  //       }
  //   }, 5000);
  const getRestaurant = useCallback(async() =>{
    try {
      if (userData._id) {
        // console.log("user ID found", userData._id);
        const response = await fetch(
          `/api/restaurants/?userId=${userData._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let responseData = await response.json();
        // console.log("response data", responseData.result[0].Email);
        if (response.status === 200) {
          // console.log("response status", responseData.result[0].restaurantType.items)
          // console.log(responseData.result, "response data result");
          // setRestaurantType(responseData.result[0].restaurantType);
          setRestaurantData(responseData.result);

          // if (decodedToken.Email === responseData.result[0].Email) {
          //   console.log("User found with that token. Verified");
          //   setLoggedIn(true);
          //   // console.log("token found");
          //   setContextLoading(false);
          // }
        } else {
          console.log("No restaurants found | Login Again");
        }
      }
    } catch (e) {
      console.log("Error", e.message);
    }
  },[userData._id])
  useEffect(() => {
    if (contextLoading == false) {
      if (loggedIn) {
        // console.log(userData?.username);

        getRestaurant();
      }
      if (!loggedIn) {
        console.log("else from orders page is getting triggered");

        router.push("/login");
      }
    }
  }, [loggedIn, userData, submitted, contextLoading, getRestaurant, router]);
  function editInfo() {
    SetToggleEdit(!toggleEdit);
  }
  function restaurantInfo() {
    SetToggleRestaurants(!toggleRestaurants);
  }

  return (
    <div className="text-blue-600">
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
      <div
        className={`text-gray-400 flex justify-center items-center h-screen text-2xl ${
          !contextLoading && !loggedIn ? "block" : "hidden"
        }`}
      >
        Loading...
      </div>
      <span className={`${!contextLoading && !loggedIn ? "hidden" : "block"}`}>
        <h1 className="ml-6 text-gray-600 ">Account Information</h1>
        <div className="flex flex-col m-4 items-center justify-center hover:blue-900 w-fit p-4 rounded relative mt-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            onClick={editInfo}
            className={`bi bi-pencil-square absolute right-0 top-1 text-white ${
              toggleEdit ? "hidden" : "block"
            }`}
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />{" "}
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />{" "}
          </svg>
          <span
            onClick={editInfo}
            className={`absolute right-0 top-1 cursor-pointer ${
              toggleEdit ? "block" : "hidden"
            }`}
          >
            🙅‍♂️
          </span>
          <div className="text-sm md:text-lg">
            <h1 className="text-md md:text-xl lg:text-xl mb-12">
              {userData?.username}, How are you?
            </h1>
            <h1 className="text-gray-600">
              Email: <span className="text-blue-600">{userData?.Email}</span>
            </h1>
            <h1 className="text-gray-600">
              Contact Number:{" "}
              <span className="text-blue-600">{userData?.ContactNumber}</span>
            </h1>
            <h1 className="text-gray-600">
              Address:{" "}
              <span className="text-blue-600">{userData?.Address}</span>
            </h1>
          </div>
        </div>
        {toggleEdit ? (
          <div className="m-8 lg:w-fit text-sm md:text-md">
            <form
              onSubmit={(e) => {
                handleSubmit(userData._id, e);
              }}
              action="/api/account"
              method="PUT"
              className="border 
            border-purple-400 rounded-xl px-8 pt-6 pb-8 mb-4"
            >
              <div className="md:flex flex-row items-center justify-center w-full">
                <div className=" mx-2">
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
                    placeholder={`Username: ${userData?.username}`}
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs italic">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className=" mx-2">
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
                    placeholder={`Email: ${userData?.Email}`}
                  />
                  {errors.Email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.Email}
                    </p>
                  )}
                </div>
                <div className=" mx-2">
                  <label
                    className="block text-gray-500 font-bold mb-2"
                    htmlFor="password"
                  >
                    New Password
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
                    <p className="text-red-500 text-xs italic">
                      {errors.Password}
                    </p>
                  )}
                </div>
                <div className=" mx-2">
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
                    placeholder={`Contact: @${userData?.ContactNumber}`}
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
                <Image
                  src="/logo.png"
                  alt="Logo"
                  className="mx-auto mb-4 hidden md:block"
                  height={100}
                  width={100}
                />
              </div>
              <div className="mb-6 mx-2">
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
                  placeholder={`Address: ${userData?.Address}`}
                  name="Address"
                  value={formData.Address}
                  onChange={handleInputChange}
                />
                {errors.Address && (
                  <p className="text-red-500 text-xs italic">
                    {errors.Address}
                  </p>
                )}
                {/* <p className="text-red-500 text-xs italic">
              Please enter your Delivery Address.
            </p> */}
              </div>
              <button
                className={`bg-gradient-to-r from-violet-500 to-pink-500  hover:bg-indigo-700 w-fit mt-4 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-0 ${
                  isFormValid() ? "" : "disabled cursor-not-allowed"
                }`}
                type="submit"
                disabled={!isFormValid()}
              >
                {submitted ? "Saved" : "Save"}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}

        {/* RESTAURANT DATA */}
        <div
          onClick={() => restaurantInfo()}
          className={`text-gray-600 body-font cursor-pointer p-6 m-8 ml-0 w-fit  ${
            restaurantData && restaurantData.length > 0 ? "block" : "hidden"
          }`}
        >
          {!toggleRestaurants ? "View" : "Hide"} Restaurants
        </div>
        {toggleRestaurants ? (
          <section
            className={`text-gray-600 body-font flex flex-col justify-center md:mx-7 md:flex transition-all duration-3000  w-fit  `}
          >
            {restaurantData &&
              restaurantData.map((item, index) => (
                <div
                  className="m-8 border rounded-xl p-8 text-sm md:text-md lg:text-lg"
                  key={index}
                  onClick={()=> router.push(`/account/${item._id}`)}
                >
                  <h4 className="text-violet-700 text-lg md:text-xl lg:text-2xl mb-2">
                    Restaurant Details
                  </h4>
                  {/* <h1 className="text-violet-700 text-2xl">
                  Get ready with your menu card 🎉
                </h1> */}

                  <p className="text-pink-400 my-1 md:my-0" >
                    Restaurant Name:{" "} 
                    <span className="text-gray-200">
                      {item.restaurantName}
                      {/* {console.log(item.restaurantName, "restaurantName")} */}
                    </span>
                  </p>
                  <p className="text-pink-400 my-1 md:my-0">
                    Contact Number:{" "}
                    <span className="text-gray-200">
                      {item.restaurantContactNumber}
                    </span>
                  </p>
                  <p className="text-pink-400 my-1 md:my-0">
                    E-mail:{" "}
                    <span className="text-gray-200">
                      {item.restaurantEmail}
                    </span>
                  </p>
                  <p className="text-pink-400 my-1 md:my-0">
                    Restaurant Address:{" "}
                    <span className="text-gray-200">
                      {item.restaurantAddress}
                    </span>
                  </p>
                  <p className="text-pink-400 my-1 md:my-0">
                    Restaurant Latitude:{" "}
                    <span className="text-gray-200">{item.restaurantLat}</span>
                  </p>
                  <p className="text-pink-400 my-1 md:my-0">
                    Restaurant Longitude:{" "}
                    <span className="text-gray-200">{item.restaurantLng}</span>
                  </p>
                  {/* <ul>
        {jsonDataObj.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul> */}
                  <h4 className="text-violet-700 text-lg md:text-xl lg:text-2xl mt-4">
                    RestaurantType
                  </h4>
                  {/* //    <div key={item.index} className="list-disc mt-3"> */}

                  {/* {restaurantType && restaurantType.items && restaurantType.items.map((item, index) => ( */}
                  {/* <ul key={index}> */}
                  {item.restaurantType.items.map((item, index) => (
                    <li
                      key={index}
                      className="list-disc mt-3 md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
                    >
                      <span className="text-pink-400">
                        Name:<span className="text-gray-200"> {item.name}</span>
                      </span>
                      <p className="text-pink-400">
                        Description:{" "}
                        <span className="text-gray-200 ">
                          {item.description}
                        </span>
                      </p>
                    </li>
                  ))}
                  {/* </ul> */}
                  {/* ))} */}

                  {/* <h2 className="text-lg my-3 text-gray-400">
                  Our team will soon reach out to you!
                </h2> */}
                </div>
              ))}
          </section>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

export default Page;
