"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  FileText,
  Upload,
  Save,
  Send,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  FileQuestion,
  PenLine,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [assignmentStatus, setAssignmentStatus] = useState<string>("not-started")
  const [submissionContent, setSubmissionContent] = useState<string>("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [timeRemaining, setTimeRemaining] = useState<string>("2 days, 5 hours")

  // Sample assignment data
  const assignment = {
    id: params.id,
    title: "Literary Analysis Essay: The Great Gatsby",
    course: { id: "ENG203", name: "English Literature", grade: "11B" },
    dueDate: "2025-03-25",
    dueTime: "23:59",
    status: assignmentStatus,
    description: `
      Write a 1000-1500 word essay analyzing one of the major themes in F. Scott Fitzgerald's "The Great Gatsby." 
      
      Choose ONE of the following themes:
      
      1. The American Dream and its corruption
      2. Social class and privilege
      3. Love, desire, and relationships
      4. Symbolism and the green light
      5. Illusion versus reality
      
      Your essay should include:
      
      - A clear thesis statement that identifies your chosen theme
      - Textual evidence (quotes) to support your analysis
      - Analysis of how the theme develops throughout the novel
      - Discussion of how the theme contributes to the overall meaning of the work
      - Proper MLA format including in-text citations and a Works Cited page
      
      Submission Requirements:
      - 1000-1500 words (approximately 4-6 pages)
      - Double-spaced, 12pt Times New Roman font
      - 1-inch margins
      - MLA format
      - Submit as a .docx or .pdf file
    `,
    maxPoints: 100,
    category: "essay",
    submissionType: "file",
    resources: [
      { id: 1, name: "The Great Gatsby - Essay Guidelines.pdf", size: "245 KB" },
      { id: 2, name: "MLA Format Guide.pdf", size: "180 KB" },
      { id: 3, name: "Essay Rubric.pdf", size: "120 KB" },
    ],
    allowLateSubmissions: true,
    latePenalty: 10,
    gradeVisibility: "after_grading",
    feedback: null,
    grade: null,
    submissionHistory: [],
  }

  // Function to handle starting the assignment
  const handleStart = () => {
    setAssignmentStatus("in-progress")
    // In a real app, you would make an API call to update the status
  }

  // Function to handle saving a draft
  const handleSaveDraft = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // In a real app, you would make an API call to save the draft
      console.log("Draft saved:", submissionContent, selectedFiles)
    }, 1500)
  }

  // Function to handle submitting the assignment
  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setAssignmentStatus("submitted")
      // In a real app, you would make an API call to submit the assignment
      console.log("Assignment submitted:", submissionContent, selectedFiles)
    }, 2000)
  }

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...filesArray])
    }
  }

  // Function to remove a selected file
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Update time remaining (in a real app, this would be calculated based on the due date)
  useEffect(() => {
    const interval = setInterval(() => {
      // This is just a placeholder. In a real app, you would calculate the actual time remaining
      const dueDate = new Date(assignment.dueDate + "T" + assignment.dueTime)
      const now = new Date()
      const diff = dueDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining("Past due")
        clearInterval(interval)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        setTimeRemaining(`${days} days, ${hours} hours`)
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [assignment.dueDate, assignment.dueTime])

  // Get the appropriate action button based on status
  const getActionButton = () => {
    switch (assignmentStatus) {
      case "not-started":
        return (
          <Button onClick={handleStart} className="w-full">
            <PenLine className="mr-2 h-4 w-4" />
            Start Assignment
          </Button>
        )
      case "in-progress":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Submit Assignment
              </Button>
            </div>
            {isSubmitting && <Progress value={45} className="h-2" />}
          </div>
        )
      case "submitted":
        return (
          <Button variant="outline" disabled className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            Submitted
          </Button>
        )
      case "graded":
        return (
          <Button variant="outline" disabled className="w-full">
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            Graded: {assignment.grade}/100
          </Button>
        )
      default:
        return null
    }
  }

  // Get status badge
  const getStatusBadge = () => {
    switch (assignmentStatus) {
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50">
            In Progress
          </Badge>
        )
      case "submitted":
        return <Badge variant="secondary">Submitted</Badge>
      case "graded":
        return <Badge variant="default">Graded</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/my-assignments">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{assignment.course.name}</span>
              <span>•</span>
              <span>Grade {assignment.course.grade}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">{getStatusBadge()}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">at {assignment.dueTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeRemaining}</div>
            <p className="text-xs text-muted-foreground">until deadline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignment.maxPoints}</div>
            <p className="text-xs text-muted-foreground">maximum points</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {assignment.description.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {assignmentStatus === "in-progress" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Submission</CardTitle>
                <CardDescription>
                  {assignment.submissionType === "file"
                    ? "Upload your completed assignment files"
                    : "Enter your response below"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assignment.submissionType === "file" ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF or DOCX (MAX. 10MB)</p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Selected Files:</h3>
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="text-sm">{file.name}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    placeholder="Enter your response here..."
                    className="min-h-[200px]"
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                  />
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full">{getActionButton()}</div>
              </CardFooter>
            </Card>
          )}

          {assignmentStatus === "submitted" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Submission</CardTitle>
                <CardDescription>
                  Submitted on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignment.submissionType === "file" ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-500" />
                          <span>LiteraryAnalysis_TheGreatGatsby.pdf</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border rounded-md bg-gray-50">
                      <p className="text-sm">
                        {submissionContent || "Your submitted text response would appear here."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Submission Complete</AlertTitle>
                  <AlertDescription>
                    Your assignment has been submitted successfully. You will be notified when it has been graded.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          )}

          {assignmentStatus === "graded" && (
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>Graded on {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Grade:</span>
                    <span className="text-lg font-bold">{assignment.grade || 85}/100</span>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-md font-medium mb-2">Teacher Comments:</h3>
                    <div className="p-4 border rounded-md bg-gray-50">
                      <p className="text-sm">
                        Excellent analysis of the American Dream theme in The Great Gatsby. Your thesis was clear and
                        well-supported with textual evidence. Your discussion of how the green light symbolizes Gatsby's
                        unattainable dream was particularly insightful. Areas for improvement: - Consider the historical
                        context of the 1920s more deeply - Some of your paragraph transitions could be smoother - Watch
                        for occasional grammar issues, particularly with comma usage Overall, this is strong work that
                        demonstrates a good understanding of the novel and its themes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Assignment materials and references</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignment.resources.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No resources available</p>
                  </div>
                ) : (
                  assignment.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{resource.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                  <dd className="text-sm capitalize">{assignment.category}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Submission Type</dt>
                  <dd className="text-sm capitalize">{assignment.submissionType} Upload</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Late Submissions</dt>
                  <dd className="text-sm">
                    {assignment.allowLateSubmissions
                      ? `Allowed (${assignment.latePenalty}% penalty per day)`
                      : "Not allowed"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {assignmentStatus === "not-started" && (
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Begin working on your assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ready to begin?</p>
                    <p className="text-sm text-muted-foreground">Click the button below to start your assignment</p>
                  </div>
                </div>
                {getActionButton()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

