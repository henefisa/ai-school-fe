"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  PenSquare,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

// Mock data for parents
const mockParents = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    children: [
      { id: "101", name: "Emma Smith", grade: "10th" },
      { id: "102", name: "Noah Smith", grade: "8th" },
    ],
    address: "123 Main St, Anytown, CA 94321",
    occupation: "Software Engineer",
    joinDate: "2022-08-15",
  },
  {
    id: "2",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    children: [{ id: "103", name: "Sofia Rodriguez", grade: "9th" }],
    address: "456 Oak Ave, Somewhere, CA 94123",
    occupation: "Doctor",
    joinDate: "2021-09-01",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    children: [
      { id: "104", name: "William Johnson", grade: "11th" },
      { id: "105", name: "Olivia Johnson", grade: "7th" },
    ],
    address: "789 Pine Rd, Nowhere, CA 94567",
    occupation: "Accountant",
    joinDate: "2023-01-10",
  },
  {
    id: "4",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    children: [{ id: "106", name: "Ethan Lee", grade: "6th" }],
    address: "321 Cedar Ln, Elsewhere, CA 94789",
    occupation: "Marketing Manager",
    joinDate: "2022-11-05",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 876-5432",
    status: "active",
    children: [
      { id: "107", name: "Ava Brown", grade: "12th" },
      { id: "108", name: "James Brown", grade: "10th" },
      { id: "109", name: "Isabella Brown", grade: "8th" },
    ],
    address: "654 Maple Dr, Someplace, CA 94234",
    occupation: "Teacher",
    joinDate: "2021-07-20",
  },
  {
    id: "6",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    children: [{ id: "110", name: "Lucas Wilson", grade: "9th" }],
    address: "987 Birch St, Anyville, CA 94876",
    occupation: "Lawyer",
    joinDate: "2023-02-15",
  },
  {
    id: "7",
    name: "David Garcia",
    email: "david.garcia@example.com",
    phone: "+1 (555) 654-3210",
    status: "active",
    children: [
      { id: "111", name: "Mia Garcia", grade: "7th" },
      { id: "112", name: "Benjamin Garcia", grade: "5th" },
    ],
    address: "159 Walnut Ave, Othertown, CA 94543",
    occupation: "Architect",
    joinDate: "2022-05-10",
  },
]

export default function ParentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [parents, setParents] = useState(mockParents)
  const [filteredParents, setFilteredParents] = useState(mockParents)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [parentToDelete, setParentToDelete] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort parents
  useEffect(() => {
    let result = [...parents]

    // Filter by status
    if (activeTab === "active") {
      result = result.filter((parent) => parent.status === "active")
    } else if (activeTab === "inactive") {
      result = result.filter((parent) => parent.status === "inactive")
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (parent) =>
          parent.name.toLowerCase().includes(query) ||
          parent.email.toLowerCase().includes(query) ||
          parent.phone.toLowerCase().includes(query) ||
          parent.children.some((child) => child.name.toLowerCase().includes(query)),
      )
    }

    // Sort results
    result.sort((a, b) => {
      let aValue = a[sortField as keyof typeof a]
      let bValue = b[sortField as keyof typeof b]

      // Handle nested properties or special cases
      if (sortField === "children") {
        aValue = a.children.length
        bValue = b.children.length
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setFilteredParents(result)
  }, [parents, searchQuery, activeTab, sortField, sortDirection])

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle delete
  const handleDelete = (id: string) => {
    setParentToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (parentToDelete) {
      // In a real app, this would be an API call
      setParents(parents.filter((parent) => parent.id !== parentToDelete))

      toast({
        title: "Parent deleted",
        description: "The parent record has been successfully deleted.",
      })
    }
    setDeleteDialogOpen(false)
    setParentToDelete(null)
  }

  // Pagination
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage)
  const paginatedParents = filteredParents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get parent name by ID
  const getParentName = (id: string) => {
    const parent = parents.find((p) => p.id === id)
    return parent ? parent.name : "Unknown"
  }

  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parents</h1>
          <p className="text-muted-foreground">Manage parent records and their associated students</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/dashboard/parents/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Parent
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-auto max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search parents..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parents</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="multiple">Multiple Children</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Parents</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">
                          Name
                          {renderSortIndicator("name")}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                        <div className="flex items-center">
                          Contact Information
                          {renderSortIndicator("email")}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("children")}>
                        <div className="flex items-center">
                          Children
                          {renderSortIndicator("children")}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                        <div className="flex items-center">
                          Status
                          {renderSortIndicator("status")}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      // Loading skeletons
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={`skeleton-${index}`}>
                          <TableCell>
                            <Skeleton className="h-6 w-[180px]" />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[150px]" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              <Skeleton className="h-6 w-20" />
                              <Skeleton className="h-6 w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-16" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-9 w-9 rounded-md ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedParents.length > 0 ? (
                      paginatedParents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell className="font-medium">{parent.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{parent.email}</div>
                              <div className="text-sm text-muted-foreground">{parent.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {parent.children.map((child) => (
                                <Badge
                                  key={child.id}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-secondary"
                                  onClick={() => router.push(`/dashboard/students/${child.id}`)}
                                >
                                  {child.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={parent.status === "active" ? "default" : "secondary"}
                              className={parent.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                              {parent.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}/edit`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer flex items-center"
                                  onClick={() => handleDelete(parent.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No parents found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-9"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {/* Same table structure as "all" but with filtered data */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Contact Information</TableHead>
                      <TableHead>Children</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      // Loading skeletons
                      Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={`skeleton-active-${index}`}>
                          <TableCell>
                            <Skeleton className="h-6 w-[180px]" />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[150px]" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              <Skeleton className="h-6 w-20" />
                              <Skeleton className="h-6 w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-16" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-9 w-9 rounded-md ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedParents.length > 0 ? (
                      paginatedParents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell className="font-medium">{parent.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{parent.email}</div>
                              <div className="text-sm text-muted-foreground">{parent.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {parent.children.map((child) => (
                                <Badge
                                  key={child.id}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-secondary"
                                  onClick={() => router.push(`/dashboard/students/${child.id}`)}
                                >
                                  {child.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}/edit`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer flex items-center"
                                  onClick={() => handleDelete(parent.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No active parents found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="space-y-4">
              {/* Same table structure as "all" but with filtered data */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Contact Information</TableHead>
                      <TableHead>Children</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      // Loading skeletons
                      Array.from({ length: 2 }).map((_, index) => (
                        <TableRow key={`skeleton-inactive-${index}`}>
                          <TableCell>
                            <Skeleton className="h-6 w-[180px]" />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[150px]" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              <Skeleton className="h-6 w-20" />
                              <Skeleton className="h-6 w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-6 w-16" />
                          </TableCell>
                          <TableCell className="text-right">
                            <Skeleton className="h-9 w-9 rounded-md ml-auto" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : paginatedParents.length > 0 ? (
                      paginatedParents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell className="font-medium">{parent.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{parent.email}</div>
                              <div className="text-sm text-muted-foreground">{parent.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {parent.children.map((child) => (
                                <Badge
                                  key={child.id}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-secondary"
                                  onClick={() => router.push(`/dashboard/students/${child.id}`)}
                                >
                                  {child.name}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Inactive</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/parents/${parent.id}/edit`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer flex items-center"
                                  onClick={() => handleDelete(parent.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No inactive parents found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this parent record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

