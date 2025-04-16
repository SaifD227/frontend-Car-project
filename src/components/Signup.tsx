"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSignupMutation } from "@/redux/slices/api/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/auth/authSlice";
import image from "../../public/green-car-min.webp";

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signup, { isLoading, error }] = useSignupMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(userData).unwrap();
      dispatch(login(response.token));
      router.push("/login");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex w-full max-w-2xl">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <Image
            src={image}
            alt="Green Car"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-teal-400 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-teal-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-teal-400 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2">
                Signup failed. Try again.
              </p>
            )}
            <div>
              <Link
                href="/login"
                className="text-right hover:underline hover:decoration-teal-400 text-teal-400"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
