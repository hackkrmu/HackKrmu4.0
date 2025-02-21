import React from "react";

function FinalRestaurantCreation({
  jsonData,
  filteredItems,
  activeStep,
  setActiveStep,
  setFormData0,
}) {
  // const jsonDataObj = JSON.parse(jsonData);
  //   console.log(activeStep);

  const handleSubmit = () => {
    // console.log("Hello", jsonData);
    // console.log(filteredItems);
    // console.log(activeStep);
    setFormData0({
      restaurantName: "",
      restaurantContactNumber: 0,
      restaurantEmail: "",
      restaurantAddress: "",
      restaurantLat: 0,
      restaurantLng: 0,
    });
    setActiveStep(1);
    // console.log(jsonDataObj.restaurantName)
  };

  return (
    <div className={`${activeStep === 4 ? "block" : "hidden"}`}>
      <section
        className={`text-gray-600 body-font flex justify-center mx-7 md:flex transition-all duration-300`}
      >
        <div>
          <h1 className="text-violet-700 text-2xl">
            Get ready with your menu card 🎉
          </h1>
          <p className="text-sm mt-4 mb-7 text-pink-400">
            Submitted Successfully ❤
          </p>

          <p className="text-pink-400">
            Restaurant Name:{" "}
            <span className="text-gray-200">{jsonData.restaurantName}</span>
          </p>
          <p className="text-pink-400">
            Restaurant Contact Number:{" "}
            <span className="text-gray-200">
              {jsonData.restaurantContactNumber}
            </span>
          </p>
          <p className="text-pink-400">
            Restaurant E-mail:{" "}
            <span className="text-gray-200">{jsonData.restaurantEmail}</span>
          </p>
          <p className="text-pink-400">
            Restaurant Address:{" "}
            <span className="text-gray-200">{jsonData.restaurantAddress}</span>
          </p>
          <p className="text-pink-400">
            Restaurant Latitude:{" "}
            <span className="text-gray-200">{jsonData.restaurantLat}</span>
          </p>
          <p className="text-pink-400">
            Restaurant Longitude:{" "}
            <span className="text-gray-200">{jsonData.restaurantLng}</span>
          </p>
          {/* <ul>
        {jsonDataObj.map((item) => (
          <li key={item.id}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul> */}
          <h4 className="text-violet-700 text-2xl mt-4">RestaurantType</h4>
          {filteredItems.map((item, index) => (
            <ul key={index}>
              {/* //    <div key={item.index} className="list-disc mt-3"> */}
              <li
                key={index}
                className="list-disc mt-3 md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
              >
                <p className="text-pink-400">
                  Name:<span className="text-gray-200"> {item.name}</span>
                </p>
                <p className="text-pink-400">
                  Description:{" "}
                  <span className="text-gray-200 ">{item.description}</span>
                </p>
                {/* </div> */}
              </li>
            </ul>
          ))}
          <button
            className="bg-violet-700 text-gray-200 border rounded-md border-inherit mt-7 p-1"
            onClick={handleSubmit}
          >
            Close ❌
          </button>
          <h2 className="text-lg my-3 text-gray-400">
            Our team will soon reach out to you!
          </h2>
        </div>
      </section>
    </div>
  );
}

export default FinalRestaurantCreation;
