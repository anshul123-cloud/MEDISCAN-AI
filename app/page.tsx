"use client"
import Image from "next/image"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { signOut,useSession,signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { useEffect } from "react";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default function Home() {

  const { data: session } = useSession(); // Use useSession for client-side session management
  const router = useRouter();

  // useEffect(() => {
  //   console.log("Session data:", session);
  //   if (!session) {
  //     console.log("Redirecting to login page...");
  //     router.push("/login");
  //   }
  // }, [session, router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-800">MediScan AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              Home
            </Link>
            <Link href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              Features
            </Link>
            <Link href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              About
            </Link>
            <Link href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden md:flex items-center justify-center h-9 px-4 rounded-md bg-blue-50 text-blue-600 text-sm font-medium transition-colors hover:bg-blue-100"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center h-9 px-4 rounded-md bg-blue-600 text-white text-sm font-medium transition-colors hover:bg-blue-700"
            >
              Get Started
            </Link>
            {session ? (
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1.5 rounded-md shadow-md"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={()=>router.push('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-md shadow-md"
        >
          Login
        </button>
      )}
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1.5"
                >
                  <path d="M12 2v8" />
                  <path d="m4.93 10.93 1.41 1.41" />
                  <path d="M2 18h2" />
                  <path d="M20 18h2" />
                  <path d="m19.07 10.93-1.41 1.41" />
                  <path d="M22 22H2" />
                  <path d="m16 6-4 4-4-4" />
                  <path d="M16 18a4 4 0 0 0-8 0" />
                </svg>
                AI-Powered Medical Technology
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                X-ray Diagnosis <span className="text-blue-600">in Seconds</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Upload your X-ray images and get instant AI-powered diagnosis with high accuracy. MediScan AI helps
                medical professionals make faster, more informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnosis"
                  className="flex items-center justify-center h-12 px-6 rounded-lg bg-blue-600 text-white font-medium transition-colors hover:bg-blue-700"
                >
                  Start Diagnosis
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/demo"
                  className="flex items-center justify-center h-12 px-6 rounded-lg bg-slate-100 text-slate-800 font-medium transition-colors hover:bg-slate-200"
                >
                  Watch Demo
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </Link>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-medium border-2 border-white">
                    MD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-medium border-2 border-white">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-medium border-2 border-white">
                    RN
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">Trusted by 2,000+</span> healthcare professionals
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 rounded-lg -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-lg -z-10"></div>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4 bg-slate-100">
                <video
  src="https://v1.pinimg.com/videos/mc/hls/3d/9f/d8/3d9fd8ec98402b9f9568f52c482ee965.m3u8"
  width={800}
  height={600}
  className="object-cover"
  autoPlay
  muted
  loop
  playsInline
  controls={false}
  preload="auto"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-sm font-medium">Chest X-ray</div>
                      <div className="text-xs opacity-80">High-resolution scan</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-700">Accuracy</div>
                      <div className="text-sm font-bold text-blue-600">98.7%</div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "98.7%" }}></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-700">Processing</div>
                      <div className="text-sm font-bold text-green-600">2.3s</div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Advanced AI Diagnostic Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our cutting-edge technology provides accurate and rapid diagnosis to help healthcare professionals make
              informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 15v-6" />
                  <path d="M12 12v3" />
                  <path d="M15 9v6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fast AI Prediction</h3>
              <p className="text-slate-600 mb-4">
                Get accurate disease predictions in seconds with our advanced machine learning algorithms.
              </p>
              <div className="text-blue-600 font-medium text-sm flex items-center">
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M2 12h10" />
                  <path d="M9 4v16" />
                  <path d="M14 9h3" />
                  <path d="M17 6v6" />
                  <path d="M22 12h-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnosis Stage Detection</h3>
              <p className="text-slate-600 mb-4">
                Accurately determine the stage of detected conditions for better treatment planning.
              </p>
              <div className="text-blue-600 font-medium text-sm flex items-center">
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Personalized Advice</h3>
              <p className="text-slate-600 mb-4">
                Receive tailored medical recommendations and specialist referrals based on diagnosis results.
              </p>
              <div className="text-blue-600 font-medium text-sm flex items-center">
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your diagnostic process?</h2>
              <p className="text-blue-100 mb-8 max-w-lg">
                Join thousands of healthcare professionals who are already using MediScan AI to improve patient outcomes
                and streamline their workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnosis"
                  className="flex items-center justify-center h-12 px-6 rounded-lg bg-white text-blue-600 font-medium transition-colors hover:bg-blue-50"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-12 px-6 rounded-lg bg-blue-500 text-white font-medium transition-colors hover:bg-blue-400 border border-blue-400"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Accuracy rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-4xl font-bold mb-2">2.5s</div>
                <div className="text-blue-100">Average processing time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Detectable conditions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Technical support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  )
}
