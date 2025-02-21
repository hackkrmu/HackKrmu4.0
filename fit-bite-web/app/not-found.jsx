import React from "react";
import Link from "next/link";
function NotFound() {
  return (
    <div className="text-gray-600 flex justify-center items-center min-h-screen text-sm sm:text-md ">
      Page Not found{" "}
      <Link href="/" className="text-blue-500 hover:text-blue-800 ml-4 ">
        Back to Home Page
      </Link>
    </div>
  );
}

export default NotFound;
