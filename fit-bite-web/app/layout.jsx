// import PropTypes from 'prop-types';
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";

import { UserProvider } from "./Context/UserProvider";
import Head from "next/head";
//new
import { Outfit } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SidebarProvider } from "./Context/SidebarContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { ChatProvider } from "./Context/ChatContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "FitBite",
  description: "0-n Healthy Meals",

};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <UserProvider>
          <body className={`${inter.className} bg-black`}>
            <Navbar  />
            <ThemeProvider>
            <SidebarProvider>
      <ChatProvider>
            {children}
            </ChatProvider>
            </SidebarProvider>
        </ThemeProvider>
            <Footer/>
          </body>
            </UserProvider>
            {/* </Suspense> */}
        </html>
  );
}
// RootLayout.propTypes = {
//   children: PropTypes.node,
// };