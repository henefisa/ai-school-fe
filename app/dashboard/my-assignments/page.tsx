"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Filter, Search, SlidersHorizontal } from "lucide-react"

export default function MyAssignmentsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Sample courses
  const courses = [
    { id: "MATH101", name: "Algebra I" },
    { id: "ENG203", name: "English Literature" },
    { id: "SCI105", name: "Biology" },
    { id: "HIST202", name: "World History" },
  ]

  // Sample assignments
  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Practice",
      course: "MATH101",
      courseName: "Algebra I",
      dueDate: "2025-03-25",
      status: "not-started",
      grade: null,
    },
    {
      id: 2,
      title: "Literary Analysis Essay",
      course: "ENG203",
      courseName: "English Literature",
      dueDate: "2025-03-20",
      status: "in-progress",
      grade: null,
    },
    {
      id: 3,
      title: "Cell Structure Diagram",
      course: "SCI105",
      courseName: "Biology",
      dueDate: "2025-03-15",
      status: "submitted",
      grade: null,
    },
    {
      id: 4,
      title: "World War II Research Paper",
      course: "HIST202",
      courseName: "World History",
      dueDate: "2025-03-30",
      status: "not-started",
      grade: null,
    },
    {
      id: 5,
      title: "Polynomial Functions Quiz",
      course: "MATH101",
      courseName: "Algebra I",
      dueDate: "2025-03-18",
      status: "graded",
      grade: 92,
    },
    {
      id: 6,
      title: "Shakespeare Character Analysis",
      course: "ENG203",
      courseName: "English Literature",
      dueDate: "2025-03-10",
      status: "graded",
      grade: 88,
    },
  ]

  // Filter assignments based on selected filters
  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedCourse !== "all" && assignment.course !== selectedCourse) return false
    if (selectedStatus !== "all" && assignment.status !== selectedStatus) return false
    if (selectedDate && format(new Date(assignment.dueDate), "yyyy-MM-dd") !== format(selectedDate, "yyyy-MM-dd"))
      return false
    return true
  })

  // Calculate statistics
  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter((a) => a.status === "submitted" || a.status === "graded").length
  const pendingAssignments = assignments.filter((a) => a.status === "not-started" || a.status === "in-progress").length
  const gradedAssignments = assignments.filter((a) => a.status === "graded").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
          <p className="text-muted-foreground">View and manage your assignments.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssignments}</div>
            <p className="text-xs text-muted-foreground">
              {((completedAssignments / totalAssignments) * 100).toFixed(0)}% of assignments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments}</div>
            <p className="text-xs text-muted-foreground">
              {((pendingAssignments / totalAssignments) * 100).toFixed(0)}% of assignments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradedAssignments}</div>
            <p className="text-xs text-muted-foreground">
              {((gradedAssignments / totalAssignments) * 100).toFixed(0)}% of assignments
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>View all your assignments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assignments..."
                    className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Course</label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Courses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="graded">Graded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Due Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {(selectedCourse !== "all" || selectedStatus !== "all" || selectedDate) && (
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedCourse("all")
                        setSelectedStatus("all")
                        setSelectedDate(null)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">No assignments found</p>
                          {(selectedCourse || selectedStatus || selectedDate) && (
                            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.courseName}</TableCell>
                        <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.status === "graded"
                                ? "default"
                                : assignment.status === "submitted"
                                  ? "secondary"
                                  : assignment.status === "in-progress"
                                    ? "outline"
                                    : "outline"
                            }
                          >
                            {assignment.status === "graded"
                              ? "Graded"
                              : assignment.status === "submitted"
                                ? "Submitted"
                                : assignment.status === "in-progress"
                                  ? "In Progress"
                                  : "Not Started"}
                          </Badge>
                        </TableCell>
                        <TableCell>{assignment.grade !== null ? `${assignment.grade}/100` : "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/dashboard/my-assignments/${assignment.id}`}>
                              <Button variant="ghost" size="sm">
                                {assignment.status === "not-started"
                                  ? "Start"
                                  : assignment.status === "in-progress"
                                    ? "Continue"
                                    : "View"}
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {/* Similar content as "all" tab but filtered for pending assignments */}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {/* Similar content as "all" tab but filtered for completed assignments */}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {/* Similar content as "all" tab but filtered for graded assignments */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

