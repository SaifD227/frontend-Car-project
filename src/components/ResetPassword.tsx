"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/slices/api/authApi";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/auth/authSlice";
import Cookies from "js-cookie";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const token = Cookies.get("token") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!token) {
      alert("Token is missing. Please try again.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword }).unwrap();
      
      if (response.message === "Password reset successful") {
        dispatch(login(response.token || ""));
        alert("Password reset successful");
        router.push("/login");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Reset Password failed", err);
      alert("Reset failed. Please check your token and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-teal-400 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-teal-400 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              Reset failed. Try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
