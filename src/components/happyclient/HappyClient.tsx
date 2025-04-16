"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { FaCar, FaBuilding, FaCoffee, FaHeart, FaFileAlt } from "react-icons/fa";
import image from "../../../public/images (16).jpeg"; 

const stats = [
  { icon: <FaCar />, value: 1760, label: "Cars in Fleet" },
  { icon: <FaBuilding />, value: 6700, label: "Days in Business" },
  { icon: <FaCoffee />, value: 7300, label: "Coffee Cups" },
  { icon: <FaHeart />, value: 5600, label: "Happy Customers" },
  { icon: <FaFileAlt />, value: 6800, label: "Sheets of Paper" },
];

const HappyClient = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image} // ✅ Correct Usage
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent"></div>
      </div>

      {/* Counter Stats */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3  md:grid-cols-5  md:gap-28 text-center ">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center  space-y-2">
            <div className="text-4xl">{stat.icon}</div>
            <h2 className="text-3xl font-bold">
              <CountUp start={0} end={stat.value} duration={3} />
            </h2>
            <p className="text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HappyClient;








