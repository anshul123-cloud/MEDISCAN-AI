'use client';

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation"; // Import redirect from next/navigation



export default  function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  // If session exists (user is logged in), redirect to the home page
 

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Light Theme with Medical Graphic */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-100 to-blue-200 items-center justify-center p-10">
        <div className="text-center">
          <img
            src="https://play-lh.googleusercontent.com/bmh788PlLD4zf5EBVyx41t41P4HwsMvFlbNhHHWqgG_2WYYzDFskYM9YVu_2qeUevEQ=s256-rw"
            alt="Medical graphic"
            className="w-60 mx-auto mb-6"
          />
          <h2 className="text-4xl font-bold text-blue-900 mb-2">MediScan AI</h2>
          <p className="text-blue-800">Secure login to your medical dashboard</p>
        </div>
      </div>

      {/* Right Side - Dark Theme with Login Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-white">
        <div className=" p-2 ">
        <img
          src="https://play-lh.googleusercontent.com/bmh788PlLD4zf5EBVyx41t41P4HwsMvFlbNhHHWqgG_2WYYzDFskYM9YVu_2qeUevEQ=s256-rw"
          alt="Google logo"
          className="w-15 h-20 mx-auto mb-6 rounded-2xl"
        />
        
          <h2 className="text-3xl font-sans font-semibold mb-4 text-center">Login to MediScan Ai</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-300">or</div>

          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2 px-4 rounded-lg shadow hover:scale-105 transition"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb10MZhsUnwuedlOZDU--kIfQdlG2EPFNcAg&s"
              alt="Google logo"
              className="w-7 h-7"
            />
            <span className="font-medium">Sign in with Google</span>
          </button>

          
        </div>
      </div>
    </div>
  );
}
