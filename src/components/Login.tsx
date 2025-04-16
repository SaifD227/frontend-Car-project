// frontend/src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/slices/auth/authSlice";
import { useLoginMutation } from "@/redux/slices/api/authApi";
import image from "../../public/green-car-min.webp";
import image2 from "../../public/google323.png";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      dispatch(login(response.token));
      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5001/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex w-full max-w-2xl">
        <div className="w-1/2 flex items-center justify-center p-4">
          <Image src={image} alt="Green Car" width={200} height={200} className="rounded-lg" />
        </div>
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center text-teal-500 mb-4">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-teal-400 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-teal-400 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500"
              />
            </div>
            <div className="flex justify-between">
              <Link href="/signup" className="text-teal-400">Sign up</Link>
              <Link href="/forgot-password" className="text-teal-400">Forgot Password</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">Login failed. Try again.</p>}
          </form>
          <div className="flex items-center gap-2 justify-center border-b-4 pb-2 shadow-md cursor-pointer mt-4" onClick={handleGoogleLogin}>
            <Image src={image2} alt="google" width={25} height={25} className="rounded-full" />
            <p className="text-lg font-semibold text-gray-700">Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;