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
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { PlusIcon, SearchIcon, Edit2Icon, Trash2Icon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for books
const mockBooks = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    category: "Fiction",
    copies: 5,
    available: 3,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    category: "Fiction",
    copies: 4,
    available: 2,
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    category: "Fiction",
    copies: 3,
    available: 1,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    category: "Fiction",
    copies: 6,
    available: 4,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    category: "Fiction",
    copies: 4,
    available: 0,
  },
]

// Mock data for borrowers
const mockBorrowers = [
  {
    id: "1",
    name: "John Smith",
    book: "To Kill a Mockingbird",
    borrowDate: new Date(2023, 7, 15),
    dueDate: new Date(2023, 8, 15),
    status: "On time",
  },
  {
    id: "2",
    name: "Jane Doe",
    book: "1984",
    borrowDate: new Date(2023, 7, 10),
    dueDate: new Date(2023, 8, 10),
    status: "On time",
  },
  {
    id: "3",
    name: "Bob Johnson",
    book: "The Great Gatsby",
    borrowDate: new Date(2023, 6, 20),
    dueDate: new Date(2023, 7, 20),
    status: "Overdue",
  },
  {
    id: "4",
    name: "Alice Brown",
    book: "The Catcher in the Rye",
    borrowDate: new Date(2023, 7, 5),
    dueDate: new Date(2023, 8, 5),
    status: "On time",
  },
]

export default function LibraryManagement() {
  const [activeTab, setActiveTab] = useState("books")
  const [books, setBooks] = useState(mockBooks)
  const [borrowers, setBorrowers] = useState(mockBorrowers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isEditBookOpen, setIsEditBookOpen] = useState(false)
  const [isDeleteBookOpen, setIsDeleteBookOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<(typeof mockBooks)[0] | null>(null)

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    copies: 1,
    available: 1,
  })

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBorrowers = borrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddBook = () => {
    const id = (books.length + 1).toString()
    setBooks([...books, { id, ...newBook }])
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      category: "",
      copies: 1,
      available: 1,
    })
    setIsAddBookOpen(false)
    toast({
      title: "Book added",
      description: `${newBook.title} has been added to the library.`,
    })
  }

  const handleEditBook = () => {
    if (!selectedBook) return

    setBooks(books.map((book) => (book.id === selectedBook.id ? { ...selectedBook } : book)))
    setIsEditBookOpen(false)
    toast({
      title: "Book updated",
      description: `${selectedBook.title} has been updated.`,
    })
  }

  const handleDeleteBook = () => {
    if (!selectedBook) return

    setBooks(books.filter((book) => book.id !== selectedBook.id))
    setIsDeleteBookOpen(false)
    toast({
      title: "Book deleted",
      description: `${selectedBook.title} has been removed from the library.`,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="borrowers">Borrowers</TabsTrigger>
        </TabsList>

        <div className="mt-6 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={activeTab === "books" ? "Search books..." : "Search borrowers..."}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {activeTab === "books" && (
            <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>Add a new book to the library.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="copies">Number of Copies</Label>
                    <Input
                      id="copies"
                      type="number"
                      value={newBook.copies.toString()}
                      onChange={(e) =>
                        setNewBook({
                          ...newBook,
                          copies: Number.parseInt(e.target.value),
                          available: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBookOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBook}>Add Book</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="books" className="mt-4">
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
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
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            book.available > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {book.available}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedBook(book)
                              setIsEditBookOpen(true)
                            }}
                          >
                            <Edit2Icon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedBook(book)
                              setIsDeleteBookOpen(true)
                            }}
                          >
                            <Trash2Icon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="borrowers" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBorrowers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No borrowers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBorrowers.map((borrower) => (
                    <TableRow key={borrower.id}>
                      <TableCell className="font-medium">{borrower.name}</TableCell>
                      <TableCell>{borrower.book}</TableCell>
                      <TableCell>{borrower.borrowDate.toLocaleDateString()}</TableCell>
                      <TableCell>{borrower.dueDate.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            borrower.status === "On time" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {borrower.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Make changes to the book information.</DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedBook.title}
                  onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  value={selectedBook.author}
                  onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-isbn">ISBN</Label>
                <Input
                  id="edit-isbn"
                  value={selectedBook.isbn}
                  onChange={(e) => setSelectedBook({ ...selectedBook, isbn: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={selectedBook.category}
                  onChange={(e) => setSelectedBook({ ...selectedBook, category: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-copies">Number of Copies</Label>
                <Input
                  id="edit-copies"
                  type="number"
                  value={selectedBook.copies.toString()}
                  onChange={(e) => setSelectedBook({ ...selectedBook, copies: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-available">Available Copies</Label>
                <Input
                  id="edit-available"
                  type="number"
                  value={selectedBook.available.toString()}
                  onChange={(e) => setSelectedBook({ ...selectedBook, available: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditBookOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBook}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteBookOpen} onOpenChange={setIsDeleteBookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="py-4">
              <p>
                You are about to delete <strong>{selectedBook.title}</strong> by {selectedBook.author}.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteBookOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

