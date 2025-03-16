"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Plus, Trash2, Upload } from "lucide-react"

export default function CreateLessonPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // Sample courses data
  const courses = [
    { id: 1, name: "Algebra I", grade: "10A" },
    { id: 2, name: "English Literature", grade: "11B" },
    { id: 3, name: "Biology", grade: "9C" },
    { id: 4, name: "World History", grade: "12A" },
  ]

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    objectives: "",
    meetingLink: "",
    hasAssignment: false,
    hasQuiz: false,
    hasDiscussion: false,
  })

  // Resources state
  const [resources, setResources] = useState<
    Array<{
      id: number
      type: "document" | "video" | "link"
      name: string
      file?: File
      url?: string
    }>
  >([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddResource = (type: "document" | "video" | "link") => {
    setResources((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        name: "",
        url: type === "link" ? "" : undefined,
      },
    ])
  }

  const handleRemoveResource = (id: number) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id))
  }

  const handleResourceChange = (id: number, field: string, value: string | File) => {
    setResources((prev) =>
      prev.map((resource) => {
        if (resource.id === id) {
          return { ...resource, [field]: value }
        }
        return resource
      }),
    )
  }

  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleResourceChange(id, "file", file)
      handleResourceChange(id, "name", file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to create lesson
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/lessons")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/lessons">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create New Lesson</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Lesson Details</TabsTrigger>
            <TabsTrigger value="content">Content & Objectives</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="interactive">Interactive Elements</TabsTrigger>
          </TabsList>

          {/* Lesson Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter lesson title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.name} ({course.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingLink">Online Meeting Link (Optional)</Label>
                  <Input
                    id="meetingLink"
                    name="meetingLink"
                    placeholder="Enter meeting URL"
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" disabled>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("content")}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Content & Objectives Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
                <CardDescription>Describe the content and objectives of your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Lesson Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a detailed description of the lesson"
                    className="min-h-32"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    name="objectives"
                    placeholder="Enter the learning objectives for this lesson"
                    className="min-h-32"
                    value={formData.objectives}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Use bullet points to list objectives (e.g., "• Understand...", "• Apply...")
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("resources")}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Resources</CardTitle>
                <CardDescription>Add documents, videos, and links for your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={() => handleAddResource("document")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Document
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleAddResource("video")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleAddResource("link")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>

                <div className="space-y-4">
                  {resources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-md">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No resources added yet</p>
                      <p className="text-sm text-muted-foreground">Click one of the buttons above to add resources</p>
                    </div>
                  ) : (
                    resources.map((resource) => (
                      <div key={resource.id} className="flex items-center gap-4 p-4 border rounded-md">
                        <div className="flex-1">
                          {resource.type === "document" || resource.type === "video" ? (
                            <div className="space-y-2">
                              <Label htmlFor={`file-${resource.id}`}>
                                {resource.type === "document" ? "Document" : "Video"} File
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={`file-${resource.id}`}
                                  type="file"
                                  accept={
                                    resource.type === "document" ? ".pdf,.doc,.docx,.ppt,.pptx" : ".mp4,.mov,.avi"
                                  }
                                  onChange={(e) => handleFileChange(resource.id, e)}
                                  className="flex-1"
                                />
                                {resource.name && (
                                  <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {resource.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Label htmlFor={`url-${resource.id}`}>Link URL</Label>
                              <Input
                                id={`url-${resource.id}`}
                                placeholder="Enter URL"
                                value={resource.url || ""}
                                onChange={(e) => handleResourceChange(resource.id, "url", e.target.value)}
                              />
                              <div className="space-y-2">
                                <Label htmlFor={`name-${resource.id}`}>Link Name</Label>
                                <Input
                                  id={`name-${resource.id}`}
                                  placeholder="Enter a name for this link"
                                  value={resource.name}
                                  onChange={(e) => handleResourceChange(resource.id, "name", e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveResource(resource.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("content")}>
                  Previous
                </Button>
                <Button type="button" onClick={() => setActiveTab("interactive")}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Interactive Elements Tab */}
          <TabsContent value="interactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>Add interactive elements to engage students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAssignment"
                      checked={formData.hasAssignment}
                      onCheckedChange={(checked) => handleCheckboxChange("hasAssignment", checked as boolean)}
                    />
                    <Label htmlFor="hasAssignment">Include Assignment</Label>
                  </div>
                  {formData.hasAssignment && (
                    <div className="ml-6 p-4 border rounded-md bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">
                        An assignment will be created and linked to this lesson.
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Configure Assignment
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasQuiz"
                      checked={formData.hasQuiz}
                      onCheckedChange={(checked) => handleCheckboxChange("hasQuiz", checked as boolean)}
                    />
                    <Label htmlFor="hasQuiz">Include Quiz</Label>
                  </div>
                  {formData.hasQuiz && (
                    <div className="ml-6 p-4 border rounded-md bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">
                        A quiz will be created and linked to this lesson.
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Configure Quiz
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDiscussion"
                      checked={formData.hasDiscussion}
                      onCheckedChange={(checked) => handleCheckboxChange("hasDiscussion", checked as boolean)}
                    />
                    <Label htmlFor="hasDiscussion">Include Discussion</Label>
                  </div>
                  {formData.hasDiscussion && (
                    <div className="ml-6 p-4 border rounded-md bg-muted/20">
                      <p className="text-sm text-muted-foreground mb-2">
                        A discussion forum will be created for this lesson.
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Configure Discussion
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setActiveTab("resources")}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Lesson"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}

