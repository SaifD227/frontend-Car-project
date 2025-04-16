"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaFacebook } from "react-icons/fa";
import bgImage from "../../../public/images (16).jpeg";
import image1 from "../../../public/man.jpeg";
import image2 from "../../../public/man1.jpeg";
import image3 from "../../../public/man3.jpeg";
import image4 from "../../../public/man4.jpeg";
import image5 from "../../../public/man5.jpeg";

const testimonials = [
  {
    name: "Jon Doe",
    text: "Very happy and excited with my Car thanks to Toyota Sharrom",
    image: image1,
  },
  {
    name: "ANTHONY TIMSIT",
    text: "Very happy and excited with my Car thanks to Car Adviser",
    image: image2,
  },
  {
    name: "ADI COACHELI",
    text: "Very happy and excited with my Car thanks to Saif Adviser",
    image: image3,
  },
  {
    name: "ADI COACHELI",
    text: "Very happy and excited with my Car thanks to PakWheel Adviser!",
    image: image4,
  },
  {
    name: "Jon Doe",
    text: "Very happy and excited with my Car thanks to Pak Motor Adviser.",
    image: image5,
  },
  {
    name: "ADI COACHELI",
    text: "Very happy and excited with my Car thanks to UK Adviser",
    image: image1,
  },
];

const ClientThanks = () => {
  return (
    <div className="relative w-full min-h-[450px] flex flex-col items-center justify-center text-white bg-black">
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Client Reviews Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-green-400 text-center uppercase tracking-wider mb-6">
        What Our Clients Say About Us
      </h2>

      <div className="relative z-10 w-full max-w-5xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
                <p className="text-yellow-400 text-xl">★★★★★</p>
                <p className="text-sm mt-3 italic">{testimonial.text}</p>
                <div className="flex items-center justify-center mt-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-green-400"
                  />
                  <p className="ml-3 text-lg font-semibold">
                    {testimonial.name}
                  </p>
                  <FaFacebook className="ml-3 text-blue-500 text-xl" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientThanks;
