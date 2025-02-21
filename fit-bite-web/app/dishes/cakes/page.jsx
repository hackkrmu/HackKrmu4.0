import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

function MenuPage() {

  return (
    <div>
      <Head>
        <title>Restaurant Menu</title>
      </Head>
      <h1 className="text-3xl font-semibold mb-4 mx-12 mt-24 sm:mt-12 text-gray-600">
        Restaurant Menu for Cakes
      </h1>
      <span className="mx-12 text-gray-700">Total menu items 20</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          key={0}
          className=" rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/cakes/large">
            <Image
              src="https://res.cloudinary.com/dkv7cimyy/image/upload/v1704205501/Zomato%202.0/dishes/desserts/1.jpg"
              width={400}
              height={400}
              alt="Large Cakes"
              className="w-full h-36 object-cover mb-2"
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Large Cakes
            </h2>
          </Link>
          <p className="text-gray-600">Cakes for bigger parties</p>
          <p className="text-gray-600">$17.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>

        {/* //Small cakes */}

        <div
          key={1}
          className="rounded-xl p-4 shadow-2xl shadow-violet-500/30 m-8 opacity-100"
        >
          <Link href="/dishes/cakes/small">
            <Image
              src="http://res.cloudinary.com/dkv7cimyy/image/upload/v1704206897/Zomato%202.0/dishes/cakes/SmallCakes/9.jpg"
              alt="Small sized cakes"
              width={600}
              height={600}
              className="w-full h-36 object-cover mb-2"
            />
            <h2 className="text-xl text-violet-700 font-semibold mb-2">
              Small sized Cakes
            </h2>
          </Link>
          <p className="text-gray-600">Cakes for small gatherings</p>
          <p className="text-gray-600">$3.99 onwards</p>
          <div className="mt-2 flex justify-between items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
