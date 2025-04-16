"use client";

import Image from "next/image";
import type { NextPage } from "next";
import Link from "next/link";
import { Car } from "@/types/productTypes";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/redux/slices/api/productApi";
import { useState } from "react";
import EditDialog from "../EditDialog";

const Catalog: NextPage = () => {
  const { data: cars, error, isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Car | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete the car:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold p-16 text-5xl text-center mb-6">Car Catalog</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load data</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars?.map((car: Car) => (
          <div
            key={car._id}
            className="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:bg-teal-400"
          >
            <Link href={`/cardetails/${car._id}`} passHref>
              <div className="relative w-full h-48 cursor-pointer">
                {car.images.length > 0 && (
                  <Image
                    src={`${BASE_URL}${car.images[0]}`}
                    alt={car.name}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-600">Energy Type:</span>
                  <span className="ml-2">{car.fuelType}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">Engine:</span>
                  <span className="ml-2">{car.engineCapacity}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
                  Ratings: {car.ratings}
                </span>
                <button
                  onClick={() => handleDelete(car._id.toString())}
                  className="bg-red-500 text-white text-2xl px-4 py-1 rounded"
                >
                  Delete
                </button>

                <button
                  className="bg-green-500 text-white text-2xl px-4 py-1 rounded"
                  onClick={() => {
                    setEditingProduct(car);
                    setOpenDialog(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditDialog
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onUpdateSuccess={() => {
          setOpenDialog(false);
          setEditingProduct(null);
          refetch();
        }}
      />
    </div>
  );
};

export default Catalog;
