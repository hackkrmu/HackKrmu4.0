  "use client"
import React, {  useState } from "react";
import FinalRestaurantCreation from "./FinalRestaurantCreation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldUploadWidget } from 'next-cloudinary';
function RestaurantVerification({
  jsonData,
  filteredItems,
  activeStep,
  setActiveStep,
  setFormData0,
}) {
  const jsonDataObj = JSON.parse(jsonData);
  const [submitted, setSubmitted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState("");
  //Find filtered items

  const mappedItems = filteredItems.map((item) => {
    // Here, you can access and manipulate each item as needed
    // const itemName = item.name;
    // const itemDescription = item.description;

    // Perform your desired operations on the item
    // console.log(
    //   `Item ${index + 1}: Name - ${itemName}, Description - ${itemDescription}`
    // );

    // You can also return a modified version of the item
    return {
      ...item,
      // Add or modify properties here
    };
  });
// console.log({mappedItems})
  // Output the mapped items
  // console.log("Mapped items:", mappedItems);
  // console.log(jsonDataObj);
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantContactNumber: 0,
    restaurantEmail: "",
    restaurantAddress: "",
    restaurantLat: 0,
    restaurantLng: 0,
    file:"",
    restaurantType: {
      items: [
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
        {
          name: "",
          description: "",
        },
      ],
    },
  });

  // console.log("filtereditems", filteredItems);
  // console.log("Mapped items:", mappedItems[0]?.name);
  // console.log(jsonDataObj.restaurantName);

  const set = () => {
    console.log("set called")
    console.log({file})
    setIsClicked(true);
    setFormData({
      userId: jsonDataObj.userId,
      restaurantName: jsonDataObj.restaurantName,
      restaurantContactNumber: jsonDataObj.restaurantContactNumber,
      restaurantEmail: jsonDataObj.restaurantEmail,
      restaurantAddress: jsonDataObj.restaurantAddress,
      restaurantLat: jsonDataObj.restaurantLat,
      restaurantLng: jsonDataObj.restaurantLng,
      restaurantImage:file,
      restaurantType: {
        items: mappedItems,
      },
    });
  };
  const handleSubmit = async () => {
    // console.log("Hello", jsonData);
    // console.log(filteredItems);
    // console.log(activeStep);
    // console.log("Form Data original", formData);
    // console.log(jsonDataObj.restaurantName);

    // setFormData1((prevData)=>({
    //   // ...prevData,
    //   restaurantName: jsonDataObj.restaurantName,
    //   restaurantContactNumber: jsonDataObj.restaurantContactNumber,
    //   restaurantEmail: jsonDataObj.restaurantEmail,
    //   restaurantAddress: jsonDataObj.restaurantAddress,
    //   restaurantLat: jsonDataObj.restaurantLat,
    //   restaurantLng: jsonDataObj.restaurantLng,
    //   restaurantType: {
    //     items: [
    //       {
    //         name: mappedItems[0]?.name,
    //         description: mappedItems[0]?.description,
    //       },
    //       {
    //         name: mappedItems[1]?.name,
    //         description: mappedItems[1]?.description,
    //       },
    //       {
    //         name: mappedItems[2]?.name,
    //         description: mappedItems[2]?.description,
    //       },
    //       {
    //         name: mappedItems[3]?.name,
    //         description: mappedItems[3]?.description,
    //       },
    //       {
    //         name: mappedItems[4]?.name,
    //         description: mappedItems[4]?.description,
    //       },
    //       {
    //         name: mappedItems[5]?.name,
    //         description: mappedItems[5]?.description,
    //       },
    //     ],
    //   },
    // }));

    //Submit Form Data
    // Convert form data to JSON
    const jsonDataFinal = JSON.stringify(formData, null, 2);
    console.log({jsonDataFinal}, jsonDataObj)
    // console.log("String form Data Final", jsonDataFinal);
    try {
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonDataFinal,
      });

      if (response.status === 200) {
        console.log("Form data submitted successfully");
        toast.success("😎 Where is your menu card?🎉", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSubmitted(true);
        setActiveStep(4);
      } else {
        toast.error("👹 Invalid Data!", {
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
  };

  return (
    <div className="mb-56">
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
      <section
        className={`text-gray-600 body-font flex justify-center mx-7 ${
          activeStep === 3 ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <div>
       
 
      {/* <CldUploadWidget
          uploadPreset="hack2z"
          onSuccess={(results) => {
            // console.log("File added:", file);
            console.log({results}, 'Results from callback func');//this works
            console.log('Public ID', results.info.public_id);
            results && results.info.public_id ?  setFile(results.info.public_id):console.log('No file uploaded');
            setFileUploaded(true);
            
            className="text-gray-400 text-md mt-5"
          }}  >
            
                    {({ open, results }) => {
                      console.log({results}, 'Results from render prop');//data.event.files[0].uploadInfo.public_id
                      return <button onClick={() => open()}>Upload an Image</button>;
                    }}
                  </CldUploadWidget> */}
          <h1 className="text-violet-700 text-2xl"> RestaurantVerification:</h1>
          <p className="text-sm mt-4 mb-7 text-indigo-400">
            <button onClick={set}>
              Do you want to submit?
              <span
                className={` ${
                  isClicked ? "text-violet-700 text-lg" : "text-sm"
                }`}
              >
                {" "}
                Yes {isClicked ? "" : "(Touch to finalize)"}
              </span>
            </button>
          </p>

          <h2 className="text-violet-700 text-2xl my-4">
            Verify Restaurant Details
          </h2>
          <p className="text-indigo-400">
            Restaurant Name:{" "}
            <span className="text-gray-200">{jsonDataObj.restaurantName}</span>
          </p>
          <p className="text-indigo-400">
            Restaurant Contact Number:{" "}
            <span className="text-gray-200">
              {" "}
              {jsonDataObj.restaurantContactNumber}
            </span>
          </p>
          <p className="text-indigo-400">
            Restaurant E-mail:{" "}
            <span className="text-gray-200">{jsonDataObj.restaurantEmail}</span>
          </p>
          <p className="text-indigo-400">
            Restaurant Address:{" "}
            <span className="text-gray-200">
              {jsonDataObj.restaurantAddress}
            </span>
          </p>
          <p className="text-indigo-400">
            Restaurant Latitude:{" "}
            <span className="text-gray-200">{jsonDataObj.restaurantLat}</span>
          </p>
          <p className="text-indigo-400">
            Restaurant Longitude:{" "}
            <span className="text-gray-200">{jsonDataObj.restaurantLng}</span>
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
          <CldUploadWidget
          uploadPreset="hack2z"
          onSuccess={(results) => {
            // console.log("File added:", file);
            setFileUploaded(true);
            console.log({results}, 'Results from callback func');//this works
            console.log('Public ID', results.info.public_id);
            let public_id = results.info.public_id;
            results && results.info.public_id ?  setFile(results.info.public_id):console.log('No file uploaded');
            setFile(public_id);
            
           
          }}  >
            {/* UPLOAD */}
                    {({ open, results }) => {
                      console.log({results}, 'Results from render prop');//data.event.files[0].uploadInfo.public_id
                      
                      return <button onClick={() => open()}>Upload an Image</button>;
                    }}
                  </CldUploadWidget>
          {filteredItems.map((item, index) => (
            <ul key={index}>
              <li
                key={index}
                className="list-disc mt-3 md:max-w-xl lg:max-w-2xl xl:max-w-4xl"
              >
                <p className="text-indigo-400">
                  Name:<span className="text-gray-200"> {item.name}</span>
                </p>
                <p className="text-indigo-400">
                  Description:{" "}
                  <span className="text-gray-200 ">{item.description}</span>
                </p>
              </li>
            </ul>
          ))}
          <button className="text-gray-400 text-md mt-5" onClick={handleSubmit}>
            ✔ Above information is correct
          </button>
        </div>
        {submitted && (
          <div>
            <p>Form submitted successfully!</p>
            <button onClick={() => setSubmitted(false)}>Close</button>
          </div>
        )}
      </section>
      <FinalRestaurantCreation
        jsonData={jsonDataObj}
        filteredItems={filteredItems}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setFormData0={setFormData0}
      />
    </div>
  );
}

export default RestaurantVerification;
