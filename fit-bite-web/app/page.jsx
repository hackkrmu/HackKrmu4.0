import Image from "next/image";
import Link from "next/link";
import React from "react";
import Head from "next/head";
export default function Home() {
  // 1155x1397
  return (
    <>    <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
    <main className="flex  flex-col items-center justify-between mb-36 md:mb-0 md:px-24">
     
    
    
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 md:py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-8 md:mb-10 ">
            <Image
              className="object-cover object-center rounded "
              alt="hero"
              src="/logo.png"
              width={720}
              height={600}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font md:text-4xl text-2xl mb-4 font-medium text-indigo-100">
              FitBite covers it all !!😃❤
            </h1>
            <p className="mb-8 text-sm sm:text-[16px] leading-relaxed mx-8">
              Explore menus, and millions of restaurant photos and reviews from
              users just like you, to find your next great meal.
            </p>
            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
                <label
                  htmlFor="hero-field"
                  className="leading-7 text-xs sm:text-sm sm:mr-52 md:mr-0 text-gray-600 "
                >
                  {` Starving for?`}
                </label>
                <input
                  type="text"
                  id="hero-field"
                  value="What's Cooking!"
                  name="hero-field"
                  readOnly={true}
                  className="w-36 sm:w-full ml-2  sm:text-[16px] bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out bg-black text-indigo-500"
                />
              </div>
              <Link href="/dishes">
                <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-md sm:text-lg cursor-pointer">
                  Order
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
            <p className="text-sm mt-4 text-gray-500 mb-8 w-full">
              From swanky upscale restaurants to the cosiest hidden gems
            </p>
            <p className="text-xs mt-2 text-gray-500 mb-4 w-full sm:hidden">
              ----Download On----
            </p>
            <div className="flex lg:flex-row md:flex-col">
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 512 512"
                >
                  <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                </svg>
                <Link href="https://play.google.com/store/apps/details?id=com.application.zomato&pcampaignid=web_share">
                  <span className="ml-4 items-start flex-col leading-none hidden sm:block">
                    <span className="text-xs text-gray-600 mb-1">
                      GET IT ON
                    </span>
                    <br />
                    <span className="title-font font-medium ">Google Play</span>
                  </span>
                </Link>
              </button>
              <button className="bg-gray-100 inline-flex p-2 py-3 px-5 rounded-lg items-center lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 305 305"
                >
                  <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                  <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                </svg>
                <Link href="https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896">
                  <span className="ml-4  items-start flex-col leading-none hidden sm:block">
                    <span className="text-xs text-gray-600 mb-2 ">
                      Download on the
                    </span>
                    <br />
                    <span className="title-font font-medium">App Store</span>
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>

  );
}
