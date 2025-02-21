import React, { useState } from "react";
import { X, Image, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

export interface DiagnosisModalProps {
    isOpen: boolean,
    onClose: () => void,
    diagnosis: string[],
};

const diagnosisOverview: { [key: string]: string } = {
    Uveitis: "Uveitis is inflammation of the uvea, the middle layer of the eye.",
    Cataracts: "Cataracts occur when the eye's natural lens becomes cloudy, leading to impaired vision.",
};



const DiagnosisModal = ({ isOpen, diagnosis, onClose }: DiagnosisModalProps) => {
    const [showSymptoms, setShowSymptoms] = useState<boolean>(false);
    const [showNextSteps, setShowNextSteps] = useState<boolean>(false);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-[#0c101c] border-[1px] border-[#858585] p-6 rounded-lg shadow-lg text-center md:max-w-[500px] w-full">
                <button
                    onClick={onClose}
                    className="flex ml-auto text-white"
                >
                    <X size={25} />
                </button>
                <motion.div
                    variants={{
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
                    className="flex flex-col gap-3"
                >
                    <Image size={60} className="bg-[#21252e] p-2 rounded-md flex mx-auto" />
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
                        className="flex flex-col gap-1"
                    >
                        <h2 className="text-xl tracking-wider font-bold capitalize">
                            Possible Diagnosis:{" "}
                            {Array.isArray(diagnosis) && diagnosis.length > 0
                                ? diagnosis.every((d) => d === "Normal")
                                    ? "You have normal eyes"
                                    : diagnosis.includes("Cataracts") && diagnosis.includes("Uveitis")
                                        ? "Cataracts and Uveitis"
                                        : diagnosis.includes("Cataracts")
                                            ? "Cataracts"
                                            : diagnosis.includes("Uveitis")
                                                ? "Uveitis"
                                                : "Unknown Condition"
                                : "No Diagnosis Available"}
                        </h2>
                        {Array.isArray(diagnosis) ? diagnosis
                            .filter((condition) => condition !== "Normal")
                            .map((condition, index) => (
                                <p key={index} className="w-full text-[#72777d] leading-5 tracking-wide">
                                    {diagnosisOverview[condition]}
                                </p>
                            ))
                            : <p>No diagnosis available</p>
                        }
                        {Array.isArray(diagnosis) && diagnosis.every((condition) => condition === "Normal") ? (
                            <p className="w-full text-[#72777d] leading-5 tracking-wider">
                                Your eyes appear healthy, and no conditions were detected.
                            </p>
                        ) : (
                            <p>No diagnosis available</p>
                        )}
                    </motion.div>

                    <motion.div
                        variants={{
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
                        className="flex flex-col gap-1 p-4 bg-[#21252e] rounded-md w-full"
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
                            className="flex w-full justify-between gap-2"
                        >
                            <h3 className="text-base tracking-widest font-normal">Symptoms</h3>

                            {showSymptoms ? (
                                <ChevronDown
                                    size={25}
                                    onClick={() => setShowSymptoms(false)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            ) : (
                                <ChevronUp
                                    size={25}
                                    onClick={() => setShowSymptoms(true)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            )}
                        </motion.div>

                        {showSymptoms && (
                            <motion.div
                                variants={{
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
                                className="w-[92%]"
                            >
                                {
                                diagnosis.every((condition) => condition === "Normal") ? (
                                        <ul className="list-disc text-left w-full ml-4 text-[#72777d] leading-5 tracking-wider space-y-2">
                                            <motion.li
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
                                            >No abnormalities detected in the eye.</motion.li>
                                            <motion.li
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
                                            >The eye appears healthy with no signs of inflammation, cataracts, or other conditions.</motion.li>
                                            <motion.li
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
                                            >Vision clarity and eye health are within normal parameters.</motion.li>
                                        </ul>
                                    ) : (
                                        diagnosis
                                            .filter((condition) => condition !== "Normal")
                                            .map((condition, index) => (
                                                <motion.div
                                                    variants={{
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
                                                    key={index}
                                                    className="flex flex-col gap-1"
                                                >
                                                    <h4 className="text-sm font-semibold text-left">{condition}</h4>
                                                    <ul className="list-disc text-left w-full ml-4 text-[#72777d] leading-5 tracking-wider space-y-2">
                                                        {condition === "Uveitis" && (
                                                            <>
                                                                <motion.li
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
                                                                >Eye redness.</motion.li>
                                                                <motion.li
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
                                                                >Pain in or around the eye.</motion.li>
                                                                <motion.li
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
                                                                >Blurred or reduced vision.</motion.li>
                                                                <motion.li
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
                                                                >Sensitivity to light.</motion.li>
                                                                <motion.li
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
                                                                >Floaters (dark spots in your vision).</motion.li>
                                                            </>
                                                        )}
                                                        {condition === "Cataracts" && (
                                                            <>
                                                                <motion.li
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
                                                                >Blurry or cloudy vision.</motion.li>
                                                                <motion.li
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
                                                                >Sensitivity to bright light or glare.</motion.li>
                                                                <motion.li
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
                                                                >Fading or yellowing of colors.</motion.li>
                                                                <motion.li
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
                                                                >Difficulty seeing at night or in dim lighting.</motion.li>
                                                                <motion.li
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
                                                                >Seeing halos around lights.</motion.li>
                                                            </>
                                                        )}
                                                    </ul>
                                                </motion.div>
                                            ))
                                    )}
                            </motion.div>
                        )}
                    </motion.div>
                    <motion.div
                        variants={{
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
                        className="flex flex-col gap-1 p-4 bg-[#21252e] rounded-md w-full"
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
                            className="flex w-full justify-between gap-2"
                        >
                            <h3 className="text-base tracking-widest font-normal">Next Steps</h3>

                            {showNextSteps ? (
                                <ChevronDown
                                    size={25}
                                    onClick={() => setShowNextSteps(false)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            ) : (
                                <ChevronUp
                                    size={25}
                                    onClick={() => setShowNextSteps(true)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            )}
                        </motion.div>
                        {showNextSteps && (
                            <motion.div
                                variants={{
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
                                className="w-[92%]"
                            >
                                {diagnosis.every((condition) => condition === "Normal") ? (
                                    <ul className="list-decimal text-left w-full ml-5 text-[#72777d] leading-5 tracking-wider space-y-2">
                                        <motion.li
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
                                        >
                                            Continue regular eye care practices:
                                            <ul className="list-disc text-left ml-4">
                                                <li>Get annual eye exams to maintain eye health.</li>
                                                <li>Wear UV-protective sunglasses when outdoors.</li>
                                            </ul>
                                        </motion.li>
                                        <motion.li
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
                                        >Maintain good eye hygiene by washing your hands before touching your face or eyes.</motion.li>
                                        <motion.li
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
                                        >
                                            If you experience new symptoms such as redness, pain, or vision changes, seek an eye specialist for a
                                            check-up.
                                        </motion.li>
                                        <motion.li
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
                                        >
                                            Stay hydrated and maintain a healthy diet with eye-friendly nutrients (e.g., Vitamin A, lutein, and
                                            zeaxanthin).
                                        </motion.li>
                                    </ul>
                                ) : (
                                    diagnosis
                                        .filter((condition) => condition !== "Normal")
                                        .map((condition, index) => (
                                            <motion.div
                                                variants={{
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
                                                key={index}
                                                className="flex flex-col gap-1"
                                            >
                                                <h4 className="text-sm font-semibold text-left">{condition}</h4>
                                                <ul className="list-decimal text-left w-full ml-5 text-[#72777d] leading-5 tracking-wider space-y-2">
                                                    {condition === "Uveitis" && (
                                                        <>
                                                            <motion.li
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
                                                            >Avoid rubbing your eyes, as this may worsen irritation.</motion.li>
                                                            <motion.li
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
                                                            >Rest your eyes and minimize exposure to bright light (use sunglasses indoors or outdoors).</motion.li>
                                                            <motion.li
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
                                                            >Use over-the-counter artificial tears to relieve discomfort temporarily.</motion.li>
                                                            <motion.li
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
                                                            >
                                                                If symptoms worsen or include severe pain, loss of vision, or extreme sensitivity to light, seek
                                                                immediate medical attention.
                                                            </motion.li>
                                                            <motion.li
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
                                                            >
                                                                Consult an ophthalmologist to confirm the diagnosis and begin treatment (e.g., corticosteroid eye
                                                                drops or other medications).
                                                            </motion.li>
                                                        </>
                                                    )}
                                                    {condition === "Cataracts" && (
                                                        <>
                                                            <motion.li
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
                                                            >Avoid bright lights or glare by wearing polarized or anti-glare glasses.</motion.li>
                                                            <motion.li
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
                                                            >
                                                                Schedule an appointment with an ophthalmologist to discuss cataract surgery if vision loss affects
                                                                your daily life.
                                                            </motion.li>
                                                            <motion.li
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
                                                            >
                                                                Use brighter lights for activities such as reading or cooking to compensate for reduced vision.
                                                            </motion.li>
                                                            <motion.li
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
                                                            >Avoid smoking and maintain a diet rich in antioxidants to slow cataract progression.</motion.li>
                                                            <motion.li
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
                                                            >
                                                                If your vision deteriorates rapidly or becomes significantly worse, seek professional medical
                                                                advice promptly.
                                                            </motion.li>
                                                        </>
                                                    )}
                                                </ul>
                                            </motion.div>
                                        ))
                                )}
                            </motion.div>
                        )}
                    </motion.div>
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
                    className="flex justify-between gap-2"
                >
                    <button
                        onClick={() => window.location.href = "/diagnosis"}
                        className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out border-[#1d212b] border-[2px] hover:bg-[#1d212b] hover:border-transparent text-white py-2 px-2 rounded shadow-md tracking-wider mt-4"
                    >
                        <RotateCcw
                            size={25}
                            className=""
                        />
                    </button>
                    <button
                        onClick={() => window.location.href = "/services"}
                        className="hover:scale-105 cursor-pointer transform duration-300 ease-in-out bg-[#1d212b] border-[2px] border-transparent hover:border-[#1d212b] border-[2px] hover:bg-transparent text-white py-2 px-4 rounded shadow-lg tracking-wider mt-4"
                    >
                        Nearby Clinical Services
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default DiagnosisModal;


