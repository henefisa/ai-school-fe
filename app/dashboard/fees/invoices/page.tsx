"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search, Download, Eye, Send, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false)

  // Sample invoices data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-2025-001",
      studentId: "ST-001",
      studentName: "Emma Johnson",
      grade: "Grade 10",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Paid",
      paymentDate: "2025-03-20",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-2025-002",
      studentId: "ST-002",
      studentName: "Liam Smith",
      grade: "Grade 8",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-003",
      studentId: "ST-003",
      studentName: "Olivia Brown",
      grade: "Grade 12",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Overdue",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-004",
      studentId: "ST-004",
      studentName: "Noah Davis",
      grade: "Grade 5",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Paid",
      paymentDate: "2025-03-18",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-2025-005",
      studentId: "ST-005",
      studentName: "Sophia Wilson",
      grade: "Grade 7",
      feeCategory: "Tuition Fee",
      amount: 1500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-006",
      studentId: "ST-001",
      studentName: "Emma Johnson",
      grade: "Grade 10",
      feeCategory: "Library Fee",
      amount: 2000,
      dueDate: "2025-05-15",
      issueDate: "2025-03-15",
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-007",
      studentId: "ST-002",
      studentName: "Liam Smith",
      grade: "Grade 8",
      feeCategory: "Laboratory Fee",
      amount: 1200,
      dueDate: "2025-05-15",
      issueDate: "2025-03-15",
      status: "Paid",
      paymentDate: "2025-03-22",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-2025-008",
      studentId: "ST-003",
      studentName: "Olivia Brown",
      grade: "Grade 12",
      feeCategory: "Sports Fee",
      amount: 1000,
      dueDate: "2025-05-15",
      issueDate: "2025-03-15",
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-009",
      studentId: "ST-004",
      studentName: "Noah Davis",
      grade: "Grade 5",
      feeCategory: "Technology Fee",
      amount: 1500,
      dueDate: "2025-05-15",
      issueDate: "2025-03-15",
      status: "Overdue",
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: "INV-2025-010",
      studentId: "ST-005",
      studentName: "Sophia Wilson",
      grade: "Grade 7",
      feeCategory: "Transportation Fee",
      amount: 2500,
      dueDate: "2025-04-15",
      issueDate: "2025-03-15",
      status: "Paid",
      paymentDate: "2025-03-17",
      paymentMethod: "Bank Transfer",
    },
  ])

  // Filter invoices based on search query and status filter
  const filteredInvoices = invoices.filter(
    (invoice) =>
      (invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.feeCategory.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  // Handle generate invoice
  const handleGenerateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const studentId = formData.get("studentId") as string
    const studentName = formData.get("studentName") as string
    const grade = formData.get("grade") as string
    const feeCategory = formData.get("feeCategory") as string
    const amount = Number(formData.get("amount"))
    const dueDate = formData.get("dueDate") as string

    const newInvoice: Invoice = {
      id: `INV-2025-${invoices.length + 1}`.padStart(11, "0"),
      studentId,
      studentName,
      grade,
      feeCategory,
      amount,
      dueDate,
      issueDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      paymentDate: null,
      paymentMethod: null,
    }

    setInvoices([...invoices, newInvoice])
    setIsGenerateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage student fee invoices and payment status.</p>
        </div>
        <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Generate Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Invoice</DialogTitle>
              <DialogDescription>Create a new invoice for a student.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleGenerateInvoice}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" name="studentId" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input id="studentName" name="studentName" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Select name="grade" defaultValue="Grade 10">
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade 1">Grade 1</SelectItem>
                      <SelectItem value="Grade 2">Grade 2</SelectItem>
                      <SelectItem value="Grade 3">Grade 3</SelectItem>
                      <SelectItem value="Grade 4">Grade 4</SelectItem>
                      <SelectItem value="Grade 5">Grade 5</SelectItem>
                      <SelectItem value="Grade 6">Grade 6</SelectItem>
                      <SelectItem value="Grade 7">Grade 7</SelectItem>
                      <SelectItem value="Grade 8">Grade 8</SelectItem>
                      <SelectItem value="Grade 9">Grade 9</SelectItem>
                      <SelectItem value="Grade 10">Grade 10</SelectItem>
                      <SelectItem value="Grade 11">Grade 11</SelectItem>
                      <SelectItem value="Grade 12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="feeCategory">Fee Category</Label>
                  <Select name="feeCategory" defaultValue="Tuition Fee">
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                      <SelectItem value="Registration Fee">Registration Fee</SelectItem>
                      <SelectItem value="Library Fee">Library Fee</SelectItem>
                      <SelectItem value="Laboratory Fee">Laboratory Fee</SelectItem>
                      <SelectItem value="Sports Fee">Sports Fee</SelectItem>
                      <SelectItem value="Technology Fee">Technology Fee</SelectItem>
                      <SelectItem value="Transportation Fee">Transportation Fee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input id="amount" name="amount" type="number" min="0" step="0.01" defaultValue="1500" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Generate Invoice</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
              All Invoices
            </TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setStatusFilter("pending")}>
              Pending
            </TabsTrigger>
            <TabsTrigger value="paid" onClick={() => setStatusFilter("paid")}>
              Paid
            </TabsTrigger>
            <TabsTrigger value="overdue" onClick={() => setStatusFilter("overdue")}>
              Overdue
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 flex items-center gap-2 sm:mt-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="w-full rounded-md pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Invoices</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.studentName}</TableCell>
                      <TableCell>{invoice.feeCategory}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : invoice.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/fees/invoices/${invoice.id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          {invoice.status !== "Paid" && (
                            <Button variant="outline" size="icon">
                              <Send className="h-4 w-4" />
                              <span className="sr-only">Send Reminder</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredInvoices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No invoices found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Invoices</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.studentName}</TableCell>
                      <TableCell>{invoice.feeCategory}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/fees/invoices/${invoice.id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send Reminder</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Paid Invoices</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.studentName}</TableCell>
                      <TableCell>{invoice.feeCategory}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.paymentDate}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/fees/invoices/${invoice.id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Overdue Invoices</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.studentName}</TableCell>
                      <TableCell>{invoice.feeCategory}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/fees/invoices/${invoice.id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send Reminder</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Types
interface Invoice {
  id: string
  studentId: string
  studentName: string
  grade: string
  feeCategory: string
  amount: number
  dueDate: string
  issueDate: string
  status: "Paid" | "Pending" | "Overdue"
  paymentDate: string | null
  paymentMethod: string | null
}

