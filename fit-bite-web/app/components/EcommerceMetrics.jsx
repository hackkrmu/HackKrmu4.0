"use client"
import React, { useState, useEffect } from 'react'
// import { GroupIcon } from './icons'
import Image from 'next/image'
import { ArrowDownIcon } from './icons'
import Badge from './ui/badge/Badge'
import { useRouter } from 'next/navigation'
function EcommerceMetrics() {
  const [dessertData, setDessertData] = useState(0);
  const [orderData, setorderData] = useState(0);
     const router = useRouter();
    async function render() {
      try {
          const response = await fetch("/api/ecommerce", {
            method: "GET",
          });
          let res = await response.json();
          // console.log(res);
          if (response.status === 200) {
            setDessertData(res.result);
            // console.log(res.result, "response orders");
          }
      }catch (err) {
      console.log(err)
      }
      }
    async function render2() {
      try {
          const response = await fetch("/api/orderCount", {
            method: "GET",
          });
          let res = await response.json();
          // console.log(res);
          if (response.status === 200) {
            setorderData(res.result);
            // console.log(res.result, "response orders");
          }
      }catch (err) {
      console.log(err)
      }
      }
  
    useEffect(() => {
      render()
      render2()
    }, []);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
  {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
  <Image src="./group.svg" alt="Icon" width={50} height={50} className="text-gray-800 size-6 dark:text-white/90" />
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Customers
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {dessertData}
          </h4>
        </div>
        <Badge color="success">
        <Image src="./arrow-up.svg" alt="Icon" width={50} height={50} className="text-gray-800 size-6 dark:text-white/90" />
          11.01%
     </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}

    {/* <!-- Metric Item Start --> */}
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
      <Image src="./box-line.svg" alt="Icon" width={50} height={50} className="text-gray-800 dark:text-white/90" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Orders
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {orderData}
          </h4>
        </div>
        <Badge color="error">
        <Image src="./arrow-down.svg" width={50} height={50} className="text-error-500" />
          9.05%
      </Badge>
      </div>
    </div>
    {/* <!-- Metric Item End --> */}
  </div>
  )
}

export default EcommerceMetrics