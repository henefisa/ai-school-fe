"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, BookOpen, Calendar, Download, Mail, MapPin, Phone, User } from "lucide-react"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [student] = useState({
    id: params.id,
    name: "Emma Johnson",
    grade: "10A",
    gender: "Female",
    dateOfBirth: "2008-05-15",
    address: "123 School Lane, Cityville",
    email: "emma.johnson@example.com",
    phone: "(555) 123-4567",
    parentName: "Michael & Sarah Johnson",
    parentEmail: "johnson.parents@example.com",
    parentPhone: "(555) 987-6543",
    enrollmentDate: "2022-09-01",
    status: "Active",
    attendance: 98,
    gpa: 3.8,
    avatar: "/placeholder.svg",
  })

  // Sample course data
  const courses = [
    { id: 1, code: "MATH101", name: "Algebra I", teacher: "Dr. Robert Chen", grade: "A", attendance: 97 },
    { id: 2, code: "ENG203", name: "English Literature", teacher: "Sarah Johnson", grade: "A-", attendance: 100 },
    { id: 3, code: "SCI105", name: "Biology", teacher: "Michael Williams", grade: "B+", attendance: 95 },
    { id: 4, code: "HIST202", name: "World History", teacher: "Emily Davis", grade: "A", attendance: 98 },
    {
      id: 5,
      code: "CS101",
      name: "Computer Science Fundamentals",
      teacher: "David Martinez",
      grade: "A+",
      attendance: 100,
    },
  ]

  // Sample attendance data
  const attendanceData = [
    { date: "2025-03-01", status: "Present" },
    { date: "2025-03-02", status: "Present" },
    { date: "2025-03-03", status: "Present" },
    { date: "2025-03-04", status: "Absent", reason: "Sick" },
    { date: "2025-03-05", status: "Present" },
    { date: "2025-03-06", status: "Present" },
    { date: "2025-03-07", status: "Present" },
    { date: "2025-03-08", status: "Present" },
    { date: "2025-03-09", status: "Late", reason: "Traffic" },
    { date: "2025-03-10", status: "Present" },
  ]

  // Sample grades data
  const gradesData = [
    { assignment: "Algebra Quiz 1", course: "MATH101", date: "2025-02-10", grade: "90/100", type: "Quiz" },
    { assignment: "English Essay", course: "ENG203", date: "2025-02-15", grade: "88/100", type: "Assignment" },
    { assignment: "Biology Lab Report", course: "SCI105", date: "2025-02-20", grade: "85/100", type: "Lab" },
    {
      assignment: "History Presentation",
      course: "HIST202",
      date: "2025-02-25",
      grade: "95/100",
      type: "Presentation",
    },
    { assignment: "Programming Project", course: "CS101", date: "2025-03-01", grade: "98/100", type: "Project" },
    { assignment: "Algebra Midterm", course: "MATH101", date: "2025-03-05", grade: "92/100", type: "Exam" },
    { assignment: "English Book Report", course: "ENG203", date: "2025-03-10", grade: "90/100", type: "Assignment" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/students">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button>Contact Parent</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">Student ID: {student.id}</p>
                <Badge className="mt-2" variant={student.status === "Active" ? "default" : "destructive"}>
                  {student.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <span className="text-muted-foreground">Grade:</span>
                  <span>{student.grade}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span>{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <span className="text-muted-foreground">Address:</span>
                  <span>{student.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{student.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{student.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-medium">Parent/Guardian Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2">{student.parentName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2">{student.parentEmail}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2">{student.parentPhone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-5">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">GPA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.gpa}</div>
                <p className="text-xs text-muted-foreground">Out of 4.0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">{student.attendance}%</div>
                <Progress value={student.attendance} className="h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(student.enrollmentDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(
                    (new Date().getTime() - new Date(student.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24 * 30),
                  )}{" "}
                  months
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="courses">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Enrolled Courses</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.teacher}</TableCell>
                          <TableCell>{course.grade}</TableCell>
                          <TableCell>{course.attendance}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Grades</CardTitle>
                  <CardDescription>View all grades and assignments for this student</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gradesData.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{grade.assignment}</TableCell>
                          <TableCell>{grade.course}</TableCell>
                          <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                          <TableCell>{grade.grade}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{grade.type}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Recent attendance history for this student</CardDescription>
                </CardHeader>
                <CardContent>
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
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Documents</CardTitle>
                  <CardDescription>Important documents related to this student</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Enrollment Form</p>
                          <p className="text-sm text-muted-foreground">Uploaded on Sep 1, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Medical Records</p>
                          <p className="text-sm text-muted-foreground">Uploaded on Sep 5, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Previous School Records</p>
                          <p className="text-sm text-muted-foreground">Uploaded on Sep 10, 2022</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Last Semester Report Card</p>
                          <p className="text-sm text-muted-foreground">Uploaded on Jan 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

