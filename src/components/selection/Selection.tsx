"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaTimes, FaPlus } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { removeFromCart, setCart } from "@/redux/slices/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

interface Car {
  _id: number;
  name: string;
  price: number;
  images: string[];
  engineCapacity: string;
}

const stripePromise = loadStripe(
  "pk_test_51RBCozLJLb1XFn9VBjUU3yqWDsXNqg51Bd7g3Dy7YdJNqo2KeWft1zhvT8v2BWYlgphlpOqLQk2ngnS5Yhp870E300LiPsYnZI"
);

const Selection: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>(
    {}
  );

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsedCart: import("d:/whizpool/frontend/my-next-app/src/types/productTypes").Car[] =
            JSON.parse(savedCart);
          dispatch(setCart(parsedCart));

          const quantities: Record<number, number> = {};
          parsedCart.forEach((item) => {
            quantities[item._id] = 1;
          });
          setItemQuantities(quantities);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      try {
        if (cart.length > 0) {
          localStorage.setItem("cart", JSON.stringify(cart));
          localStorage.setItem("quantities", JSON.stringify(itemQuantities));
        } else {
          localStorage.removeItem("cart");
          localStorage.removeItem("quantities");
        }
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    }
  }, [cart, itemQuantities, isLoading]);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    setItemQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleIncrease = (car: Car) => {
    setItemQuantities((prev) => ({
      ...prev,
      [car._id]: (prev[car._id] || 1) + 1,
    }));
  };

  const handleDecrease = (car: Car) => {
    setItemQuantities((prev) => {
      const qty = (prev[car._id] || 1) - 1;
      return {
        ...prev,
        [car._id]: qty > 0 ? qty : 1,
      };
    });
  };

  const subtotal = cart.reduce(
    (total, car) => total + car.price * (itemQuantities[car._id] || 1),
    0
  );

  const makePayment = async () => {
    const stripe = await stripePromise;
    const products = cart.map((car) => ({
      product_id: car._id,
      name: car.name,
      price: car.price,
      quantity: itemQuantities[car._id] || 1,
      image: car.images[0],
    }));

    try {
      const response = await fetch(
        "http://localhost:5001/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products }),
        }
      );
      const session = await response.json();

      if (session.id) {
        const result = await stripe?.redirectToCheckout({
          sessionId: session.id,
        });

        if (result?.error) {
          console.error(result.error.message);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-xl">Loading cart...</div>;
  }

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div
        className="bg-gray-800 text-white text-5xl font-bold text-center py-16 bg-cover bg-center"
        style={{ backgroundImage: `url('/images (19).jpeg')` }}
      >
        Selection
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start p-10 gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          {cart.length > 0 ? (
            cart.map((car) => (
              <div
                key={car._id}
                className="flex flex-col sm:flex-row items-center sm:justify-between border-2 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleRemove(car._id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <FaTimes />
                  </button>
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    width={180}
                    height={130}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-10 w-full sm:w-auto mt-4 sm:mt-0">
                  <h2 className="text-lg font-semibold text-teal-600">
                    {car.name} – {car.engineCapacity}
                  </h2>
                  <p className="text-xl font-bold text-gray-800">
                    ${car.price.toLocaleString()}
                  </p>
                  <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleIncrease(car)}
                      className="text-teal-500 hover:text-teal-700"
                    >
                      <FaPlus />
                    </button>
                    <span>{itemQuantities[car._id] || 1}</span>
                    <button
                      onClick={() => handleDecrease(car)}
                      className="text-teal-500 hover:text-teal-700"
                    >
                      <FiMinusCircle />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">
              No items in cart.
            </p>
          )}
        </div>

        <div className="w-full md:w-1/3 p-6 border-2 rounded-lg shadow-md">
          <div className="flex justify-between text-md">
            <p>Subtotal</p>
            <p>${subtotal.toLocaleString()}</p>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <p>Total</p>
            <p>${subtotal.toLocaleString()}</p>
          </div>

          <button
            onClick={makePayment}
            disabled={cart.length === 0}
            className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md text-lg font-semibold"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;









