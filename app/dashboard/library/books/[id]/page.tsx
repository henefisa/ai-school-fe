"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ArrowLeftIcon, CheckIcon } from "lucide-react"
import Link from "next/link"

// Mock book data
const books = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/placeholder.svg?height=400&width=300",
    category: "Fiction",
    status: "available",
    description:
      "A classic novel about racial injustice in the American South. The story is told through the eyes of Scout Finch, a young girl whose father, Atticus, defends a black man accused of raping a white woman. The novel explores themes of racial injustice, moral growth, and the loss of innocence.",
    isbn: "978-0061120084",
    publicationDate: "1960-07-11",
    publisher: "J. B. Lippincott & Co.",
    pages: 281,
    language: "English",
    copies: 3,
    availableCopies: 2,
    location: "Fiction Section, Shelf 3",
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "A timeless classic that everyone should read.",
        date: "2023-01-15",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        comment: "Beautifully written with powerful themes.",
        date: "2023-02-20",
      },
    ],
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    cover: "/placeholder.svg?height=400&width=300",
    category: "Science Fiction",
    status: "checked-out",
    description:
      "A dystopian novel about totalitarianism and surveillance. The story follows Winston Smith, a government employee whose job is to rewrite history to match the state's propaganda. The novel explores themes of government surveillance, totalitarianism, and the manipulation of truth.",
    isbn: "978-0451524935",
    publicationDate: "1949-06-08",
    publisher: "Secker & Warburg",
    pages: 328,
    language: "English",
    copies: 5,
    availableCopies: 0,
    location: "Science Fiction Section, Shelf 2",
    reviews: [
      {
        id: 1,
        user: "Alice Johnson",
        rating: 5,
        comment: "A prophetic and chilling vision of the future.",
        date: "2023-03-10",
      },
    ],
  },
]

export default function BookDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false)
  const [isReserveDialogOpen, setIsReserveDialogOpen] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [reserveSuccess, setReserveSuccess] = useState(false)

  // Find the book with the matching ID
  const book = books.find((b) => b.id === params.id)

  if (!book) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Book not found</h2>
          <p className="text-muted-foreground">The book you're looking for doesn't exist.</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/library">Back to Library</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutSuccess(true)
      // Close dialog after showing success message
      setTimeout(() => {
        setIsCheckoutDialogOpen(false)
        // Reset success state after dialog closes
        setTimeout(() => {
          setCheckoutSuccess(false)
        }, 300)
      }, 2000)
    }, 1000)
  }

  const handleReserve = () => {
    // Simulate reserve process
    setTimeout(() => {
      setReserveSuccess(true)
      // Close dialog after showing success message
      setTimeout(() => {
        setIsReserveDialogOpen(false)
        // Reset success state after dialog closes
        setTimeout(() => {
          setReserveSuccess(false)
        }, 300)
      }, 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/library">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Book Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Book Cover and Actions */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img src={book.cover || "/placeholder.svg"} alt={book.title} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-2">
            {book.status === "available" && (
              <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Check Out</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Check Out Book</DialogTitle>
                    <DialogDescription>
                      You are about to check out "{book.title}" by {book.author}.
                    </DialogDescription>
                  </DialogHeader>
                  {checkoutSuccess ? (
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-center font-medium">Book checked out successfully!</p>
                      <p className="text-center text-sm text-muted-foreground">
                        Due date: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Due Date:</span>
                          <span>{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Loan Period:</span>
                          <span>14 days</span>
                        </div>
                        <div className="rounded-md bg-muted p-3 text-sm">
                          <p>
                            By checking out this book, you agree to return it by the due date. Late returns may incur
                            fines.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCheckoutDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCheckout}>Confirm Checkout</Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            )}
            {book.status === "checked-out" && (
              <Dialog open={isReserveDialogOpen} onOpenChange={setIsReserveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Reserve
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reserve Book</DialogTitle>
                    <DialogDescription>
                      You are about to reserve "{book.title}" by {book.author}.
                    </DialogDescription>
                  </DialogHeader>
                  {reserveSuccess ? (
                    <div className="flex flex-col items-center justify-center space-y-2 py-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-center font-medium">Book reserved successfully!</p>
                      <p className="text-center text-sm text-muted-foreground">
                        You will be notified when the book becomes available.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Estimated Availability:</span>
                          <span>2-3 weeks</span>
                        </div>
                        <div className="rounded-md bg-muted p-3 text-sm">
                          <p>
                            By reserving this book, you will be notified when it becomes available. You will then have
                            48 hours to check it out before the reservation expires.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReserveDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleReserve}>Confirm Reservation</Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            )}
            {(user?.role === "admin" || user?.role === "librarian") && (
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/dashboard/library/books/${book.id}/edit`}>Edit Book Details</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">{book.title}</h2>
            <p className="text-xl text-muted-foreground">by {book.author}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge
                className={
                  book.status === "available"
                    ? "bg-green-500"
                    : book.status === "checked-out"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }
              >
                {book.status === "available" ? "Available" : book.status === "checked-out" ? "Checked Out" : "Reserved"}
              </Badge>
              <Badge variant="outline">{book.category}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="mt-2 text-muted-foreground">{book.description}</p>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Book Details</h3>
                <dl className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">ISBN:</dt>
                    <dd>{book.isbn}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Publication Date:</dt>
                    <dd>{new Date(book.publicationDate).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Publisher:</dt>
                    <dd>{book.publisher}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Pages:</dt>
                    <dd>{book.pages}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Language:</dt>
                    <dd>{book.language}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Availability</h3>
                <dl className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Copies:</dt>
                    <dd>{book.copies}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Available Copies:</dt>
                    <dd>{book.availableCopies}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Location:</dt>
                    <dd>{book.location}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold">Reviews</h3>
              {book.reviews.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {book.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{review.user}</CardTitle>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-muted-foreground">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

