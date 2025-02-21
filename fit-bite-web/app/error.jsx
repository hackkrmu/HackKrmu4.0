"use client"; // Error components must be Client Components
import PropTypes from 'prop-types'
import { useEffect } from "react";
import Link from "next/link";
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-gray-600 flex justify-center items-center min-h-screen text-sm sm:text-md">
      <h2 className="mx-2">Something went wrong!</h2>
      <button className="text-blue-500 bg-gray-700 p-1 rounded hover:text-blue-700"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <Link href="/" className="text-blue-500 hover:text-blue-800 ml-2 ">
      | Back to Home Page
      </Link>
    </div>
  );
}
Error.PropTypes= {
  error: PropTypes.object.isRequired,
  reset: PropTypes.func
}