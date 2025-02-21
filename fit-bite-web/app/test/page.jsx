"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
function page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select an image before submitting.");
      return;
    }

    setUploading(true);

    try {
      // Upload image to Cloudinary
      //   const imageUrl = await uploadImageToCloudinary(selectedFile);

      // Submit form data to your backend
      //   const response = await axios.post("/api/products", {
      //     ...formData,
      //     imageUrl, // Save the Cloudinary URL in your database
      //   });

      console.log("Product created:", response.data);
      alert("Product added successfully!");

      // Reset form
      setFormData({ name: "", price: "" });
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
    }
  };
function pushtoDb(results){

}
  return (
    <div className="bg-red-400">
      <form onSubmit={handleSubmit}>
        <CldUploadWidget
          uploadPreset="hack2z"
          onSuccess={(results) => {
            // console.log("File added:", file);
            
            console.log({results}, 'Results from callback func');//this works
            console.log('Public ID', results.info.public_id);

          }}
        >
         {({ open, results }) => {
            console.log({results}, 'Results from render prop');//data.event.files[0].uploadInfo.public_id
            return <button onClick={() => open()}>Upload an Image</button>;
          }} 
        </CldUploadWidget>

        <div>
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: 100, height: 100 }}
            />
          )}
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default page;
