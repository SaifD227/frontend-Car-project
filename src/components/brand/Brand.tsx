"use client"; // Next.js 13+ ke liye agar required ho

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import catalog1 from "../../../public/catalog1.webp";
import catalog2 from "../../../public/catalog2.webp";
import catalog3 from "../../../public/catalog3.webp";
import catalog4 from "../../../public/catalog4.webp";
import catalog5 from "../../../public/catalog5.webp";
import catalog6 from "../../../public/catalog6.webp";
import catalog7 from "../../../public/catalog7.webp";
import catalog8 from "../../../public/catalog8.webp";
import catalog9 from "../../../public/catalog9.webp";
import catalog10 from "../../../public/catalog10.webp";

const images = [catalog1, catalog2, catalog3, catalog4, catalog5, catalog6, catalog7, catalog8, catalog9, catalog10];

const Brand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default for Desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 my-8 overflow-hidden">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2 flex justify-center">
            <Image src={img} alt={`Brand ${index + 1}`} width={150} height={100} className="mx-auto" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Brand;
