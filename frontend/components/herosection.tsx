"use client";

import { Button } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from "next/image";
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";

export default function HeroSection() {
    return (
        <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-16 font-sans">
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            delay: 0,
                            staggerChildren: 0.3,
                            ease: "easeInOut"
                        },
                    },
                }}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.8,
                                ease: "easeInOut"
                            }
                        },
                    }}
                    className="flex flex-col w-11/12 md:w-2/3 text-center md:text-left text-balance gap-6 mx-auto md:mx-0"
                >
                    <h1 className="text-2xl md:text-6xl leading-snug font-medium mx-auto md:mx-0 text-[#FFFFFF]">
                        <Typewriter
                            words={["AI POWERED", "EARLY", "EYE DIAGNOSIS SYSTEM"]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={100}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </h1>
                    <hr className="block md:hidden w-7/12 border-t-4 border-[#FFFFFF] rounded-full mx-auto" />
                    <p className="text-[#FFFFFF] mt-0 md:mt-6 text-xs md:text-lg leading-relaxed font-light">
                        Our application leverages advanced AI-driven visual computing to aid in the early diagnosis of uveitis and cataracts—two 
                        critical eye conditions that can lead to vision loss if untreated. By analyzing patient-provided eye images, the system detects
                        early signs of inflammation or lens clouding, enabling timely intervention. This software is designed to improve diagnostic accuracy,
                        reduce false positives, and provide patients with accessible, quick, and reliable preliminary assessments. Early detection can significantly 
                        enhance treatment outcomes and preserve vision.
                    </p>
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.8,
                                ease: "easeInOut"
                            }
                        },
                    }}
                    className="mt-4 md:mt-8 w-11/12 md:w-2/3 flex justify-between mx-auto md:mx-0"
                >
                    <Button
                        href="/services"
                        variant="contained"
                        sx={{
                            color: "#1E1E1E",
                            backgroundColor: "#F9C7FF",
                            fontSize: { xs: "14px", md: "16px" },
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#E6B0E6",
                                transform: "scale(1.05)"
                            },
                        }}

                    >
                        Services
                    </Button>
                    <Button
                        href="/diagnosis"
                        variant="text"
                        sx={{
                            color: "#FFFFFF",
                            display: "absolute",
                            gap: "10px",
                            alignItems: "center",
                            fontSize: { xs: "16px", md: "18px" },
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        Get Started
                        <BsArrowUpRightCircle className="hover:animate-spin text-[#F9C7FF]" style={{ fontSize: "26px" }} />
                    </Button>
                </motion.div>
            </motion.div>
            <Image
                src="/logo.png"
                alt="Image"
                width={1200}
                height={400}
                className="hidden md:block md:max-h-[60vh]"
            />
        </div>
    );
}
