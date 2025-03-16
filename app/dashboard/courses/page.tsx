"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, Download, PlusCircle, Search, Users, BookText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function CoursesPage() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Sample course data
  const courses = [
    {
      id: 1,
      code: "MATH101",
      name: "Algebra I",
      department: "Mathematics",
      teacher: "Dr. Robert Chen",
      students: 28,
      schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
      location: "Room 201",
      status: "Active",
    },
    {
      id: 2,
      code: "ENG203",
      name: "English Literature",
      department: "English",
      teacher: "Sarah Johnson",
      students: 32,
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      location: "Room 105",
      status: "Active",
    },
    {
      id: 3,
      code: "SCI105",
      name: "Biology",
      department: "Science",
      teacher: "Michael Williams",
      students: 30,
      schedule: "Mon, Wed 1:00 PM - 2:30 PM",
      location: "Lab 3",
      status: "Active",
    },
    {
      id: 4,
      code: "HIST202",
      name: "World History",
      department: "History",
      teacher: "Emily Davis",
      students: 25,
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      location: "Room 302",
      status: "Active",
    },
    {
      id: 5,
      code: "PE101",
      name: "Physical Education",
      department: "Physical Education",
      teacher: "James Wilson",
      students: 35,
      schedule: "Fri 1:00 PM - 3:00 PM",
      location: "Gymnasium",
      status: "Inactive",
    },
    {
      id: 6,
      code: "ART110",
      name: "Introduction to Art",
      department: "Art",
      teacher: "Jennifer Taylor",
      students: 22,
      schedule: "Mon, Wed 3:00 PM - 4:30 PM",
      location: "Art Studio 1",
      status: "Active",
    },
    {
      id: 7,
      code: "CS101",
      name: "Computer Science Fundamentals",
      department: "Computer Science",
      teacher: "David Martinez",
      students: 26,
      schedule: "Tue, Thu 9:00 AM - 10:30 AM",
      location: "Computer Lab 2",
      status: "Active",
    },
    {
      id: 8,
      code: "MUS120",
      name: "Music Theory",
      department: "Music",
      teacher: "Lisa Anderson",
      students: 18,
      schedule: "Wed, Fri 11:00 AM - 12:30 PM",
      location: "Music Room",
      status: "Active",
    },
    {
      id: 9,
      code: "GEO201",
      name: "Geography",
      department: "Geography",
      teacher: "Thomas Brown",
      students: 24,
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      location: "Room 203",
      status: "Inactive",
    },
    {
      id: 10,
      code: "CHEM102",
      name: "Chemistry",
      department: "Chemistry",
      teacher: "Patricia Miller",
      students: 27,
      schedule: "Tue, Thu 1:00 PM - 2:30 PM",
      location: "Lab 2",
      status: "Active",
    },
    {
      id: 11,
      code: "PHYS101",
      name: "Physics I",
      department: "Physics",
      teacher: "Richard Wilson",
      students: 23,
      schedule: "Mon, Wed, Fri 2:00 PM - 3:30 PM",
      location: "Lab 4",
      status: "Active",
    },
    {
      id: 12,
      code: "SPAN101",
      name: "Spanish I",
      department: "Languages",
      teacher: "Maria Rodriguez",
      students: 20,
      schedule: "Tue, Thu 10:00 AM - 11:30 AM",
      location: "Room 107",
      status: "Active",
    },
  ]

  // Get unique departments for filter
  const departments = [...new Set(courses.map((course) => course.department))]

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || course.department === departmentFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setDepartmentFilter("all")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  // Check if any filter is applied
  const isFilterApplied = searchQuery !== "" || departmentFilter !== "all" || statusFilter !== "all"

  // Stats calculation
  const totalCourses = courses.length
  const activeCourses = courses.filter((course) => course.status === "Active").length
  const totalDepartments = departments.length
  const averageClassSize = Math.round(courses.reduce((acc, course) => acc + course.students, 0) / totalCourses)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage course information, assignments, and curriculum.</p>
        </div>
        <Link href="/dashboard/courses/create">
          <Button className="sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDepartments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Class Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageClassSize}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Course Management</CardTitle>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="w-full pl-8 sm:w-[200px] md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {isFilterApplied && (
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              )}
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Teacher</TableHead>
                  <TableHead className="hidden lg:table-cell">Schedule</TableHead>
                  <TableHead className="hidden sm:table-cell">Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{course.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{course.teacher}</TableCell>
                      <TableCell className="hidden lg:table-cell">{course.schedule}</TableCell>
                      <TableCell className="hidden sm:table-cell">{course.students}</TableCell>
                      <TableCell>
                        <Badge
                          variant={course.status === "Active" ? "default" : "secondary"}
                          className={course.status === "Active" ? "bg-green-500" : "bg-gray-500"}
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/dashboard/courses/${course.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, and pages around current page
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }

                    // Show ellipsis for gaps
                    if (page === 2 && currentPage > 3) {
                      return (
                        <PaginationItem key="ellipsis-start">
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }

                    if (page === totalPages - 1 && currentPage < totalPages - 2) {
                      return (
                        <PaginationItem key="ellipsis-end">
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }

                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

