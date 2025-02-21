"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="absolute flex text-[#858585] font-sans bottom-1 md:bottom-2 py-1 md:py-0 px-2 md:px-6 w-full justify-center md:justify-end items-center gap-2 md:gap-4 mt-auto">
        <div className="flex flex-col text-xs md:text-xl">
            <a href="https://www.youtube.com/" target="_blank" className="text-center">made by/ 💥</a>
            <p>Atmo Eye &apos;25</p>
        </div>
        <div>
        <Link href="https://github.com/OmmRout/EYE_MAIN" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-5 md:w-10 h-5 md:h-10 hover:text-gray-400" />
        </Link>
      </div>
    </footer>
  );
}
