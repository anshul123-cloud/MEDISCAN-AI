import { Suspense } from "react"
import DiagnosisForm from "@/components/diagnosis-form"
import { Toaster } from "@/components/ui/toaster"

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center">
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
          <div className="ml-4 text-sm">
            <span className="text-slate-400">/ </span>
            <span className="text-slate-600">Diagnosis</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">X-ray Diagnosis</h1>
            <p className="text-slate-600">
              Upload an X-ray image and provide patient information to receive an AI-powered diagnosis.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Suspense fallback={<div className="p-8 text-center">Loading diagnosis form...</div>}>
              <DiagnosisForm />
            </Suspense>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
