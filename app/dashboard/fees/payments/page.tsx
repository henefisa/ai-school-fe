"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Eye, Search } from "lucide-react"
import Link from "next/link"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function PaymentsHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  // Sample payments data
  const payments = [
    {
      id: "PMT-2025-001",
      invoiceId: "INV-2025-001",
      studentId: "ST-001",
      studentName: "Emma Johnson",
      amount: 1500,
      paymentDate: "2025-03-20",
      paymentMethod: "Credit Card",
      transactionId: "TXN123456789",
      status: "Completed",
    },
    {
      id: "PMT-2025-002",
      invoiceId: "INV-2025-004",
      studentId: "ST-004",
      studentName: "Noah Davis",
      amount: 1500,
      paymentDate: "2025-03-18",
      paymentMethod: "Bank Transfer",
      transactionId: "BT987654321",
      status: "Completed",
    },
    {
      id: "PMT-2025-003",
      invoiceId: "INV-2025-007",
      studentId: "ST-002",
      studentName: "Liam Smith",
      amount: 1200,
      paymentDate: "2025-03-22",
      paymentMethod: "Credit Card",
      transactionId: "TXN234567890",
      status: "Completed",
    },
    {
      id: "PMT-2025-004",
      invoiceId: "INV-2025-010",
      studentId: "ST-005",
      studentName: "Sophia Wilson",
      amount: 2500,
      paymentDate: "2025-03-17",
      paymentMethod: "Bank Transfer",
      transactionId: "BT876543210",
      status: "Completed",
    },
    {
      id: "PMT-2025-005",
      invoiceId: "INV-2025-011",
      studentId: "ST-006",
      studentName: "James Miller",
      amount: 1500,
      paymentDate: "2025-03-15",
      paymentMethod: "Cash",
      transactionId: "CASH001",
      status: "Completed",
    },
    {
      id: "PMT-2025-006",
      invoiceId: "INV-2025-012",
      studentId: "ST-007",
      studentName: "Charlotte Taylor",
      amount: 1500,
      paymentDate: "2025-03-14",
      paymentMethod: "Check",
      transactionId: "CHK12345",
      status: "Completed",
    },
    {
      id: "PMT-2025-007",
      invoiceId: "INV-2025-013",
      studentId: "ST-008",
      studentName: "Benjamin Anderson",
      amount: 3000,
      paymentDate: "2025-03-12",
      paymentMethod: "Credit Card",
      transactionId: "TXN345678901",
      status: "Completed",
    },
    {
      id: "PMT-2025-008",
      invoiceId: "INV-2025-014",
      studentId: "ST-009",
      studentName: "Amelia Martinez",
      amount: 1500,
      paymentDate: "2025-03-10",
      paymentMethod: "Mobile Payment",
      transactionId: "MP123456",
      status: "Completed",
    },
    {
      id: "PMT-2025-009",
      invoiceId: "INV-2025-015",
      studentId: "ST-010",
      studentName: "Henry Garcia",
      amount: 1200,
      paymentDate: "2025-03-08",
      paymentMethod: "Bank Transfer",
      transactionId: "BT765432109",
      status: "Completed",
    },
    {
      id: "PMT-2025-010",
      invoiceId: "INV-2025-016",
      studentId: "ST-011",
      studentName: "Evelyn Rodriguez",
      amount: 2000,
      paymentDate: "2025-03-05",
      paymentMethod: "Credit Card",
      transactionId: "TXN456789012",
      status: "Completed",
    },
  ]

  // Filter payments based on search query, payment method, and date range
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPaymentMethod =
      paymentMethodFilter === "all" || payment.paymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase()

    const paymentDate = new Date(payment.paymentDate)
    const matchesDateRange =
      !dateRange?.from || !dateRange?.to || (paymentDate >= dateRange.from && paymentDate <= dateRange.to)

    return matchesSearch && matchesPaymentMethod && matchesDateRange
  })

  // Calculate total amount
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
          <p className="text-muted-foreground">View and manage all payment transactions.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayments.length}</div>
            <p className="text-xs text-muted-foreground">For the selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">For the selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredPayments.length > 0 ? (totalAmount / filteredPayments.length).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">For the selected period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>Payment Transactions</CardTitle>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-full pl-8 sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit card">Credit Card</SelectItem>
                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="mobile payment">Mobile Payment</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange className="w-full sm:w-[300px]" date={dateRange} setDate={setDateRange} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.invoiceId}</TableCell>
                  <TableCell>{payment.studentName}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/fees/invoices/${payment.invoiceId}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Invoice</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No payment records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

