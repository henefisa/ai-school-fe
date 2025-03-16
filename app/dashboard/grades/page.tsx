"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, PlusCircle, Save, Search, SlidersHorizontal } from "lucide-react"

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState("10A")
  const [selectedCourse, setSelectedCourse] = useState("MATH101")

  // Sample classes
  const classes = ["9A", "9B", "10A", "10B", "11A", "11B", "12A", "12B"]

  // Sample courses
  const courses = [
    { code: "MATH101", name: "Algebra I" },
    { code: "ENG203", name: "English Literature" },
    { code: "SCI105", name: "Biology" },
    { code: "HIST202", name: "World History" },
    { code: "CS101", name: "Computer Science Fundamentals" },
  ]

  // Sample students for grading
  const students = [
    { id: 1, name: "Emma Johnson", assignment1: 92, assignment2: 88, midterm: 90, final: null },
    { id: 2, name: "Liam Smith", assignment1: 85, assignment2: 82, midterm: 78, final: null },
    { id: 3, name: "Olivia Brown", assignment1: 95, assignment2: 90, midterm: 92, final: null },
    { id: 4, name: "Noah Davis", assignment1: 78, assignment2: 80, midterm: 75, final: null },
    { id: 5, name: "Sophia Wilson", assignment1: 88, assignment2: 85, midterm: 82, final: null },
    { id: 6, name: "Jackson Miller", assignment1: 90, assignment2: 92, midterm: 88, final: null },
    { id: 7, name: "Ava Moore", assignment1: 98, assignment2: 95, midterm: 96, final: null },
    { id: 8, name: "Lucas Taylor", assignment1: 75, assignment2: 78, midterm: 72, final: null },
    { id: 9, name: "Mia Anderson", assignment1: 82, assignment2: 80, midterm: 78, final: null },
    { id: 10, name: "Ethan Thomas", assignment1: 88, assignment2: 85, midterm: 90, final: null },
  ]

  // Sample grade reports
  const gradeReports = [
    {
      id: 1,
      class: "10A",
      course: "MATH101",
      name: "Algebra I",
      teacher: "Dr. Robert Chen",
      avgGrade: "B+",
      passRate: "92%",
    },
    {
      id: 2,
      class: "10A",
      course: "ENG203",
      name: "English Literature",
      teacher: "Sarah Johnson",
      avgGrade: "B",
      passRate: "88%",
    },
    {
      id: 3,
      class: "10A",
      course: "SCI105",
      name: "Biology",
      teacher: "Michael Williams",
      avgGrade: "B+",
      passRate: "90%",
    },
    {
      id: 4,
      class: "10A",
      course: "HIST202",
      name: "World History",
      teacher: "Emily Davis",
      avgGrade: "B",
      passRate: "85%",
    },
    {
      id: 5,
      class: "10A",
      course: "CS101",
      name: "Computer Science Fundamentals",
      teacher: "David Martinez",
      avgGrade: "A-",
      passRate: "95%",
    },
  ]

  // Sample assignments
  const assignments = [
    { id: 1, name: "Algebra Quiz 1", course: "MATH101", dueDate: "2025-02-10", maxScore: 100, weight: "10%" },
    { id: 2, name: "Algebra Assignment 1", course: "MATH101", dueDate: "2025-02-15", maxScore: 100, weight: "15%" },
    { id: 3, name: "Algebra Midterm", course: "MATH101", dueDate: "2025-03-01", maxScore: 100, weight: "30%" },
    { id: 4, name: "Algebra Assignment 2", course: "MATH101", dueDate: "2025-03-15", maxScore: 100, weight: "15%" },
    { id: 5, name: "Algebra Final Exam", course: "MATH101", dueDate: "2025-04-01", maxScore: 100, weight: "30%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
          <p className="text-muted-foreground">Manage student grades and academic performance.</p>
        </div>
        <Button className="sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">87.5% average score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">98% (Ava Moore)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">9 out of 10 students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 completed, 2 upcoming</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enter-grades">
        <TabsList>
          <TabsTrigger value="enter-grades">Enter Grades</TabsTrigger>
          <TabsTrigger value="grade-reports">Grade Reports</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="enter-grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Input Grades</CardTitle>
              <CardDescription>Enter grades for a class and course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          Class {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Course</label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.code} value={course.code}>
                          {course.code} - {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Load Students</Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Assignment 1</TableHead>
                    <TableHead>Assignment 2</TableHead>
                    <TableHead>Midterm</TableHead>
                    <TableHead>Final Exam</TableHead>
                    <TableHead>Overall</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const overall =
                      student.final !== null
                        ? Math.round(
                            student.assignment1 * 0.15 +
                              student.assignment2 * 0.15 +
                              student.midterm * 0.3 +
                              student.final * 0.4,
                          )
                        : Math.round(
                            (student.assignment1 * 0.15 + student.assignment2 * 0.15 + student.midterm * 0.3) / 0.6,
                          )

                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Input type="number" value={student.assignment1} className="h-8 w-16" min="0" max="100" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={student.assignment2} className="h-8 w-16" min="0" max="100" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" value={student.midterm} className="h-8 w-16" min="0" max="100" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="TBD" className="h-8 w-16" min="0" max="100" />
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              overall >= 90
                                ? "default"
                                : overall >= 80
                                  ? "secondary"
                                  : overall >= 70
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {overall}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Grades
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grade-reports" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Course Grade Reports</CardTitle>
                <CardDescription>View grade reports for all courses</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Average Grade</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradeReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.class}</TableCell>
                      <TableCell>{report.course}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.teacher}</TableCell>
                      <TableCell>{report.avgGrade}</TableCell>
                      <TableCell>{report.passRate}</TableCell>
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
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Manage course assignments and grading</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Assignment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Max Score</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.name}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{assignment.maxScore}</TableCell>
                      <TableCell>{assignment.weight}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Grade
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

