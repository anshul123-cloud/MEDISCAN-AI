"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResultsDisplayProps {
  results: {
    disease: string
    confidence: number
    stage: string
    advice: string
    precautionTips?: string[]
    doctorRecommendation: {
      name: string
      specialty: string
      hospital: string
      contact: string
    }
  }
  imagePreview: string | null
  onReset: () => void
}

export default function ResultsDisplay({ results, imagePreview, onReset }: ResultsDisplayProps) {
  const confidencePercentage = Math.round(results.confidence * 100)

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-100 text-green-800"
    if (confidence >= 0.7) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getStageColor = (stage: string) => {
    if (stage.toLowerCase().includes("early")) return "bg-green-100 text-green-800"
    if (stage.toLowerCase().includes("moderate")) return "bg-yellow-100 text-yellow-800"
    if (stage.toLowerCase().includes("advanced") || stage.toLowerCase().includes("severe"))
      return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  return (
    <div className="p-0">
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Diagnosis Results</h2>
          <p className="text-sm text-slate-500">AI-powered analysis of your X-ray image</p>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2">
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
          >
            <path d="M2.5 2v6h6M21.5 22v-6h-6" />
            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" />
          </svg>
          New Analysis
        </Button>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col h-full"
              >
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Primary Diagnosis</h3>
                        <p className="text-sm text-slate-500">Based on X-ray analysis</p>
                      </div>
                      <Badge className={getConfidenceColor(results.confidence)}>
                        {confidencePercentage}% Confidence
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Detected Condition</div>
                        <div className="text-3xl font-bold text-slate-900">{results.disease}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-slate-500">Stage:</div>
                        <Badge className={getStageColor(results.stage)}>{results.stage}</Badge>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-2">Confidence Level</div>
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-slate-500">0%</div>
                            <div className="text-xs text-slate-500">50%</div>
                            <div className="text-xs text-slate-500">100%</div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${confidencePercentage}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <div className="text-sm font-medium text-slate-500 mb-2">Medical Advice</div>
                        <p className="text-slate-700">{results.advice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">X-ray Image</h3>
                      <p className="text-sm text-slate-500">Uploaded scan</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg overflow-hidden">
                      {imagePreview && (
                        <div className="aspect-[4/3] relative">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="X-ray"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Recommended Specialist</h3>
                      <p className="text-sm text-slate-500">Based on diagnosis</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                          {results.doctorRecommendation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{results.doctorRecommendation.name}</div>
                          <div className="text-sm text-slate-500">{results.doctorRecommendation.specialty}</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div className="flex items-center">
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
                            className="mr-2 text-slate-400"
                          >
                            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                            <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                            <path d="M13 13h4" />
                            <path d="M13 17h4" />
                            <path d="M9 13h.01" />
                            <path d="M9 17h.01" />
                          </svg>
                          {results.doctorRecommendation.hospital}
                        </div>
                        <div className="flex items-center">
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
                            className="mr-2 text-slate-400"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          {results.doctorRecommendation.contact}
                        </div>
                      </div>
                      <Button className="w-full mt-4">
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
                          className="mr-2"
                        >
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        Schedule Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Analysis</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Disease Information</div>
                      <p className="text-sm text-slate-600">
                        Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill
                        with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.
                      </p>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">X-ray Findings</div>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                        <li>Patchy or confluent airspace opacities</li>
                        <li>Predominantly in the lower lobes</li>
                        <li>Moderate bilateral involvement</li>
                        <li>No significant pleural effusion</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">AI Detection Points</div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Opacity Pattern:</span>
                            <span className="font-medium text-slate-900">96%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Consolidation:</span>
                            <span className="font-medium text-slate-900">92%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Air Bronchogram:</span>
                            <span className="font-medium text-slate-900">88%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Distribution:</span>
                            <span className="font-medium text-slate-900">94%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Differential Diagnosis</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Pneumonia</div>
                        <div className="text-sm text-slate-500">Primary diagnosis</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{confidencePercentage}%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Bronchitis</div>
                        <div className="text-sm text-slate-500">Alternative consideration</div>
                      </div>
                      <Badge className="bg-slate-100 text-slate-800">12%</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">Pulmonary Edema</div>
                        <div className="text-sm text-slate-500">Alternative consideration</div>
                      </div>
                      <Badge className="bg-slate-100 text-slate-800">8%</Badge>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-medium text-slate-700 mb-2">Comparison with Previous Cases</div>
                      <Button variant="outline" className="w-full">
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
                          className="mr-2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M7 7h.01" />
                          <path d="M12 7h.01" />
                          <path d="M17 7h.01" />
                          <path d="M7 12h.01" />
                          <path d="M12 12h.01" />
                          <path d="M17 12h.01" />
                          <path d="M7 17h.01" />
                          <path d="M12 17h.01" />
                          <path d="M17 17h.01" />
                        </svg>
                        View Similar Cases
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Treatment Recommendations</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Medication</div>
                      <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
                        <li>Antibiotics (based on physician prescription)</li>
                        <li>Antipyretics for fever management</li>
                        <li>Cough suppressants as needed</li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Precaution Tips</div>
                      <div className="space-y-2">
                        {results.precautionTips?.map((tip, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-600"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </div>
                            <span className="text-sm text-slate-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Follow-up</div>
                      <p className="text-sm text-slate-600">
                        Schedule a follow-up appointment in 7 days to monitor progress and adjust treatment if
                        necessary.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Resources</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Educational Materials</div>
                      <div className="grid grid-cols-1 gap-2">
                        <Button variant="outline" className="justify-start h-auto py-2.5">
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
                            className="mr-2 text-blue-600"
                          >
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                          </svg>
                          Understanding Pneumonia
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-2.5">
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
                            className="mr-2 text-blue-600"
                          >
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                          Patient Care Guide
                        </Button>
                        <Button variant="outline" className="justify-start h-auto py-2.5">
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
                            className="mr-2 text-blue-600"
                          >
                            <path d="m21 15-9-9-9 9" />
                            <path d="M3 10.5V21h18V10.5" />
                            <path d="M9.5 21v-6h5v6" />
                          </svg>
                          Recovery Timeline
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-1">Export Options</div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start">
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
                            className="mr-2"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M9 15h6" />
                            <path d="M9 18h6" />
                            <path d="M9 12h2" />
                          </svg>
                          PDF Report
                        </Button>
                        <Button variant="outline" className="justify-start">
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
                            className="mr-2"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <line x1="9" x2="15" y1="9" y2="9" />
                            <line x1="9" x2="15" y1="15" y2="15" />
                            <line x1="9" x2="15" y1="12" y2="12" />
                          </svg>
                          Print Results
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full">
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
                          className="mr-2"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Share with Healthcare Team
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-slate-50 border-t border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline">
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
              className="mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download Report
          </Button>
          <Button>
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
              className="mr-2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact Specialist
          </Button>
        </div>
      </div>
    </div>
  )
}
