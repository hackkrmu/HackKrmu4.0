"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
// import { cartLength } from "../functions/cart";
import { UserContext } from "../Context/UserProvider";
import { useEffect, useState } from "react";
function Navbar() {
  const { loggedIn, login, logout, contextLoading, cartData } =
    React.useContext(UserContext);
  // if (!user.value) {
  //   // Render loading indicator or alternative content while user data is fetching
  //   return <div className="lds-hourglass"></div>;
  // }
  const [dropdown, setDropdown] = useState(false);
  // const [userExists, setuserExists] = useState();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // console.log("token", token);
    // if (token) {
    //   setuserExists({ value: token });
    // }
    if (!contextLoading) {
      login()
      if (loggedIn) {
        login();
        // console.log(user);
      } else {
        console.log("User is not logged in");
        // console.log(user);
      }
    }
  }, [contextLoading, loggedIn, login]);
  // console.log(userExists);
  const toggleDropdown = () => {
    // console.log(dropdown)
    setDropdown(!dropdown);
  };
  // // login()
  // console.log('User:', user);
  // console.log('Logged In:', loggedIn);
  // console.log("User", user);
  // console.log(loggedIn, login, logout, user)
  //   console.log(loggedIn, login, logout, user);

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-1 flex-row items-center justify-between">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-violet-100 "
        >
          <Image src="/logo.png" alt="logo" width={50} height={50} className="h-auto w-auto"/>

          <span className="ml-3 text-xl hidden sm:block">FitBite</span>
        </Link>

        <nav className="md:ml-auto md:mr-auto  flex-wrap items-center justify-center text-sm sm:text-[16px] hidden md:block">
          <Link
            href="/add-restaurant"
            className="mr-5 hover:text-indigo-600 cursor-pointer"
          >
            Add Restaurant
          </Link>
          {/* <a className="mr-5 hover:text-gray-900">Login</a> */}
          <Link
            href="/signup"
            className="mr-5 hover:text-indigo-600 cursor-pointer"
          >
            Create Account
          </Link>

          <Popover>
            <PopoverTrigger>Dishes</PopoverTrigger>
            <PopoverContent className=" w-full h-full flex flex-col shadow-indigo-600/100 border-none shadow-md text-indigo-600 bg-black">
              {/* <div className="hover:shadow-md mb-3 p-0"> */}
              <Link
                href="/dishes/meals"
                className=" hover:text-pink-600 cursor-pointer hover:shadow-md mb-3 p-0"
              >
                Meals
              </Link>
              {/* </div> */}
              <div className="hover:shadow-md mb-3">
                <Link
                  href="/dishes/pastries"
                  className="mb-5 hover:text-pink-600 cursor-pointer"
                >
                  Smoothies
                </Link>
              </div>
              <div className="hover:shadow-md">
                <Link
                  href="/dishes/desserts"
                  className=" hover:text-pink-600 cursor-pointer"
                >
                  Breakfast
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </nav>
        
        {/* <div className=" flex flex-col absolute  shadow-md text-indigo-600 bg-black ml-5 right-7 mr-12  " onClick={toggleDropdown}>
      
      
    <div className={`p-2 absolute flex flex-col items-center border-slate-900 shadow-md text-indigo-600 bg-black right-8 top-7  ml-8 ${dropdown ? " " : "hidden"}`}>
    <ul >
      <li>
        <Link className='hover:text-pink-600 cursor-pointer hover:shadow-md mb-3 p-0' href="/category1">Category 1=</Link>
      </li>
      <li>
        <Link className='mb-5 hover:text-pink-600 cursor-pointer' href="/category2">Category 2</Link>
      </li>
      <li>
        <Link className=" hover:text-pink-600 cursor-pointer" href="/category3">Category 3</Link>
      </li>
    </ul>
    </div>
    Home
  </div> */}
        {/* <a href = '/dishes' className="mr-5 hover:text-indigo-600 cursor-pointer">Dishes</a> */}

        {/* {user?.value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
              onMouseOver={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />{" "}
            </svg>
          ) : (
            <>
              <Link href="/login">
                <button className="inline-flex items-center hover:text-indigo-600 bg-indigo-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
                  Login
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
            </>
          )}
     */}
        {/* {user.value ? (
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person-lines-fill"
                viewBox="0 0 16 16"
                onMouseOver={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />{" "}
              </svg>
            ) : (
              
                <>
                  
              <button href="/login" className="inline-flex items-center hover:text-indigo-600 bg-indigo-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
                  Login
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
                </>
              
            )} */}
        {/* <span className="text-gray-700">items: {item.length}</span>
        <span className="text-gray-700">{item.name}</span> */}
        <span className="flex justify-center items-center">
          <span className="md:hidden">
            <Popover>
              <PopoverTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-list w-5 h-5 md:w-6 md:h-6"
                  onMouseOver={toggleDropdown}
                  onMouseLeave={toggleDropdown}
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />{" "}
                </svg>
              </PopoverTrigger>

              <PopoverContent className=" w-full h-full flex flex-col border-none shadow-pink-500/100 shadow-md text-indigo-600 bg-black text-[12px] sm:text-[16px]">
                <Link
                  href="/dishes"
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Dishes
                </Link>
                <Link
                  href="/add-restaurant"
                  className="hover:text-indigo-600 cursor-pointer my-3"
                >
                  Add Restaurant
                </Link>
                {/* <a className="hover:text-gray-900">Login</a> */}
                <Link
                  href="/signup"
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Create Account
                </Link>
              </PopoverContent>
            </Popover>
          </span>


       
          <Popover>
            <PopoverTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="24"
                // height="24"
                fill="currentColor"
                className="bi bi-person-lines-fill w-5 h-5 md:w-6 md:h-6 ml-4 md:ml-0 mb-2"
                viewBox="0 0 16 16"
                onMouseOver={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />{" "}
              </svg>
            </PopoverTrigger>
            {/* {user?.value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
              onMouseOver={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />{" "}
            </svg>
          ) : (
            <>
              <Link href="/login">
                <button className="inline-flex items-center hover:text-indigo-600 bg-indigo-100 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
                  Login
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
            </>
          )} */}

            {/* <div className="lds-hourglass"></div> */}

            {/* <div className="hover:shadow-md mb-3 p-0"> */}
            <PopoverContent className=" w-full h-full flex flex-col border-none shadow-pink-500/100 shadow-md text-indigo-600 bg-black text-sm sm:text-[16px]">
              {loggedIn ? (
                <>
                  <Link
                    href="/account"
                    className=" hover:text-pink-600 cursor-pointer hover:shadow-md mb-3 p-0"
                  >
                    Account
                  </Link>

                  <div className="hover:shadow-md mb-3">
                    <Link
                      href="/orders"
                      className="mb-5 hover:text-pink-600 cursor-pointer"
                    >
                      Orders
                    </Link>
                  </div>
                  <div className="hover:shadow-md" onClick={logout}>
                    <Link
                      href="/login"
                      className=" hover:text-pink-600 cursor-pointer"
                    >
                      Logout
                    </Link>
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <button className="inline-flex items-center hover:text-pink-600  border-0 py-1 px-3 focus:outline-none rounded  mt-4 md:mt-0 text-sm sm:text-[16px]">
                    Login
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
              )}
            </PopoverContent>
          </Popover>
          <span className="ml-4 mt-3 mr-6">
        <Link
            href="/Checkout"
            className="mr-5 hover:text-indigo-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart text-gray-400 mt-[4px]"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
            </svg>
          </Link>
              <span className="text-xs text-violet-600 top-7 absolute"> {cartData} </span>
          </span>
        </span>
        {/* <a href="/cart" className="text-gray-600">
          {}
        </a> */}
         
      </div>
      
    </header>
  );
}

export default Navbar;
