"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/redux/slices/api/authApi";
import { useRouter } from "next/navigation";
// import { login } from "@/redux/slices/auth/authSlice";
import { useDispatch } from "react-redux";
import image from "../../public/green-car-min.webp";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email }).unwrap();
      // dispatch(login(response.token));
      alert("Password reset link sent to your email");
      router.push("/otp-verification");
    } catch (err) {
      console.error("Forgot Password failed", err);
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

        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">
            Forgot Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-teal-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2">
                Reset failed. Try again.
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

export default ForgotPassword;
