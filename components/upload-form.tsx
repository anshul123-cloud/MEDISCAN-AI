"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { uploadXray } from "@/lib/api"
import ResultsDisplay from "@/components/results-display"

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [age, setAge] = useState<string>("")
  const [gender, setGender] = useState<string>("male")
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")

  const { toast } = useToast()
  const router = useRouter()

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

      // In a real app, this would call your actual API
      const result = await uploadXray({
        image: selectedImage,
        age: Number.parseInt(age),
        gender,
      })

      // For demo purposes, we'll simulate a response
      setTimeout(() => {
        setResults({
          disease: "Pneumonia",
          confidence: 0.92,
          stage: "Early",
          advice: "Rest, hydration, and prescribed antibiotics. Follow up in 7 days.",
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
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload X-ray</TabsTrigger>
        <TabsTrigger value="results" disabled={!results}>
          Results
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="xray-upload" className="text-base font-medium">
              Upload X-ray Image
            </Label>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div
                  className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("xray-upload")?.click()}
                >
                  <input
                    type="file"
                    id="xray-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <div className="py-6">
                    {!imagePreview ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto mb-4 text-slate-400"
                        >
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                          <line x1="16" x2="22" y1="5" y2="5" />
                          <line x1="19" x2="19" y1="2" y2="8" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400 mt-1">Supported formats: JPEG, PNG</p>
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="X-ray preview"
                          className="max-h-[200px] mx-auto rounded"
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
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="age" className="text-sm font-medium">
                    Patient Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="0"
                    max="120"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Patient Gender</Label>
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
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isUploading || !selectedImage}>
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Processing...
                </>
              ) : (
                "Analyze X-ray"
              )}
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="results">
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsDisplay results={results} onReset={resetForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  )
}
