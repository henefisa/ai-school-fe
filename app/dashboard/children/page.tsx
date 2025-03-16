"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Calendar, MessageSquare, Search, User } from "lucide-react"

export default function ChildrenPage() {
  const [selectedChild, setSelectedChild] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample children data
  const children = [
    {
      id: 1,
      name: "Emma Johnson",
      grade: "10A",
      avatar: "/placeholder.svg",
      teacher: "Dr. Robert Chen",
      attendance: { present: 98, absent: 2, late: 0 },
      gpa: 3.8,
      recentActivity: {
        newGrades: 2,
        upcomingAssignments: 3,
      },
    },
    {
      id: 2,
      name: "Noah Johnson",
      grade: "7B",
      avatar: "/placeholder.svg",
      teacher: "Sarah Johnson",
      attendance: { present: 95, absent: 3, late: 2 },
      gpa: 3.5,
      recentActivity: {
        newGrades: 1,
        upcomingAssignments: 2,
      },
    },
  ]

  // Sample grades data
  const grades = [
    { subject: "Mathematics", currentGrade: "A", teacher: "Dr. Robert Chen", lastUpdated: "Mar 15, 2025" },
    { subject: "English Literature", currentGrade: "A-", teacher: "Sarah Johnson", lastUpdated: "Mar 12, 2025" },
    { subject: "Biology", currentGrade: "B+", teacher: "Michael Williams", lastUpdated: "Mar 10, 2025" },
    { subject: "World History", currentGrade: "A", teacher: "Emily Davis", lastUpdated: "Mar 8, 2025" },
    { subject: "Computer Science", currentGrade: "A+", teacher: "David Martinez", lastUpdated: "Mar 5, 2025" },
  ]

  // Sample attendance data
  const attendanceData = [
    { date: "2025-03-15", status: "Present" },
    { date: "2025-03-14", status: "Present" },
    { date: "2025-03-13", status: "Present" },
    { date: "2025-03-12", status: "Absent", reason: "Sick" },
    { date: "2025-03-11", status: "Present" },
    { date: "2025-03-10", status: "Present" },
    { date: "2025-03-09", status: "Present" },
    { date: "2025-03-08", status: "Present" },
    { date: "2025-03-07", status: "Late", reason: "Traffic" },
    { date: "2025-03-06", status: "Present" },
  ]

  // Sample assignments data
  const assignments = [
    {
      title: "Quadratic Equations",
      subject: "Mathematics",
      dueDate: "2025-03-20",
      status: "Pending",
    },
    {
      title: "Essay on Shakespeare",
      subject: "English Literature",
      dueDate: "2025-03-22",
      status: "Submitted",
    },
    {
      title: "Lab Report: Photosynthesis",
      subject: "Biology",
      dueDate: "2025-03-18",
      status: "Graded",
      grade: "A-",
    },
    {
      title: "World War II Research",
      subject: "World History",
      dueDate: "2025-03-25",
      status: "Pending",
    },
  ]

  // Sample events data
  const events = [
    { title: "Math Quiz", date: "2025-03-20", type: "Academic" },
    { title: "Science Fair", date: "2025-04-05", type: "Event" },
    { title: "Parent-Teacher Meeting", date: "2025-03-25", type: "Meeting" },
  ]

  const selectedChildData = children.find((child) => child.id === selectedChild)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
          <p className="text-muted-foreground">View and monitor your children's academic progress</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md pl-8 sm:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Children List Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Children</CardTitle>
              <CardDescription>Select a child to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  className={`flex items-center gap-4 p-3 rounded-md cursor-pointer hover:bg-muted ${selectedChild === child.id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedChild(child.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={child.avatar} alt={child.name} />
                    <AvatarFallback>
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-muted-foreground">Grade {child.grade}</p>
                  </div>
                  <div className="flex flex-col items-end text-xs">
                    {child.recentActivity.newGrades > 0 && (
                      <Badge variant="secondary" className="mb-1">
                        {child.recentActivity.newGrades} new grades
                      </Badge>
                    )}
                    {child.recentActivity.upcomingAssignments > 0 && (
                      <Badge variant="outline">{child.recentActivity.upcomingAssignments} assignments</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Child Details */}
        <div className="md:col-span-8 lg:col-span-9">
          {selectedChildData && (
            <div className="space-y-6">
              {/* Child Overview */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedChildData.avatar} alt={selectedChildData.name} />
                    <AvatarFallback>
                      {selectedChildData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedChildData.name}</CardTitle>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Teacher
                      </Button>
                    </div>
                    <CardDescription>
                      Grade {selectedChildData.grade} • Teacher: {selectedChildData.teacher}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">GPA</span>
                        <span className="text-sm text-muted-foreground">{selectedChildData.gpa}/4.0</span>
                      </div>
                      <Progress value={selectedChildData.gpa * 25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Attendance</span>
                        <span className="text-sm text-muted-foreground">{selectedChildData.attendance.present}%</span>
                      </div>
                      <Progress value={selectedChildData.attendance.present} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Upcoming</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedChildData.recentActivity.upcomingAssignments} assignments
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                        <Button size="sm" className="w-full">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Information Tabs */}
              <Tabs defaultValue="grades">
                <TabsList>
                  <TabsTrigger value="grades">Grades</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>

                {/* Grades Tab */}
                <TabsContent value="grades" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Grades</CardTitle>
                      <CardDescription>Academic performance across all subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Current Grade</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {grades.map((grade, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{grade.subject}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    grade.currentGrade.startsWith("A")
                                      ? "default"
                                      : grade.currentGrade.startsWith("B")
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {grade.currentGrade}
                                </Badge>
                              </TableCell>
                              <TableCell>{grade.teacher}</TableCell>
                              <TableCell>{grade.lastUpdated}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Attendance Tab */}
                <TabsContent value="attendance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attendance Record</CardTitle>
                      <CardDescription>Recent attendance history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Present</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                              {selectedChildData.attendance.present}%
                            </div>
                            <p className="text-xs text-muted-foreground">{selectedChildData.attendance.present} days</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Absent</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                              {selectedChildData.attendance.absent}%
                            </div>
                            <p className="text-xs text-muted-foreground">{selectedChildData.attendance.absent} days</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Late</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-amber-600">
                              {selectedChildData.attendance.late}%
                            </div>
                            <p className="text-xs text-muted-foreground">{selectedChildData.attendance.late} days</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Reason (if applicable)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {attendanceData.map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    record.status === "Present"
                                      ? "outline"
                                      : record.status === "Absent"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {record.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{record.reason || "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assignments</CardTitle>
                      <CardDescription>Current and upcoming assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assignments.map((assignment, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{assignment.title}</TableCell>
                              <TableCell>{assignment.subject}</TableCell>
                              <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    assignment.status === "Pending"
                                      ? "default"
                                      : assignment.status === "Submitted"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {assignment.status}
                                  {assignment.grade && ` (${assignment.grade})`}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Calendar Tab */}
                <TabsContent value="calendar" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>School Calendar</CardTitle>
                      <CardDescription>Upcoming events and important dates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {events.map((event, index) => (
                          <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

