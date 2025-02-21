// // // const { MongoClient, ObjectId } = require('mongodb');
// // // const TeachableMachine = require("@sashido/teachablemachine-node");
// // // require('dotenv').config();

// // // const url = process.env.MONGO_URL;
// // // const client = new MongoClient(url);
// // // const dbName = 'HTM';

// // // // Initialize the Teachable Machine model
// // // const model = new TeachableMachine({
// // //     modelUrl: process.env.MODEL_API
// // // });

// // // // Connect to MongoDB
// // // async function connectToDatabase() {
// // //     try {
// // //         await client.connect();
// // //         console.log("Connected to MongoDB");
// // //     } catch (err) {
// // //         console.error("Error connecting to MongoDB:", err);
// // //     }
// // // }

// // // connectToDatabase();

// // // // Process image upload and classification
// // // exports.processImage = async (req, res) => {
// // //     const imageUrl = req.file ? req.file.path : null;
// // //     const userId = req.user.id; // Extract user ID from authMiddleware

// // //     if (!imageUrl) {
// // //         return res.status(400).send("No image uploaded!");
// // //     }

// // //     console.log(imageUrl); // Log image URL for debugging

// // //     try {
// // //         // Classify the uploaded image using the Teachable Machine model
// // //         const predictions = await model.classify({ imageUrl: imageUrl });
// // //         console.log(predictions);

// // //         const processedPredictions = predictions.map(p => ({
// // //             class: p.class,
// // //             percentage: (p.score * 100).toFixed(0) // Convert score to percentage and round
// // //         }));

// // //         // Find the major skin type (one with a percentage > 50%)
// // //         const majorType = processedPredictions.find(p => p.percentage > 50)?.class || null;

// // //         // Prepare data for database update
// // //         const skinData = {
// // //             majorType,
// // //             predictions
// // //         };

// // //         // Update the user's skin type in the database
// // //         const db = client.db(dbName);
// // //         const collection = db.collection('users'); // Assuming user data is stored in the 'users' collection

// // //         const result = await collection.updateOne(
// // //             { _id: new ObjectId(userId) },
// // //             { $set: { skinType: skinData } }
// // //         );

// // //         if (result.modifiedCount === 0) {
// // //             return res.status(500).send("Failed to update user data in the database!");
// // //         }

// // //         // Send response with processed predictions and major skin type
// // //         res.json({
// // //             skinTypes: predictions,
// // //             majorType
// // //         });

// // //     } catch (error) {
// // //         console.error("Error:", error);
// // //         res.status(500).send("Something went wrong during classification!");
// // //     }
// // // };

// // const { Client } = require("@gradio/client");
// // const axios = require("axios");
// // require("dotenv").config();



// // /**
// //  * Handles image processing and classification
// //  * @param {Request} req - Express request object
// //  * @param {Response} res - Express response object
// //  */
// // exports.processImage = async (req, res) => {
// //   faceUrl = process.env.MODEL_API_FD;
// //   modelUrl = process.env.MODEL_API_US;
// //   const imageUrl = req.file ? req.file.path : null;

// //   if (!imageUrl) {
// //     return res.status(400).send("No image uploaded!");
// //   }

// //   console.log("Uploaded Image URL:", imageUrl);

// //   try {
// //     // Call Flask API for classification
// //     const client = await Client.connect("arnavktis/hello-skin1");
// //     const result = await client.predict("/predict", { 		
// // 		img_url: imageUrl, 
// //     });
// //     console.log(result)

// //     const flaskResponse = await axios.post(`${modelUrl}`, { url: imageUrl });

// //     const predictedClass = flaskResponse.data.predicted_class;

// //     let skinType = "";
// //     switch (predictedClass) {
// //       case 0:
// //         skinType = "Dry";
// //         break;
// //       case 1:
// //         skinType = "Normal";
// //         break;
// //       case 2:
// //         skinType = "Oily";
// //         break;
// //       default:
// //         skinType = "Failed to Determine Skin Type, Try Again";
// //     }
// //     console.log(skinType);
// //     // Render result page with classified skin type
// //     res.json({
// //             result
// //     });
// //   } catch (error) {
// //     console.error("Error processing image:", error);
// //     res.status(500).send("Something went wrong during classification!");
// //   }
// // };

// // const axios = require("axios");
// // require("dotenv").config();

// // /**
// //  * Handles image processing and classification
// //  * @param {Request} req - Express request object
// //  * @param {Response} res - Express response object
// //  */
// // exports.processImage = async (req, res) => {
// //   const faceUrl = process.env.MODEL_API_FD; // Unused? Remove if not needed.
// //   const modelUrl = process.env.MODEL_API_US;
// //   const imageUrl = req.file ? req.file.path : null;
// // console.log(imageUrl)
// //   if (!imageUrl) {
// //     return res.status(400).send("No image uploaded!");
// //   }

// //   console.log("Uploaded Image URL:", imageUrl);

// //   try {
// //     // Connect to your Hugging Face Space via Gradio Client

// //     // Call the Flask API for classification
// //     const flaskResponse = await axios.post("https://arnavktis-hello-skin1.hf.space/gradio_api/call/predict", { img_url: imageUrl });
// //     console.log(flaskResponse)
// //     const predictedClass = flaskResponse.data.predicted_class;

// //     let skinType = "";
// //     switch (predictedClass) {
// //       case 0:
// //         skinType = "Dry";
// //         break;
// //       case 1:
// //         skinType = "Normal";
// //         break;
// //       case 2:
// //         skinType = "Oily";
// //         break;
// //       default:
// //         skinType = "Failed to Determine Skin Type, Try Again";
// //     }
// //     console.log("Predicted skin type:", skinType);

// //     // Return both the Gradio result and the skin type classification
// //     res.json({
// //       gradioResult,
// //       predictedClass,
// //       skinType,
// //     });
// //   } catch (error) {
// //     console.error("Error processing image:", error);
// //     res.status(500).send("Something went wrong during classification!");
// //   }
// // };
// const axios = require("axios");
// require("dotenv").config();

// /**
//  * Handles image processing and classification
//  * @param {Request} req - Express request object
//  * @param {Response} res - Express response object
//  */
// exports.processImage = async (req, res) => {
//   const modelUrl = process.env.MODEL_API_US;
//   const imageUrl = req.file ? req.file.path : null;

//   if (!imageUrl) {
//     return res.status(400).send("No image uploaded!");
//   }

//   console.log("Uploaded Image URL:", imageUrl);

//   try {
//     // Call Hugging Face Gradio API
//     // const gradioResponse = await axios.post(
//     //   "https://arnavktis-hello-skin1.hf.space/gradio_api/call/predict",
//     //   { data: [imageUrl] }, // Corrected request format
//     //   { headers: { "Content-Type": "application/json" } }
//     // );

//     const { Client } = await import("@gradio/client");
//     const client = await Client.connect("arnavktis/hello-skin1");
//     const result = await client.predict("/predict", { 		
// 		img_url: imageUrl, 
// });
//     console.log(result)
    
//     // // Call Hugging Face Gradio API
//     // const gradioResponse = await axios.post(
//     //   "https://arnavktis-hello-skin1.hf.space/gradio_api/call/predict",
//     //   { data: [imageUrl] }, // Corrected request format
//     //   { headers: { "Content-Type": "application/json" } }
//     // );

//     // console.log("Gradio Response:", gradioResponse.data);


//     // Extract prediction result
//     const predictedClass = result.data.predicted_class;
//     const is_face = result.data.face_detected;
//     console.log(predictedClass, is_face)
//     if(!is_face) {
//         return res.status(422).json({message: "No face detected, Please try again"})
//     }
//     if (predictedClass === 0) skinType = "Dry";
//     else if (predictedClass === 1) skinType = "Normal";
//     else if (predictedClass === 2) skinType = "Oily";

//     console.log("Predicted skin type:", skinType);

//     // Return classification result
//     res.json({
//       predictedClass,
//       skinType,
//     });
//   } catch (error) {
//     console.error("Error processing image:", error.response?.data || error.message);
//     res.status(500).send("Something went wrong during classification!");
//   }
// };

const axios = require("axios");
require("dotenv").config();

/**
 * Handles image processing and classification
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
exports.processImage = async (req, res) => {
  const modelUrl = process.env.MODEL_API_US;
  const imageUrl = req.file ? req.file.path : null;

  if (!imageUrl) {
    return res.status(400).send("No image uploaded!");
  }

  console.log("Uploaded Image URL:", imageUrl);

  try {
    // Import Gradio Client dynamically
    const { Client } = await import("@gradio/client");
    const client = await Client.connect("arnavktis/hello-skin1");

    // Call model
    const result = await client.predict("/predict", { img_url: imageUrl });

    console.log("Gradio Result:", result);

    // Extract prediction result properly
    const responseData = result.data?.[0]; // Extract first object from array

    if (!responseData) {
      return res.status(500).json({ message: "Invalid response from model" });
    }

    const predictedClass = responseData.predicted_class;
    const is_face = responseData.face_detected;

    console.log("Predicted Class:", predictedClass, "Face Detected:", is_face);

    if (!is_face) {
      return res.status(422).json({ message: "No face detected, Please try again" });
    }

    let skinType = "Failed to Determine Skin Type, Try Again";
    if (predictedClass === 0) skinType = "Dry";
    else if (predictedClass === 1) skinType = "Normal";
    else if (predictedClass === 2) skinType = "Oily";

    console.log("Predicted skin type:", skinType);

    // Return classification result
    res.json({
      skinType,
    });
  } catch (error) {
    console.error("Error processing image:", error.response?.data || error.message);
    res.status(500).send("Something went wrong during classification!");
  }
};
