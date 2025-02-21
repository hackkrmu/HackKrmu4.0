"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button, Skeleton, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });


type Clinic = {
  lat: number;
  lon: number;
  name: string;
  address: string;
};

export default function Services() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [userLocation, setUserLocation] = useState({ lat: 33.648821, lon: -117.842844 }); // set default location to uci
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [userIcon, setUserIcon] = useState<L.Icon | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    import("leaflet").then((L) => {
      const clinicIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
      });
      setCustomIcon(clinicIcon);

      const userLocationIcon = new L.Icon({
        iconUrl: "https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png", // Different color for user
        iconSize: [50, 50],
        iconAnchor: [50, 50],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 30],
      });
      setUserIcon(userLocationIcon);
    });
  }, []);


  useEffect(() => {
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
    async function fetchClinics() {
      try {
        console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
        const response = await fetch(
          `http://localhost:5001/api/nearby-clinics?lat=${userLocation.lat}&lon=${userLocation.lon}`
          // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/nearby-clinics?lat=${userLocation.lat}&lon=${userLocation.lon}`
        );
        const data = await response.json();
        console.log("Fetched Clinics:", data); 
        setClinics(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchClinics();
  }, [userLocation]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

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
        className="flex flex-col gap-2 md:gap-5 w-full md:w-5/6"
      >
        <hr className="w-3/4 border-t-2 border-[#FFFFFF] mb-4 mx-auto md:mx-0" />
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
          className="flex flex-col mt-2 gap-2 w-full md:w-3/4 text-center md:text-right"
        >
          <div className="flex gap-10">
            <div className="flex flex-col w-full md:w-4/5">
              <p className="font-semibold text-2xl text-center md:text-left mx-auto md:mx-0 px-6 md:px-0">Find Trusted Nearby Optometry Clinics</p>
            </div>
            <p className="hidden md:block w-/5 text-left">
            Welcome to AtmoEye’s map feature, where we utilize Nominatim with OpenStreetMap, the Overpass API, and Leaflet to connect you with nearby trusted experts.
            </p>
          </div>
          <div className="flex justify-end mt-3 md:mt-0 mx-auto md:mx-0">
            <Button
              href="https://www.google.com/maps/search/optometry+near+me/"
              target="_blank"
              variant="text"
              sx={{
                color: "#FFFFFF",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontSize: { xs: "12px", md: "18px" },
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                borderRadius: "20px",
                padding: "4px 24px",
                border: "2px solid",
                borderColor: "#F9C7FF",
              }}
            >
              MAPS
              <MdLocationOn className="text-[#F9C7FF]" style={{ fontSize: "24px" }} />
            </Button>
          </div>
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
        >
          {loading ? (
            <Box
              sx={{
                width: "75%",
                height: {xs:"30vh", md:"50vh"},
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                margin: {xs: "auto", md: "0"},
                marginTop: {xs: "10px", md: "0"}
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
                sx={{ borderRadius: "8px" }}
              />
            </Box>
          ) : (
          <MapContainer
            center={[userLocation.lat, userLocation.lon]}
            zoom={13}
            style={{ width: "75%", height: "50vh" }}
            className="rounded-lg shadow-md mx-auto md:mx-0 max-h-[35vh] md:max-h-[50vh] mt-10 md:mt-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {userIcon && (
              <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </Marker>
            )}
            {customIcon &&
              clinics.map((clinic, index) => (
                <Marker key={index} position={[clinic.lat, clinic.lon]} icon={customIcon}>
                  <Popup>
                    <strong>{clinic.name}</strong>
                    <br />
                    {clinic.address}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
          )}
        </motion.div>

        <hr className="w-3/4 border-t-2 border-[#FFFFFF] mt-6 md:mt-3 mb-4 mx-auto md:mx-0" />
      </motion.div>
      <Image
        src="/eyenova2.png"
        alt="Eye Nova Image"
        width={500}
        height={100}
        className="hidden md:block md:max-h-[60vh]"
      />
    </div>
  );
}