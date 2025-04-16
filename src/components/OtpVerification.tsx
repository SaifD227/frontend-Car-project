"use client";

import React, { useState } from "react";
import { useVerifyOtpMutation } from "@/redux/slices/api/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otp) return setErrorMessage("Please enter OTP.");
    if (!token) return setErrorMessage("Invalid or missing token.");

    try {
      await verifyOtp({ token, otp }).unwrap();
      alert("OTP verified successfully");
      router.push(`/reset-password?token=${token}`);
    } catch (err) {
      setErrorMessage("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">
          OTP Verification
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-400 mb-1">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <p className="text-center text-sm text-gray-500 mt-3">
            Didn't receive OTP?{" "}
            <Link
              href="/forgot-password"
              className="text-teal-500 cursor-pointer hover:underline"
            >                                                           
              Resend
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
