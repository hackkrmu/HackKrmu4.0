"use client";
import React, { useState } from "react";
import restaurantTypeData from "../add-restaurant/restaurantTypeData";
import RestaurantVerification from "./RestaurantVerification";

function RestaurantType({ activeStep , formData, setActiveStep, setFormData}) {
  // Create an array of states to track the clicked state for each container

  const [containerStates, setContainerStates] = useState(
    new Array(6).fill(false) // Assuming you have 6 containers, initialize all to false
  );
  const jsonData = JSON.stringify(formData, null, 2);
  
  // Function to handle the click event for a specific container
  const handleContainerClick = (index) => {
    // Create a copy of the containerStates array and toggle the state of the clicked container
    const updatedStates = [...containerStates];
    updatedStates[index] = !updatedStates[index];//WIll set that thing to true
    setContainerStates(updatedStates);
  };
  // const [submitted, setSubmitted] = useState(false);
  const trueIndices = containerStates
    .map((value, index) => (value ? index : null))
    .filter((index) => index !== null);
  // console.log(trueIndices);

  const filteredItems = trueIndices.map((index) => restaurantTypeData[index]);
// console.log(filteredItems)
const handleSubmit=()=>{
  setActiveStep(3)
  // setSubmitted(true);
  // setContainerStates(Array(6).fill(false))
  // console.log(filteredItems);
  // console.log(jsonData)
}
  return (
    <div>
      {/* Restaurant Type */}

      <section
        className={`text-gray-600 body-font ${
          activeStep === 2 ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <div className="container px-5 pb-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-200">
              Restaurant Type
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Please select from following types of restaurants.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {restaurantTypeData.map((restaurantType, index) => (
              <div
                key={index}
                className={`xl:w-1/3 md:w-1/2 p-4 `}
                onClick={() => handleContainerClick(index)}
              >
                <div
                  className={`border border-gray-200 p-6  rounded-lg cursor-pointer ${
                    containerStates[index] ? "border-violet-500" : ""
                  }`}
                >
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    {restaurantType.icon}
                  </div>
                  <h2 className="text-lg text-violet-700 font-medium title-font mb-2">
                    {restaurantType.name}
                  </h2>
                  <p className="leading-relaxed text-base">
                    {restaurantType.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button  onClick={handleSubmit} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Next ⏭
          </button>
          {/* {submitted && (
        <div>
          <p>Submitted successfully!</p>
          <button onClick={() => setSubmitted(false)}>Close</button>
        </div>
      )} */}
        </div>
      </section>

      <RestaurantVerification jsonData={jsonData} filteredItems={filteredItems} activeStep={activeStep} setActiveStep={setActiveStep} setFormData0={setFormData}/>
    </div>
  );
}
export default RestaurantType;
