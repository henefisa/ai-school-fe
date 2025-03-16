"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Filter, PlusCircle, Search, Video } from "lucide-react"

export default function LessonsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCourse, setFilterCourse] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [view, setView] = useState<"list" | "calendar">("list")

  // Sample courses data
  const courses = [
    { id: 1, name: "Algebra I", grade: "10A" },
    { id: 2, name: "English Literature", grade: "11B" },
    { id: 3, name: "Biology", grade: "9C" },
    { id: 4, name: "World History", grade: "12A" },
  ]

  // Sample lessons data
  const lessons = [
    {
      id: 1,
      title: "Introduction to Quadratic Equations",
      course: { id: 1, name: "Algebra I", grade: "10A" },
      date: "2025-03-20",
      time: "09:00 - 10:30",
      status: "upcoming",
      resources: [
        { type: "document", name: "Quadratic Equations.pdf" },
        { type: "video", name: "Solving Quadratics Tutorial" },
      ],
      hasAssignment: true,
      hasQuiz: false,
      hasDiscussion: true,
    },
    {
      id: 2,
      title: "Shakespeare's Macbeth: Character Analysis",
      course: { id: 2, name: "English Literature", grade: "11B" },
      date: "2025-03-18",
      time: "11:00 - 12:30",
      status: "upcoming",
      resources: [
        { type: "document", name: "Macbeth Character Guide.pdf" },
        { type: "document", name: "Essay Guidelines.docx" },
      ],
      hasAssignment: true,
      hasQuiz: true,
      hasDiscussion: false,
    },
    {
      id: 3,
      title: "Cell Structure and Function",
      course: { id: 3, name: "Biology", grade: "9C" },
      date: "2025-03-15",
      time: "13:00 - 14:30",
      status: "completed",
      resources: [
        { type: "document", name: "Cell Structure Notes.pdf" },
        { type: "video", name: "Cell Function Animation" },
        { type: "link", name: "Interactive Cell Explorer" },
      ],
      hasAssignment: true,
      hasQuiz: true,
      hasDiscussion: true,
    },
    {
      id: 4,
      title: "World War II: Causes and Effects",
      course: { id: 4, name: "World History", grade: "12A" },
      date: "2025-03-12",
      time: "10:00 - 11:30",
      status: "completed",
      resources: [
        { type: "document", name: "WWII Timeline.pdf" },
        { type: "document", name: "Primary Sources.pdf" },
      ],
      hasAssignment: true,
      hasQuiz: false,
      hasDiscussion: true,
    },
    {
      id: 5,
      title: "Factoring Polynomials",
      course: { id: 1, name: "Algebra I", grade: "10A" },
      date: "2025-03-10",
      time: "09:00 - 10:30",
      status: "completed",
      resources: [
        { type: "document", name: "Factoring Worksheet.pdf" },
        { type: "video", name: "Factoring Techniques" },
      ],
      hasAssignment: true,
      hasQuiz: true,
      hasDiscussion: false,
    },
  ]

  // Filter lessons based on search query and filters
  const filteredLessons = lessons.filter((lesson) => {
    // Apply search filter
    if (searchQuery && !lesson.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Apply course filter
    if (filterCourse !== "all" && lesson.course.id !== Number.parseInt(filterCourse)) {
      return false
    }

    // Apply status filter
    if (filterStatus !== "all" && lesson.status !== filterStatus) {
      return false
    }

    return true
  })

  // Group lessons by date for calendar view
  const lessonsByDate = filteredLessons.reduce(
    (acc, lesson) => {
      const date = lesson.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(lesson)
      return acc
    },
    {} as Record<string, typeof lessons>,
  )

  // Get dates for the current month
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const date = new Date(currentYear, currentMonth, day)
    const dateString = date.toISOString().split("T")[0]
    return {
      day,
      date: dateString,
      lessons: lessonsByDate[dateString] || [],
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
          <p className="text-muted-foreground">Create and manage your lessons</p>
        </div>
        <Link href="/dashboard/lessons/create">
          <Button className="sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Lesson
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
            <p className="text-xs text-muted-foreground">All lessons</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((lesson) => lesson.status === "upcoming").length}</div>
            <p className="text-xs text-muted-foreground">Scheduled lessons</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((lesson) => lesson.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Finished lessons</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lessons.reduce((total, lesson) => total + lesson.resources.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Lesson materials</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
            <FileText className="mr-2 h-4 w-4" />
            List View
          </Button>
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search lessons..."
              className="w-full rounded-md pl-8 sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.name} ({course.grade})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker className="w-[160px]" />
        </div>
      </div>

      {view === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Lesson List</CardTitle>
            <CardDescription>View and manage your lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredLessons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No lessons found</p>
                </div>
              ) : (
                filteredLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4 md:w-1/3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <Link href={`/dashboard/lessons/${lesson.id}`} className="font-medium hover:underline">
                          {lesson.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {lesson.course.name} ({lesson.course.grade})
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:w-2/3">
                      <div className="flex items-center gap-2 md:w-1/3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(lesson.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 md:w-1/3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lesson.time}</span>
                      </div>
                      <div className="flex items-center gap-2 md:w-1/3">
                        <Badge variant={lesson.status === "upcoming" ? "default" : "outline"}>
                          {lesson.status === "upcoming" ? "Upcoming" : "Completed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:ml-auto">
                      <div className="flex gap-1">
                        {lesson.resources.map((resource, index) => (
                          <Badge key={index} variant="secondary" className="mr-1">
                            {resource.type === "document" && <FileText className="h-3 w-3 mr-1" />}
                            {resource.type === "video" && <Video className="h-3 w-3 mr-1" />}
                            {resource.type === "link" && <Link className="h-3 w-3 mr-1" />}
                            {resource.type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <Link href={`/dashboard/lessons/${lesson.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/lessons/${lesson.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lesson Calendar</CardTitle>
            <CardDescription>View your lessons by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {/* Add empty cells for days before the first day of the month */}
              {Array.from({ length: new Date(currentYear, currentMonth, 1).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="h-32 border rounded-md p-2 bg-muted/20"></div>
              ))}

              {calendarDays.map((day) => (
                <div
                  key={day.date}
                  className={`h-32 border rounded-md p-2 overflow-y-auto ${
                    day.date === new Date().toISOString().split("T")[0] ? "border-primary" : ""
                  }`}
                >
                  <div className="font-medium mb-2">{day.day}</div>
                  {day.lessons.map((lesson) => (
                    <Link href={`/dashboard/lessons/${lesson.id}`} key={lesson.id}>
                      <div className="text-xs p-1 mb-1 rounded bg-primary/10 hover:bg-primary/20">
                        <div className="font-medium truncate">{lesson.title}</div>
                        <div className="text-muted-foreground">{lesson.time}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

