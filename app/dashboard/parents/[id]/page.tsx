"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, AtSign, Calendar, Edit, MapPin, Phone, Trash2, Briefcase, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for a single parent
const mockParentData = {
  id: "1",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  status: "active",
  children: [
    {
      id: "101",
      name: "Emma Smith",
      grade: "10th",
      age: 16,
      photo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "102",
      name: "Noah Smith",
      grade: "8th",
      age: 14,
      photo: "/placeholder.svg?height=40&width=40",
    },
  ],
  address: "123 Main St, Anytown, CA 94321",
  occupation: "Software Engineer",
  joinDate: "2022-08-15",
  emergencyContacts: [
    {
      name: "Sarah Smith",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
      email: "sarah.smith@example.com",
    },
  ],
  notes: "Prefers to be contacted via email. Available for school events on weekends.",
  photo: "/placeholder.svg?height=100&width=100",
}

export default function ParentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [parent, setParent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Simulate API fetch
  useEffect(() => {
    const fetchParent = async () => {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/parents/${params.id}`);
      // const data = await response.json();

      // Simulate API delay
      setTimeout(() => {
        setParent(mockParentData)
        setIsLoading(false)
      }, 1000)
    }

    fetchParent()
  }, [params.id])

  const handleDelete = () => {
    // In a real app, this would be an API call
    // await fetch(`/api/parents/${params.id}`, { method: 'DELETE' });

    toast({
      title: "Parent deleted",
      description: "The parent record has been successfully deleted.",
    })

    setDeleteDialogOpen(false)
    router.push("/dashboard/parents")
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-6 w-[150px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-[180px]" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-[300px] mb-6" />
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-5 w-[120px]" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!parent) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Parent Not Found</CardTitle>
            <CardDescription>The parent record you are looking for does not exist or has been deleted.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href="/dashboard/parents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Parents
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/parents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Parent Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/parents/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Parent Profile Card */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View parent's personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={parent.photo} alt={parent.name} />
                <AvatarFallback>{getInitials(parent.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{parent.name}</h2>
                <Badge
                  variant={parent.status === "active" ? "default" : "secondary"}
                  className={parent.status === "active" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  {parent.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-start gap-2">
                  <AtSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{parent.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{parent.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Occupation</p>
                    <p className="text-sm text-muted-foreground">{parent.occupation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{parent.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">{new Date(parent.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="children" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="children">Children</TabsTrigger>
                  <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="children" className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Associated Children</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {parent.children.map((child: any) => (
                      <Card key={child.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={child.photo} alt={child.name} />
                              <AvatarFallback>{getInitials(child.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{child.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Grade: {child.grade}</span>
                                <span>•</span>
                                <span>Age: {child.age}</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/students/${child.id}`}>View Profile</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Emergency Contacts</h3>
                  {parent.emergencyContacts.length > 0 ? (
                    <div className="space-y-4">
                      {parent.emergencyContacts.map((contact: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{contact.name}</h4>
                                <Badge variant="outline">{contact.relationship}</Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{contact.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <AtSign className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{contact.email}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                        <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                        <h4 className="font-medium">No Emergency Contacts</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          No emergency contacts have been added for this parent.
                        </p>
                        <Button className="mt-4" variant="outline" asChild>
                          <Link href={`/dashboard/parents/${params.id}/edit`}>Add Emergency Contact</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="notes" className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Notes</h3>
                  <Card>
                    <CardContent className="p-4">
                      {parent.notes ? (
                        <p className="text-sm">{parent.notes}</p>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <p className="text-sm text-muted-foreground">No notes available.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

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
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

