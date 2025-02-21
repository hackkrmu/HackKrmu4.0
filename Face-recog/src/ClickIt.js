
export const ClickIt = (transcript) => {
    const PUBLIC_URL = "http://localhost:3000";
    if (transcript === "vision") {
      window.location.href = PUBLIC_URL + "/Vision";
    }
    if (transcript === "object") {
      window.location.href = PUBLIC_URL + "/Vision/Object-recognition";
      console.log(PUBLIC_URL + "/Vision/Object-recognition");
    }
    if (transcript === "home") {
      window.location.href = PUBLIC_URL;
    }
    if (transcript === "face") {
      window.location.href = "http://localhost:3001/";
    }
    if (transcript === "read") {
      window.location.href = PUBLIC_URL + "/Vision/Read-Text";
    }
    if (transcript === "click") {
  
    }
  };
  