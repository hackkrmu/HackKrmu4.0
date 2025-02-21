"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="block top-20 w-full py-6 md:py-104 px-20 md:px-50">
      <div className="flex items-center justify-between md:mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
              duration: 0.8,
              // delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-3xl md:text-5xl text-[#FFFFFF] font-semibold font-sans tracking-wide"
        >
          <Link href="/">
            <div className="flex">
              <span className="block mr-1"></span>
              <Image 
                src="/logo.png" 
                alt="Logo"
                width="135"
                height="100"
                className="max-w-12 md:max-w-72 max-h-12 md:max-h-72"
                >
              </Image>
            </div>
            <span className="block ml-10"></span>
          </Link>
        </motion.div>

        <motion.div
          variants= {{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                ease: "easeInOut"
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row gap-10 sm:gap-10 text-sm sm:text-3xl text-[#858585] text-right font-sans font-light"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  ease: "easeInOut"
                }
              },
            }}
          >
            <Link
              href="/services" 
              className={`duration-300 transition ease-in-out ${
                pathName === "/services" ? "underline text-[#FFFFFF]" : "hover:underline hover:text-[#FFFFFF]"
              }`}>
              SERVICES
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  ease: "easeInOut"
                }
              },
            }}
          >
            <Link
              href="/diagnosis" 
              className={`duration-300 transition ease-in-out ${
                pathName === "/diagnosis" ? "underline text-[#FFFFFF] duration-300" : "hover:underline hover:text-[#FFFFFF]"
              }`}>
              DIAGNOSIS
            </Link>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  ease: "easeInOut"
                }
              },
            }}
          >
            <Link 
              href="/" 
              className={`duration-300 transition ease-in-out ${
                pathName === "/" ? "underline text-[#FFFFFF] duration-300" : "hover:underline hover:text-[#FFFFFF]"
              }`}>
              HOME
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}
