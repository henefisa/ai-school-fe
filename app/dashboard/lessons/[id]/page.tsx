"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  PencilIcon,
  Video,
} from "lucide-react"

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Sample lesson data
  const lesson = {
    id: params.id,
    title: "Introduction to Quadratic Equations",
    course: { id: 1, name: "Algebra I", grade: "10A" },
    date: "2025-03-20",
    time: "09:00 - 10:30",
    status: "upcoming",
    description: `
      This lesson introduces students to quadratic equations and their properties. We will cover:
      
      • The standard form of a quadratic equation: ax² + bx + c = 0
      • Identifying the coefficients a, b, and c
      • Understanding the graph of a quadratic function (parabola)
      • Finding the roots (solutions) of quadratic equations
      
      Students will learn how to solve quadratic equations using factoring, completing the square, and the quadratic formula.
    `,
    objectives: `
      By the end of this lesson, students will be able to:
      
      • Identify a quadratic equation in standard form
      • Understand the relationship between the coefficients and the graph
      • Solve simple quadratic equations by factoring
      • Apply the quadratic formula to find solutions
      • Interpret the solutions in the context of the problem
    `,
    meetingLink: "https://zoom.us/j/123456789",
    resources: [
      { id: 1, type: "document", name: "Quadratic Equations.pdf", size: "2.4 MB" },
      { id: 2, type: "video", name: "Solving Quadratics Tutorial", size: "45 MB" },
      { id: 3, type: "link", name: "Interactive Quadratics Explorer", url: "https://www.geogebra.org/m/qbmhuzgw" },
    ],
    hasAssignment: true,
    assignment: {
      id: 1,
      title: "Quadratic Equations Practice",
      dueDate: "2025-03-25",
      status: "active",
    },
    hasQuiz: false,
    hasDiscussion: true,
    discussion: {
      id: 1,
      title: "Quadratic Equations Discussion",
      posts: 5,
    },
    attendance: {
      total: 30,
      present: 0,
      absent: 0,
      notTaken: 30,
    },
  }

  // Sample students data
  const students = [
    { id: 1, name: "Emma Johnson", avatar: "/placeholder.svg", status: "not-taken" },
    { id: 2, name: "Liam Smith", avatar: "/placeholder.svg", status: "not-taken" },
    { id: 3, name: "Olivia Brown", avatar: "/placeholder.svg", status: "not-taken" },
    { id: 4, name: "Noah Davis", avatar: "/placeholder.svg", status: "not-taken" },
    { id: 5, name: "Sophia Wilson", avatar: "/placeholder.svg", status: "not-taken" },
  ]

  // State for attendance tracking
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, "present" | "absent" | "not-taken">>(
    students.reduce(
      (acc, student) => ({ ...acc, [student.id]: student.status as "present" | "absent" | "not-taken" }),
      {},
    ),
  )

  const handleAttendanceChange = (studentId: number, status: "present" | "absent" | "not-taken") => {
    setAttendanceStatus((prev) => ({ ...prev, [studentId]: status }))
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
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/lessons/${params.id}/edit`}>
            <Button variant="outline">
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Lesson
            </Button>
          </Link>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Mark as Complete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lesson.course.name}</div>
            <p className="text-xs text-muted-foreground">Grade {lesson.course.grade}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date & Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(lesson.date).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">{lesson.time}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={lesson.status === "upcoming" ? "default" : "outline"}>
                {lesson.status === "upcoming" ? "Upcoming" : "Completed"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Lesson status</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Elements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {lesson.description.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {lesson.objectives.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>

          {lesson.meetingLink && (
            <Card>
              <CardHeader>
                <CardTitle>Online Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{lesson.meetingLink}</p>
                    <p className="text-sm text-muted-foreground">Click the button to join the meeting</p>
                  </div>
                  <a href={lesson.meetingLink} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Join Meeting
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Resources</CardTitle>
              <CardDescription>Access and manage resources for this lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lesson.resources.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No resources available</p>
                  </div>
                ) : (
                  lesson.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center gap-4 p-4 border rounded-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {resource.type === "document" && <FileText className="h-5 w-5 text-primary" />}
                        {resource.type === "video" && <Video className="h-5 w-5 text-primary" />}
                        {resource.type === "link" && <ExternalLink className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {resource.type === "link" ? resource.url : `${resource.size}`}
                        </p>
                      </div>
                      <div>
                        {resource.type === "link" ? (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open
                            </Button>
                          </a>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4">
                <Link href={`/dashboard/lessons/${params.id}/edit`}>
                  <Button variant="outline">
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Manage Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
              <CardDescription>Track student attendance for this lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Present</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(attendanceStatus).filter((status) => status === "present").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(
                        (Object.values(attendanceStatus).filter((status) => status === "present").length /
                          students.length) *
                        100
                      ).toFixed(0)}
                      % of students
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Absent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {Object.values(attendanceStatus).filter((status) => status === "absent").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(
                        (Object.values(attendanceStatus).filter((status) => status === "absent").length /
                          students.length) *
                        100
                      ).toFixed(0)}
                      % of students
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Not Taken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-muted-foreground">
                      {Object.values(attendanceStatus).filter((status) => status === "not-taken").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {(
                        (Object.values(attendanceStatus).filter((status) => status === "not-taken").length /
                          students.length) *
                        100
                      ).toFixed(0)}
                      % of students
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center gap-4 p-4 border rounded-md">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={attendanceStatus[student.id] === "present" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAttendanceChange(student.id, "present")}
                      >
                        Present
                      </Button>
                      <Button
                        variant={attendanceStatus[student.id] === "absent" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleAttendanceChange(student.id, "absent")}
                      >
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button>Save Attendance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Elements Tab */}
        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Elements</CardTitle>
              <CardDescription>Manage interactive elements for this lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {lesson.hasAssignment && (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{lesson.assignment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(lesson.assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/assignments/${lesson.assignment.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/assignments/${lesson.assignment.id}/edit`}>
                          <Button size="sm">
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {lesson.hasQuiz && (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Lesson Quiz</p>
                        <p className="text-sm text-muted-foreground">10 questions</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {lesson.hasDiscussion && (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{lesson.discussion.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.discussion.posts} posts</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm">
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!lesson.hasAssignment && !lesson.hasQuiz && !lesson.hasDiscussion && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No interactive elements available</p>
                    <div className="mt-4">
                      <Link href={`/dashboard/lessons/${params.id}/edit`}>
                        <Button>
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Add Interactive Elements
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

