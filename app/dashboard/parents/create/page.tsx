"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function CreateParentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Parent created",
        description: "The parent record has been successfully created.",
      })
      setIsSubmitting(false)
      router.push("/dashboard/parents")
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/parents">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Parent</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter the parent's personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.smith@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Software Engineer" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
              <CardDescription>Enter the parent's address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" placeholder="123 Main St" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="CA" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" placeholder="94321" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="us">
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
              <CardDescription>Add emergency contacts for this parent</CardDescription>
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
              <CardDescription>Add any additional notes or information about this parent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional information here..." className="min-h-[100px]" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Active Status</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associated Students</CardTitle>
              <CardDescription>Link this parent to existing students or create new ones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  After creating this parent, you can associate them with students from the student management page.
                </p>
                <div className="flex items-center space-x-2">
                  <Switch id="create-student" />
                  <Label htmlFor="create-student">Create a new student after saving</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/parents">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Parent"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

