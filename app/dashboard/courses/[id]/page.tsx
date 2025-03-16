"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Edit,
  FileText,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  Trash,
  Upload,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id
  const [activeTab, setActiveTab] = useState("overview")

  // Sample course data - in a real app, you would fetch this based on the courseId
  const course = {
    id: courseId,
    code: "MATH101",
    name: "Algebra I",
    description:
      "This course covers the fundamental concepts of algebra, including equations, inequalities, functions, and graphs. Students will learn to solve linear and quadratic equations, work with polynomials, and understand the properties of functions.",
    department: "Mathematics",
    teacher: {
      id: 1,
      name: "Dr. Robert Chen",
      email: "robert.chen@school.edu",
      image: "/placeholder.svg?height=40&width=40",
    },
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    location: "Room 201",
    status: "Active",
    startDate: "September 1, 2023",
    endDate: "December 15, 2023",
    students: 28,
    maxStudents: 30,
    credits: 3,
    prerequisites: ["Basic Mathematics"],
    progress: 65, // Percentage of course completed
  }

  // Sample enrolled students
  const enrolledStudents = [
    { id: 1, name: "Emma Johnson", grade: "A", attendance: "95%", image: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Noah Williams", grade: "B+", attendance: "88%", image: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Olivia Brown", grade: "A-", attendance: "92%", image: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Liam Davis", grade: "B", attendance: "85%", image: "/placeholder.svg?height=32&width=32" },
    { id: 5, name: "Ava Miller", grade: "A", attendance: "98%", image: "/placeholder.svg?height=32&width=32" },
    { id: 6, name: "Sophia Wilson", grade: "C+", attendance: "78%", image: "/placeholder.svg?height=32&width=32" },
    { id: 7, name: "Jackson Moore", grade: "B-", attendance: "82%", image: "/placeholder.svg?height=32&width=32" },
    { id: 8, name: "Isabella Taylor", grade: "A", attendance: "94%", image: "/placeholder.svg?height=32&width=32" },
  ]

  // Sample course materials
  const courseMaterials = [
    { id: 1, name: "Course Syllabus", type: "PDF", size: "245 KB", uploadedBy: "Dr. Robert Chen", date: "Sep 1, 2023" },
    {
      id: 2,
      name: "Chapter 1: Introduction to Algebra",
      type: "PDF",
      size: "1.2 MB",
      uploadedBy: "Dr. Robert Chen",
      date: "Sep 5, 2023",
    },
    {
      id: 3,
      name: "Week 1 Lecture Slides",
      type: "PPTX",
      size: "3.5 MB",
      uploadedBy: "Dr. Robert Chen",
      date: "Sep 7, 2023",
    },
    {
      id: 4,
      name: "Homework Assignment 1",
      type: "PDF",
      size: "320 KB",
      uploadedBy: "Dr. Robert Chen",
      date: "Sep 8, 2023",
    },
    {
      id: 5,
      name: "Chapter 2: Linear Equations",
      type: "PDF",
      size: "1.5 MB",
      uploadedBy: "Dr. Robert Chen",
      date: "Sep 12, 2023",
    },
    {
      id: 6,
      name: "Week 2 Lecture Slides",
      type: "PPTX",
      size: "4.1 MB",
      uploadedBy: "Dr. Robert Chen",
      date: "Sep 14, 2023",
    },
  ]

  // Sample assignments
  const assignments = [
    { id: 1, name: "Homework 1: Basic Equations", dueDate: "Sep 15, 2023", status: "Completed", maxPoints: 100 },
    { id: 2, name: "Quiz 1: Chapter 1", dueDate: "Sep 22, 2023", status: "Completed", maxPoints: 50 },
    { id: 3, name: "Homework 2: Linear Functions", dueDate: "Sep 29, 2023", status: "In Progress", maxPoints: 100 },
    { id: 4, name: "Midterm Exam", dueDate: "Oct 15, 2023", status: "Upcoming", maxPoints: 200 },
    { id: 5, name: "Homework 3: Quadratic Equations", dueDate: "Oct 27, 2023", status: "Upcoming", maxPoints: 100 },
  ]

  // Sample announcements
  const announcements = [
    {
      id: 1,
      title: "Welcome to Algebra I",
      content:
        "Welcome to Algebra I! I'm excited to have you all in class this semester. Please review the syllabus and come prepared with questions for our first session.",
      date: "Aug 30, 2023",
      author: "Dr. Robert Chen",
    },
    {
      id: 2,
      title: "Office Hours Change",
      content:
        "Please note that my office hours will be changed to Tuesdays and Thursdays from 2:00 PM to 4:00 PM starting next week.",
      date: "Sep 10, 2023",
      author: "Dr. Robert Chen",
    },
    {
      id: 3,
      title: "Midterm Exam Information",
      content:
        "The midterm exam will cover chapters 1-3. A study guide will be posted next week. The exam will be held during our regular class time on October 15.",
      date: "Sep 25, 2023",
      author: "Dr. Robert Chen",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {course.code}: {course.name}
          </h1>
          <Badge
            variant={course.status === "Active" ? "default" : "secondary"}
            className={course.status === "Active" ? "bg-green-500 ml-2" : "bg-gray-500 ml-2"}
          >
            {course.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/dashboard/courses/${courseId}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Course
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Course Data
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Student
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete Course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>Basic information about the course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium">Department</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.department}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Credits</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.credits}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.startDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">End Date</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.endDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Prerequisites</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.prerequisites.join(", ")}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Course Progress</h3>
                    <div className="mt-2">
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{course.progress}% completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Enrolled Students</CardTitle>
                    <CardDescription>
                      {enrolledStudents.length} of {course.maxStudents} students enrolled
                    </CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrolledStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.image} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>{student.attendance}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Lecture notes, slides, and resources</CardDescription>
                  </div>
                  <Button size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courseMaterials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{material.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{material.type}</TableCell>
                          <TableCell>{material.size}</TableCell>
                          <TableCell>{material.uploadedBy}</TableCell>
                          <TableCell>{material.date}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>Homework, quizzes, and exams</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Max Points</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            <div className="font-medium">{assignment.name}</div>
                          </TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                assignment.status === "Completed"
                                  ? "default"
                                  : assignment.status === "In Progress"
                                    ? "outline"
                                    : "secondary"
                              }
                              className={
                                assignment.status === "Completed"
                                  ? "bg-green-500"
                                  : assignment.status === "In Progress"
                                    ? "border-blue-500 text-blue-500"
                                    : "bg-gray-500"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{assignment.maxPoints}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Important updates and information</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Announcement
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <Card key={announcement.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{announcement.title}</CardTitle>
                            <div className="text-xs text-muted-foreground">{announcement.date}</div>
                          </div>
                          <CardDescription>{announcement.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{announcement.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={course.teacher.image} alt={course.teacher.name} />
                  <AvatarFallback>{course.teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-medium">{course.teacher.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.teacher.email}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Class Days</h3>
                    <p className="text-sm text-muted-foreground">Monday, Wednesday, Friday</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p className="text-sm text-muted-foreground">9:00 AM - 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{course.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Enrollment</h3>
                    <span className="text-sm text-muted-foreground">
                      {enrolledStudents.length}/{course.maxStudents}
                    </span>
                  </div>
                  <Progress value={(enrolledStudents.length / course.maxStudents) * 100} className="h-2 mt-2" />
                </div>
                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Grade Distribution</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">A</span>
                      <Progress value={40} className="h-2 w-[80%]" />
                      <span className="text-xs">40%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">B</span>
                      <Progress value={35} className="h-2 w-[80%]" />
                      <span className="text-xs">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">C</span>
                      <Progress value={20} className="h-2 w-[80%]" />
                      <span className="text-xs">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">D</span>
                      <Progress value={5} className="h-2 w-[80%]" />
                      <span className="text-xs">5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">F</span>
                      <Progress value={0} className="h-2 w-[80%]" />
                      <span className="text-xs">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

