"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { PlusIcon, SearchIcon, Edit2Icon, Trash2Icon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    name: "Mathematics 101",
    code: "MATH101",
    teacher: "Jane Smith",
    students: 25,
    status: "active",
  },
  {
    id: "2",
    name: "Introduction to Physics",
    code: "PHYS101",
    teacher: "Charlie Wilson",
    students: 18,
    status: "active",
  },
  {
    id: "3",
    name: "English Literature",
    code: "ENG201",
    teacher: "Alice Johnson",
    students: 22,
    status: "inactive",
  },
  {
    id: "4",
    name: "Computer Science Basics",
    code: "CS101",
    teacher: "Bob Roberts",
    students: 30,
    status: "active",
  },
  {
    id: "5",
    name: "World History",
    code: "HIST101",
    teacher: "David Miller",
    students: 20,
    status: "active",
  },
]

export default function CourseManagement() {
  const { user } = useAuth()
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [isDeleteCourseOpen, setIsDeleteCourseOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<(typeof mockCourses)[0] | null>(null)

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    teacher: "",
    description: "",
    status: "active",
  })

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCourse = () => {
    const id = (courses.length + 1).toString()
    setCourses([...courses, { id, ...newCourse, students: 0 }])
    setNewCourse({
      name: "",
      code: "",
      teacher: "",
      description: "",
      status: "active",
    })
    setIsAddCourseOpen(false)
    toast({
      title: "Course added",
      description: `${newCourse.name} has been added to the system.`,
    })
  }

  const handleEditCourse = () => {
    if (!selectedCourse) return

    setCourses(courses.map((course) => (course.id === selectedCourse.id ? { ...selectedCourse } : course)))
    setIsEditCourseOpen(false)
    toast({
      title: "Course updated",
      description: `${selectedCourse.name} has been updated.`,
    })
  }

  const handleDeleteCourse = () => {
    if (!selectedCourse) return

    setCourses(courses.filter((course) => course.id !== selectedCourse.id))
    setIsDeleteCourseOpen(false)
    toast({
      title: "Course deleted",
      description: `${selectedCourse.name} has been removed from the system.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {user?.role === "admin" && (
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>Add a new course to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Input
                    id="teacher"
                    value={newCourse.teacher}
                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newCourse.status}
                    onValueChange={(value) => setNewCourse({ ...newCourse, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCourse}>Add Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        course.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCourse(course)
                          setIsEditCourseOpen(true)
                        }}
                      >
                        <Edit2Icon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      {user?.role === "admin" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedCourse(course)
                            setIsDeleteCourseOpen(true)
                          }}
                        >
                          <Trash2Icon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Make changes to the course information.</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Course Name</Label>
                <Input
                  id="edit-name"
                  value={selectedCourse.name}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-code">Course Code</Label>
                <Input
                  id="edit-code"
                  value={selectedCourse.code}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, code: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-teacher">Teacher</Label>
                <Input
                  id="edit-teacher"
                  value={selectedCourse.teacher}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, teacher: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={selectedCourse.status}
                  onValueChange={(value) => setSelectedCourse({ ...selectedCourse, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCourseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteCourseOpen} onOpenChange={setIsDeleteCourseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="py-4">
              <p>
                You are about to delete <strong>{selectedCourse.name}</strong> ({selectedCourse.code}).
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteCourseOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

