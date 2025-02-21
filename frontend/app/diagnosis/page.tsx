"use client"

import Image from "next/image";
import React from "react";

import { BiAperture } from "react-icons/bi";
import { useState } from "react";
import DiagnosisButton from "../../components/diagnosisButton"
import DiagnosisModal from "../../components/diagnosisModal";
import { motion } from "motion/react";



export default function Diagnosis() {
    const [open, setOpen] = useState<boolean>(false);
    const [diagnosis, setDiagnosis] = useState<string[]>([]);

    const handleDiagnose = (result: string[]) => {
        setDiagnosis(result);
        setOpen(true);
    };

    return (
        <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-4 font-sans">
            <motion.div
                variants= {{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            delay: 0,
                            staggerChildren: 0.5,
                            ease: "easeInOut"
                        },
                    },
                }}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3 md:gap-5 w-5/6 mx-auto md:mx-0"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                            }
                        },
                    }}
                    className="flex flex-col w-full md:w-5/6 text-center md:text-left text-balance mx-auto md:mx-0"
                >
                    <h1 className="flex text-xl md:text-2xl leading-snug font-medium mx-auto md:mx-0 gap-2">
                        <p>Patient Imaging</p>
                        <BiAperture className="my-auto text-3xl" />
                    </h1>
                    <p className="text-[#FFFFFF] mt-1 md:mt-6 text-sm md:text-base leading-relaxed font-light">
                    Our application quickly diagnoses eye conditions using self-taken pictures.
                    Upload a clear image of your eye to get started and receive a fast, general diagnosis.
                    </p>
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                            }
                        },
                    }}
                    className="relative bg-[url('/lamp.png')] bg-repeat-round md:bg-no-repeat bg-contain md:bg-cover bg-right-top md:bg-center rounded-xl w-full md:w-2/3 h-32 md:h-80 flex items-center justify-center"
                >
                    <p className="text-2xl md:text-6xl font-extrabold absolute top-10 md:top-28 -left-1 md:-left-20 rotate-90">PATIENT</p>
                    <p className="text-2xl md:text-6xl font-extrabold absolute -bottom-5 md:-bottom-10 left-10 md:left-6">IMAGING</p>
                    <DiagnosisButton onDiagnose={handleDiagnose} />
                    <hr className="absolute -bottom-3 md:-bottom-6 right-1 md:right-5 w-1/2 border-t-4 border-[#FFFFFF] rounded-full" />
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                            }
                        },
                    }}
                    className="flex flex-row md:flex-col mt-11 md:mt-14 gap-1 md:gap-6 justify-between w-full md:w-4/5 text-left my-auto"
                >
                    <div className="flex md:gap-2">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-0 w-2/5 md:w-1/6">
                            <p className="font-semibold text-xl md:text-4xl my-auto">1000+ </p>
                            <p className="font-light text-sm md:text-lg my-auto">Photos</p>
                        </div>
                        <p className="hidden md:block w-4/5 text-left text-xs md:text-lg">Our imaging utilizes an advanced AI-trained model developed with a 
                        combination of hand-selected photos and online datasets to detect uveitis and cataracts.</p>
                    </div>
                    <div className="flex md:gap-2">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-0 w-2/5 md:w-1/6">
                            <p className="font-semibold text-xl md:text-4xl my-auto">95%</p>
                            <div className="flex flex-col">
                                <p className="font-light text-sm md:text-lg my-auto">Confidence</p>
                                <p className="font-light text-sm md:text-lg my-auto">Score</p>
                            </div>
                        </div>
                        <p className="hidden md:block w-4/5 text-left text-xs md:text-lg">With a confidence score of 93.23% for cataracts and 80.61% for uveitis, 
                        our system accurately detects subtle patterns in eye images, reducing false diagnoses and enabling timely intervention for better patient outcomes.</p>
                    </div>
                </motion.div>
            </motion.div>
            <Image
                src="/eyenova.png"
                alt="Eye Nova Image"
                width={500} 
                height={100}
                className="hidden md:block md:max-h-[60vh]"
            />
            <DiagnosisModal isOpen={open} onClose={() => setOpen(false)} diagnosis={diagnosis} />

        </div>     
    );
  }