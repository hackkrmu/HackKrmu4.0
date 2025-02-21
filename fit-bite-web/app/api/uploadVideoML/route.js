import axios from "axios";

export async function POST(req) {
  try {
    // ✅ Convert request to FormData
    const formData = await req.formData();
    const file = formData.get("file"); // Extract file directly
    console.log(file, "file received");
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
    }
    // const fileBlob = await req.blob();
    // formData.append("file", fileBlob, "uploaded-video.mp4");
 
    const backendFormData = new FormData();
    backendFormData.append("file", file, file.name); 

    const newFile = backendFormData.get("file");

    console.log("New file is ", newFile);

    // Send to FastAPI backend
    const backendResponse = await axios.post("http://localhost:8000/upload_video", backendFormData, {
        "Content-Type": "multipart/form-data;"     
    });
    // headers to pass to fetch API in post request when sending image/file in multi-form
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //    charset:'utf-8',
    //    boundary: Math.random().toString().substr(2)

    

    const data = await backendResponse.data;
    console.log("Backend Response:", JSON.stringify(data));

    return new Response(JSON.stringify(data), { status: backendResponse.status });
  } catch (error) {
    console.error("Upload failed:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}



// export async function POST(req) {
//     const formData = await req.formData();
//     const file = formData.get("file");
  
//     if (!file) {
//       return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
//     }
//   console.log(file)
//     const backendResponse = await fetch("http://localhost:8000/upload_video", {
//       method: "POST",
//       body: {"file":file},
//     });
  
//     const data = await backendResponse.json();
//     console.log(JSON.stringify(data))
//     return new Response(JSON.stringify(data), { status: backendResponse.status });
//   }
  
