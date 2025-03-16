"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BookIcon, PlusIcon, SearchIcon, ArrowLeftIcon, BookOpenIcon, UsersIcon, AlertCircleIcon } from "lucide-react"
import Link from "next/link"

// Mock data for books
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    category: "Fiction",
    status: "available",
    copies: 3,
    availableCopies: 2,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Science Fiction",
    status: "checked-out",
    copies: 5,
    availableCopies: 0,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Fiction",
    status: "available",
    copies: 2,
    availableCopies: 1,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    category: "Romance",
    status: "available",
    copies: 4,
    availableCopies: 4,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    category: "Fantasy",
    status: "available",
    copies: 3,
    availableCopies: 2,
  },
]

// Mock data for borrowers
const borrowers = [
  {
    id: 1,
    name: "John Doe",
    role: "Student",
    bookTitle: "1984",
    checkoutDate: "2023-03-01",
    dueDate: "2023-03-15",
    status: "overdue",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Student",
    bookTitle: "Harry Potter and the Philosopher's Stone",
    checkoutDate: "2023-03-10",
    dueDate: "2023-03-24",
    status: "due-soon",
  },
  {
    id: 3,
    name: "Robert Johnson",
    role: "Teacher",
    bookTitle: "The Great Gatsby",
    checkoutDate: "2023-03-05",
    dueDate: "2023-03-19",
    status: "active",
  },
]

// Mock data for library statistics
const statistics = {
  totalBooks: 120,
  availableBooks: 87,
  checkedOutBooks: 33,
  overdueBooks: 5,
  totalBorrowers: 45,
  popularCategories: [
    { name: "Fiction", count: 42 },
    { name: "Science Fiction", count: 28 },
    { name: "Fantasy", count: 22 },
    { name: "Non-Fiction", count: 18 },
    { name: "Biography", count: 10 },
  ],
}

export default function LibraryManagementPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("books")

  // Redirect if not admin or librarian
  if (user?.role !== "admin" && user?.role !== "librarian") {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-4 text-2xl font-bold">Access Denied</h2>
          <p className="mt-2 text-muted-foreground">You don't have permission to access this page.</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/library">Back to Library</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Filter books based on search query
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/library">
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Library Management</h1>
        </div>
        <Dialog open={isAddBookDialogOpen} onOpenChange={setIsAddBookDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>Enter the details of the new book to add to the library.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Book title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Author name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input id="isbn" placeholder="ISBN number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="science-fiction">Science Fiction</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="biography">Biography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input id="publisher" placeholder="Publisher name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publication-date">Publication Date</Label>
                  <Input id="publication-date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  <Input id="pages" type="number" placeholder="Number of pages" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copies">Number of Copies</Label>
                  <Input id="copies" type="number" placeholder="Number of copies" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Book description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddBookDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddBookDialogOpen(false)}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dashboard Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.availableBooks} available, {statistics.checkedOutBooks} checked out
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.overdueBooks}</div>
            <p className="text-xs text-muted-foreground">
              {((statistics.overdueBooks / statistics.checkedOutBooks) * 100).toFixed(1)}% of checked out books
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Borrowers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalBorrowers}</div>
            <p className="text-xs text-muted-foreground">Students and teachers with active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.popularCategories[0].name}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.popularCategories[0].count} books in this category
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Books, Borrowers, and Reports */}
      <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="books" className="flex items-center gap-2">
            <BookIcon className="h-4 w-4" />
            Books
          </TabsTrigger>
          <TabsTrigger value="borrowers" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Borrowers
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Books Tab Content */}
        <TabsContent value="books" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Copies</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No books found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>{book.copies}</TableCell>
                      <TableCell>{book.availableCopies}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            book.status === "available"
                              ? "bg-green-500"
                              : book.status === "checked-out"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }
                        >
                          {book.status === "available"
                            ? "Available"
                            : book.status === "checked-out"
                              ? "Checked Out"
                              : "Reserved"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/library/books/${book.id}/edit`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Borrowers Tab Content */}
        <TabsContent value="borrowers" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by borrower name or book title..." className="pl-10" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Checkout Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {borrowers.map((borrower) => (
                  <TableRow key={borrower.id}>
                    <TableCell className="font-medium">{borrower.name}</TableCell>
                    <TableCell>{borrower.role}</TableCell>
                    <TableCell>{borrower.bookTitle}</TableCell>
                    <TableCell>{borrower.checkoutDate}</TableCell>
                    <TableCell>{borrower.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          borrower.status === "active"
                            ? "bg-green-500"
                            : borrower.status === "due-soon"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {borrower.status === "active"
                          ? "Active"
                          : borrower.status === "due-soon"
                            ? "Due Soon"
                            : "Overdue"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Reports Tab Content */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Distribution of books by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statistics.popularCategories.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <div className="w-1/3 font-medium">{category.name}</div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${(category.count / statistics.totalBooks) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm text-muted-foreground">{category.count} books</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Book Status</CardTitle>
                <CardDescription>Current status of all books in the library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/3 font-medium">Available</div>
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{
                            width: `${(statistics.availableBooks / statistics.totalBooks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-muted-foreground">
                      {statistics.availableBooks} books
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 font-medium">Checked Out</div>
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${((statistics.checkedOutBooks - statistics.overdueBooks) / statistics.totalBooks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-muted-foreground">
                      {statistics.checkedOutBooks - statistics.overdueBooks} books
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/3 font-medium">Overdue</div>
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{
                            width: `${(statistics.overdueBooks / statistics.totalBooks) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-muted-foreground">{statistics.overdueBooks} books</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Generate Full Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

