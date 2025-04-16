"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Catalog from "../catalog/Catalog";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart/cartSlice";
import { Car } from "@/types/productTypes";

const CarDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch();
  const router = useRouter();

  const [car, setCar] = useState<Car | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let parsedFeatures: string[] = [];

        try {
          parsedFeatures = JSON.parse(data.features?.[0] || "[]");
        } catch (error) {
          console.error("Error parsing features:", error);
        }

        const formattedCar: Car = {
          _id: data._id,
          name: data.name,
          brand: data.brand,
          carModel: data.carModel,
          year: data.year,
          price: data.price,
          fuelType: data.fuelType,
          transmission: data.transmission,
          images: data.images.map(
            (img: string) => `http://localhost:5001${img}`
          ),
          features: parsedFeatures,
          engineCapacity: data.engineCapacity || "",
          ratings: data.rating || 0,
        };

        setCar(formattedCar);
        setSelectedImage(formattedCar.images[0]);
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, [id]);

  const handleAddToCart = () => {
    if (!car) return;

    const selectedCar: Car = {
      ...car,
      images: [selectedImage],
    };

    dispatch(addToCart(selectedCar));
    router.push("/selection");
  };

  if (!car) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div
        className="h-screen bg-gray-800 text-white flex items-center justify-center text-5xl font-extrabold shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${selectedImage})` }}
      >
        {car.name}
      </div>

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center my-12">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl p-4 bg-gray-800 rounded-xl shadow-lg border-4 border-gray-600">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Selected Car"
                width={600}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            )}
          </div>

          <div className="flex gap-4 mt-6 flex-wrap justify-center">
            {car.images.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)}>
                <Image
                  src={img}
                  alt={`Car ${index}`}
                  width={100}
                  height={75}
                  className={`rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedImage === img ? "border-4 border-gray-600" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-80">
            <p className="text-lg font-semibold mb-4">DESCRIPTION</p>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <p>Brand</p>
                <p className="font-bold text-black">{car.brand}</p>
              </div>
              <div className="flex justify-between">
                <p>Model</p>
                <p className="font-bold text-black">{car.carModel}</p>
              </div>
              <div className="flex justify-between">
                <p>Price</p>
                <p className="font-bold text-black">${car.price}</p>
              </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-gray-600 text-white py-2 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <Catalog />
    </div>
  );
};

export default CarDetails;
