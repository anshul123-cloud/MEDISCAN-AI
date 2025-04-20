"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { uploadXray } from "@/lib/api"
import ResultsDisplay from "@/components/results-display"

export default function DiagnosisForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [age, setAge] = useState<string>("")
  const [gender, setGender] = useState<string>("male")
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")

  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)

      // Create image preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedImage) {
      toast({
        title: "Missing image",
        description: "Please upload an X-ray image to continue.",
        variant: "destructive",
      })
      return
    }

    if (!age) {
      toast({
        title: "Missing information",
        description: "Please enter the patient's age to continue.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 150)

      // In a real app, this would call your actual API
      const result = await uploadXray({
        image: selectedImage,
        age: Number.parseInt(age),
        gender,
      })

      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        clearInterval(progressInterval)
        setUploadProgress(100)

        setResults({
          disease: "Pneumonia",
          confidence: 0.93,
          stage: "Moderate",
          advice: "Rest, hydration, and prescribed antibiotics. Follow up in 7 days.",
          precautionTips: [
            "Stay hydrated",
            "Avoid cold exposure",
            "Follow medication schedule",
            "Monitor temperature regularly",
          ],
          doctorRecommendation: {
            name: "Dr. Sarah Johnson",
            specialty: "Pulmonology",
            hospital: "Central Medical Center",
            contact: "+1 (555) 123-4567",
          },
        })

        setIsUploading(false)
        setActiveTab("results")
      }, 2000)
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setAge("")
    setGender("male")
    setResults(null)
    setActiveTab("upload")
    setUploadProgress(0)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-2 p-0 h-auto">
        <TabsTrigger
          value="upload"
          className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=inactive]:bg-slate-50"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
              1
            </div>
            Upload & Information
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="results"
          disabled={!results}
          className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=inactive]:bg-slate-50"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mr-2">
              2
            </div>
            Diagnosis Results
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="m-0">
        <form onSubmit={handleSubmit} className="p-0">
          <div className="grid md:grid-cols-2">
            {/* Left column - Image upload */}
            <div className="p-6 md:p-8 md:border-r border-slate-100">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-1">Upload X-ray Image</h2>
                <p className="text-sm text-slate-500">Upload a clear X-ray image for accurate diagnosis</p>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors cursor-pointer ${
                  imagePreview ? "border-blue-200 bg-blue-50/50" : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => document.getElementById("xray-upload")?.click()}
              >
                <input type="file" id="xray-upload" accept="image/*" className="hidden" onChange={handleImageChange} />

                <div className="py-8">
                  {!imagePreview ? (
                    <>
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-slate-400"
                        >
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                          <line x1="16" x2="22" y1="5" y2="5" />
                          <line x1="19" x2="19" y1="2" y2="8" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">Drag and drop your X-ray image</p>
                      <p className="text-xs text-slate-500">or click to browse files</p>
                      <p className="text-xs text-slate-400 mt-4">Supported formats: JPEG, PNG</p>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="X-ray preview"
                        className="max-h-[240px] mx-auto rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage(null)
                          setImagePreview(null)
                        }}
                      >
                        Change
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 font-medium">{selectedImage.name}</span>
                    <span className="text-slate-500">{(selectedImage.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Patient information */}
            <div className="p-6 md:p-8 bg-white">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-1">Patient Information</h2>
                <p className="text-sm text-slate-500">Enter accurate patient details for better diagnosis</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-slate-700">
                    Patient Age <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-1.5">
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="0"
                      max="120"
                      className="bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">
                    Patient Gender <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal">
                        Female
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700">Additional Information (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="weight" className="text-xs text-slate-500">
                        Weight (kg)
                      </Label>
                      <Input id="weight" type="number" placeholder="Weight" className="bg-slate-50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="height" className="text-xs text-slate-500">
                        Height (cm)
                      </Label>
                      <Input id="height" type="number" placeholder="Height" className="bg-slate-50" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isUploading || !selectedImage}
                  >
                    {isUploading ? (
                      <>
                        <div className="mr-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </div>
                        <span>Processing...</span>
                        <span className="ml-2">{uploadProgress}%</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2"
                        >
                          <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" />
                          <path d="m9 14 2 2 4-4" />
                        </svg>
                        Analyze X-ray
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-700 font-medium">Analyzing X-ray</span>
                <span className="text-blue-600 font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </form>
      </TabsContent>

      <TabsContent value="results" className="m-0">
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsDisplay results={results} imagePreview={imagePreview} onReset={resetForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  )
}
