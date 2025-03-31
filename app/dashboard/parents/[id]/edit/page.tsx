"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
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
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "94321",
    country: "us",
  },
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

export default function EditParentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [parent, setParent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    notes: "",
    status: true,
  })

  // Simulate API fetch
  useEffect(() => {
    const fetchParent = async () => {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/parents/${params.id}`);
      // const data = await response.json();

      // Simulate API delay
      setTimeout(() => {
        setParent(mockParentData)
        setEmergencyContacts([...mockParentData.emergencyContacts])
        setFormData({
          name: mockParentData.name,
          email: mockParentData.email,
          phone: mockParentData.phone,
          occupation: mockParentData.occupation,
          street: mockParentData.address.street,
          city: mockParentData.address.city,
          state: mockParentData.address.state,
          zip: mockParentData.address.zip,
          country: mockParentData.address.country,
          notes: mockParentData.notes,
          status: mockParentData.status === "active",
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchParent()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Parent updated",
        description: "The parent record has been successfully updated.",
      })
      setIsSubmitting(false)
      router.push(`/dashboard/parents/${params.id}`)
    }, 1500)
  }

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", relationship: "", phone: "", email: "" }])
  }

  const removeEmergencyContact = (index: number) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts.splice(index, 1)
    setEmergencyContacts(updatedContacts)
  }

  const updateEmergencyContact = (index: number, field: string, value: string) => {
    const updatedContacts = [...emergencyContacts]
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value,
    }
    setEmergencyContacts(updatedContacts)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-[150px]" />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
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
            <CardDescription>
              The parent record you are trying to edit does not exist or has been deleted.
            </CardDescription>
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
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/parents/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Parent</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update the parent's personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.smith@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Update the parent's address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" value={formData.street} onChange={handleChange} placeholder="123 Main St" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={handleChange} placeholder="Anytown" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" value={formData.state} onChange={handleChange} placeholder="CA" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" value={formData.zip} onChange={handleChange} placeholder="94321" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Update emergency contacts for this parent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Contact {index + 1}</h3>
                    {emergencyContacts.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeEmergencyContact(index)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`contact-name-${index}`}>Name</Label>
                      <Input
                        id={`contact-name-${index}`}
                        value={contact.name}
                        onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                        placeholder="Sarah Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`contact-relationship-${index}`}>Relationship</Label>
                      <Input
                        id={`contact-relationship-${index}`}
                        value={contact.relationship}
                        onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}
                        placeholder="Spouse"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`contact-phone-${index}`}>Phone Number</Label>
                      <Input
                        id={`contact-phone-${index}`}
                        value={contact.phone}
                        onChange={(e) => updateEmergencyContact(index, "phone", e.target.value)}
                        placeholder="+1 (555) 987-6543"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`contact-email-${index}`}>Email Address</Label>
                      <Input
                        id={`contact-email-${index}`}
                        type="email"
                        value={contact.email}
                        onChange={(e) => updateEmergencyContact(index, "email", e.target.value)}
                        placeholder="sarah.smith@example.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addEmergencyContact} className="mt-2">
                <Plus className="h-4 w-4 mr-1" />
                Add Another Contact
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Update any additional notes or information about this parent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter any additional information here..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => handleSwitchChange("status", checked)}
                />
                <Label htmlFor="status">Active Status</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/parents/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

