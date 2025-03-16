"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PaymentRemindersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false)
  const [reminderSent, setReminderSent] = useState(false)
  const [overdueFilter, setOverdueFilter] = useState("all")

  // Sample overdue invoices data
  const [overdueInvoices, setOverdueInvoices] = useState<OverdueInvoice[]>([
    {
      id: "INV-2025-003",
      studentId: "ST-003",
      studentName: "Olivia Brown",
      grade: "Grade 12",
      parentName: "David Brown",
      parentEmail: "david.brown@example.com",
      parentPhone: "+1 (555) 234-5678",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-03-01",
      issueDate: "2025-02-15",
      daysPastDue: 15,
      lastReminderSent: "2025-03-10",
      reminderCount: 2,
    },
    {
      id: "INV-2025-009",
      studentId: "ST-004",
      studentName: "Noah Davis",
      grade: "Grade 5",
      parentName: "Sarah Davis",
      parentEmail: "sarah.davis@example.com",
      parentPhone: "+1 (555) 345-6789",
      feeCategory: "Technology Fee",
      amount: 1500,
      dueDate: "2025-03-05",
      issueDate: "2025-02-20",
      daysPastDue: 10,
      lastReminderSent: "2025-03-12",
      reminderCount: 1,
    },
    {
      id: "INV-2025-017",
      studentId: "ST-012",
      studentName: "William Thompson",
      grade: "Grade 9",
      parentName: "Jennifer Thompson",
      parentEmail: "jennifer.thompson@example.com",
      parentPhone: "+1 (555) 456-7890",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-03-01",
      issueDate: "2025-02-15",
      daysPastDue: 15,
      lastReminderSent: "2025-03-08",
      reminderCount: 2,
    },
    {
      id: "INV-2025-018",
      studentId: "ST-013",
      studentName: "Isabella Clark",
      grade: "Grade 11",
      parentName: "Robert Clark",
      parentEmail: "robert.clark@example.com",
      parentPhone: "+1 (555) 567-8901",
      feeCategory: "Laboratory Fee",
      amount: 1200,
      dueDate: "2025-03-05",
      issueDate: "2025-02-20",
      daysPastDue: 10,
      lastReminderSent: "2025-03-10",
      reminderCount: 1,
    },
    {
      id: "INV-2025-019",
      studentId: "ST-014",
      studentName: "Mason Lewis",
      grade: "Grade 6",
      parentName: "Patricia Lewis",
      parentEmail: "patricia.lewis@example.com",
      parentPhone: "+1 (555) 678-9012",
      feeCategory: "Sports Fee",
      amount: 1000,
      dueDate: "2025-03-01",
      issueDate: "2025-02-15",
      daysPastDue: 15,
      lastReminderSent: "2025-03-05",
      reminderCount: 3,
    },
    {
      id: "INV-2025-020",
      studentId: "ST-015",
      studentName: "Abigail Walker",
      grade: "Grade 4",
      parentName: "Thomas Walker",
      parentEmail: "thomas.walker@example.com",
      parentPhone: "+1 (555) 789-0123",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-03-05",
      issueDate: "2025-02-20",
      daysPastDue: 10,
      lastReminderSent: "2025-03-12",
      reminderCount: 1,
    },
    {
      id: "INV-2025-021",
      studentId: "ST-016",
      studentName: "Ethan Hall",
      grade: "Grade 8",
      parentName: "Elizabeth Hall",
      parentEmail: "elizabeth.hall@example.com",
      parentPhone: "+1 (555) 890-1234",
      feeCategory: "Library Fee",
      amount: 2000,
      dueDate: "2025-03-01",
      issueDate: "2025-02-15",
      daysPastDue: 15,
      lastReminderSent: "2025-03-08",
      reminderCount: 2,
    },
  ])

  // Filter overdue invoices based on search query and overdue filter
  const filteredOverdueInvoices = overdueInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.feeCategory.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesOverdueFilter =
      overdueFilter === "all" ||
      (overdueFilter === "critical" && invoice.daysPastDue > 14) ||
      (overdueFilter === "moderate" && invoice.daysPastDue > 7 && invoice.daysPastDue <= 14) ||
      (overdueFilter === "recent" && invoice.daysPastDue <= 7)

    return matchesSearch && matchesOverdueFilter
  })

  // Handle select all
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredOverdueInvoices.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredOverdueInvoices.map((invoice) => invoice.id))
    }
  }

  // Handle select individual
  const handleSelectInvoice = (invoiceId: string) => {
    if (selectedStudents.includes(invoiceId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== invoiceId))
    } else {
      setSelectedStudents([...selectedStudents, invoiceId])
    }
  }

  // Handle send reminder
  const handleSendReminder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Update reminder count and last reminder sent date for selected invoices
    setOverdueInvoices(
      overdueInvoices.map((invoice) => {
        if (selectedStudents.includes(invoice.id)) {
          return {
            ...invoice,
            lastReminderSent: new Date().toISOString().split("T")[0],
            reminderCount: invoice.reminderCount + 1,
          }
        }
        return invoice
      }),
    )

    setReminderSent(true)
    setTimeout(() => {
      setReminderSent(false)
      setIsReminderDialogOpen(false)
      setSelectedStudents([])
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Reminders</h1>
          <p className="text-muted-foreground">Send reminders for overdue payments.</p>
        </div>
        <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={selectedStudents.length === 0}>
              <Send className="mr-2 h-4 w-4" />
              Send Reminders ({selectedStudents.length})
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Payment Reminders</DialogTitle>
              <DialogDescription>
                Send payment reminders to {selectedStudents.length} selected students/parents.
              </DialogDescription>
            </DialogHeader>
            {reminderSent ? (
              <div className="flex flex-col items-center justify-center py-6">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <p className="mt-4 text-center text-lg font-medium">Reminders sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSendReminder}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reminderMethod">Reminder Method</Label>
                    <Select name="reminderMethod" defaultValue="email">
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="both">Both Email & SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reminderTemplate">Reminder Template</Label>
                    <Select name="reminderTemplate" defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Reminder</SelectItem>
                        <SelectItem value="gentle">Gentle Reminder</SelectItem>
                        <SelectItem value="urgent">Urgent Reminder</SelectItem>
                        <SelectItem value="final">Final Notice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="additionalMessage">Additional Message (Optional)</Label>
                    <Textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      placeholder="Add a personalized message to the reminder..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Send Reminders</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>Overdue Payments</CardTitle>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search overdue payments..."
                className="w-full pl-8 sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={overdueFilter} onValueChange={setOverdueFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Overdue Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Overdue</SelectItem>
                <SelectItem value="critical">Critical (>14 days)</SelectItem>
                <SelectItem value="moderate">Moderate (8-14 days)</SelectItem>
                <SelectItem value="recent">Recent (≤7 days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      filteredOverdueInvoices.length > 0 && selectedStudents.length === filteredOverdueInvoices.length
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Parent/Guardian</TableHead>
                <TableHead>Fee Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOverdueInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(invoice.id)}
                      onCheckedChange={() => handleSelectInvoice(invoice.id)}
                      aria-label={`Select ${invoice.studentName}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>
                    {invoice.studentName}
                    <div className="text-xs text-muted-foreground">{invoice.grade}</div>
                  </TableCell>
                  <TableCell>
                    {invoice.parentName}
                    <div className="text-xs text-muted-foreground">{invoice.parentEmail}</div>
                  </TableCell>
                  <TableCell>{invoice.feeCategory}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.daysPastDue > 14
                          ? "bg-red-100 text-red-800"
                          : invoice.daysPastDue > 7
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {invoice.daysPastDue} days
                    </span>
                  </TableCell>
                  <TableCell>
                    {invoice.lastReminderSent}
                    <div className="text-xs text-muted-foreground">Count: {invoice.reminderCount}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/fees/invoices/${invoice.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOverdueInvoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No overdue payments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredOverdueInvoices.length} of {overdueInvoices.length} overdue payments
          </div>
          {selectedStudents.length > 0 && (
            <Button variant="outline" onClick={() => setIsReminderDialogOpen(true)}>
              <Send className="mr-2 h-4 w-4" />
              Send Reminders ({selectedStudents.length})
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

// Types
interface OverdueInvoice {
  id: string
  studentId: string
  studentName: string
  grade: string
  parentName: string
  parentEmail: string
  parentPhone: string
  feeCategory: string
  amount: number
  dueDate: string
  issueDate: string
  daysPastDue: number
  lastReminderSent: string
  reminderCount: number
}

