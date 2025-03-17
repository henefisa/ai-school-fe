'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CreditCard,
  Download,
  FileText,
  Filter,
  Search,
  SlidersHorizontal,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function FeesPage() {
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [selectedFeeType, setSelectedFeeType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Sample children data
  const children = [
    { id: '1', name: 'Emma Johnson', grade: '10A' },
    { id: '2', name: 'Noah Johnson', grade: '7B' },
  ];

  // Sample fee types
  const feeTypes = [
    { id: 'tuition', name: 'Tuition Fee' },
    { id: 'transport', name: 'Transportation Fee' },
    { id: 'activity', name: 'Activity Fee' },
    { id: 'exam', name: 'Examination Fee' },
    { id: 'library', name: 'Library Fee' },
  ];

  // Sample invoices
  const invoices = [
    {
      id: 'INV-001',
      child: 'Emma Johnson',
      description: 'Tuition Fee - Q1 2025',
      amount: 1500,
      dueDate: '2025-01-15',
      status: 'Paid',
      paymentDate: '2025-01-10',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-002',
      child: 'Emma Johnson',
      description: 'Activity Fee - Annual',
      amount: 250,
      dueDate: '2025-01-20',
      status: 'Paid',
      paymentDate: '2025-01-18',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-003',
      child: 'Noah Johnson',
      description: 'Tuition Fee - Q1 2025',
      amount: 1200,
      dueDate: '2025-01-15',
      status: 'Paid',
      paymentDate: '2025-01-12',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-004',
      child: 'Emma Johnson',
      description: 'Tuition Fee - Q2 2025',
      amount: 1500,
      dueDate: '2025-04-15',
      status: 'Paid',
      paymentDate: '2025-04-10',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-005',
      child: 'Noah Johnson',
      description: 'Tuition Fee - Q2 2025',
      amount: 1200,
      dueDate: '2025-04-15',
      status: 'Paid',
      paymentDate: '2025-04-08',
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'INV-006',
      child: 'Emma Johnson',
      description: 'Field Trip Fee',
      amount: 75,
      dueDate: '2025-04-01',
      status: 'Pending',
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: 'INV-007',
      child: 'Noah Johnson',
      description: 'Sports Equipment Fee',
      amount: 120,
      dueDate: '2025-04-10',
      status: 'Pending',
      paymentDate: null,
      paymentMethod: null,
    },
  ];

  // Sample payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'bank', name: 'Bank Transfer', icon: FileText },
  ];

  // Filter invoices based on selected filters
  const filteredInvoices = invoices.filter((invoice) => {
    if (
      selectedChild !== 'all' &&
      invoice.child !== children.find((c) => c.id === selectedChild)?.name
    ) {
      return false;
    }
    if (selectedFeeType !== 'all') {
      const feeTypeName = feeTypes.find((f) => f.id === selectedFeeType)?.name;
      if (!invoice.description.includes(feeTypeName || '')) {
        return false;
      }
    }
    if (selectedStatus !== 'all' && invoice.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  // Calculate totals
  const totalPaid = filteredInvoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPending = filteredInvoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Fees & Payments</h1>
          <p className='text-muted-foreground'>
            Manage your children's school fees and payments
          </p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Paid</CardTitle>
            <CheckCircle className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalPaid.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>All time payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Payments
            </CardTitle>
            <Clock className='h-4 w-4 text-amber-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalPending.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>Due soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Next Payment Due
            </CardTitle>
            <Calendar className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {filteredInvoices.filter((inv) => inv.status === 'Pending')
                .length > 0
                ? new Date(
                    filteredInvoices
                      .filter((inv) => inv.status === 'Pending')
                      .sort(
                        (a, b) =>
                          new Date(a.dueDate).getTime() -
                          new Date(b.dueDate).getTime()
                      )[0].dueDate
                  ).toLocaleDateString()
                : 'No pending payments'}
            </div>
            <p className='text-xs text-muted-foreground'>Mark your calendar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='invoices'>
        <TabsList>
          <TabsTrigger value='invoices'>Invoices</TabsTrigger>
          <TabsTrigger value='payment-history'>Payment History</TabsTrigger>
          <TabsTrigger value='make-payment'>Make a Payment</TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value='invoices' className='space-y-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Fee Invoices</CardTitle>
                <CardDescription>
                  View and manage your fee invoices
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search invoices...'
                    className='w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]'
                  />
                </div>
                <Button variant='outline' size='icon'>
                  <Filter className='h-4 w-4' />
                  <span className='sr-only'>Filter</span>
                </Button>
                <Button variant='outline' size='icon'>
                  <SlidersHorizontal className='h-4 w-4' />
                  <span className='sr-only'>Settings</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-3 mb-6'>
                <div className='space-y-2'>
                  <Label>Child</Label>
                  <Select
                    value={selectedChild}
                    onValueChange={setSelectedChild}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select child' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Children</SelectItem>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          {child.name} ({child.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Fee Type</Label>
                  <Select
                    value={selectedFeeType}
                    onValueChange={setSelectedFeeType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select fee type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Fee Types</SelectItem>
                      {feeTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Status</Label>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Statuses</SelectItem>
                      <SelectItem value='Paid'>Paid</SelectItem>
                      <SelectItem value='Pending'>Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Child</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className='font-medium'>
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.child}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === 'Paid' ? 'outline' : 'default'
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button variant='ghost' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Download
                          </Button>
                          {invoice.status === 'Pending' && (
                            <Button size='sm'>Pay Now</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value='payment-history' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View your payment history and receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Child</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices
                    .filter((invoice) => invoice.status === 'Paid')
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className='font-medium'>
                          {invoice.id}
                        </TableCell>
                        <TableCell>{invoice.child}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          {invoice.paymentDate &&
                            new Date(invoice.paymentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className='text-right'>
                          <Button variant='ghost' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Make a Payment Tab */}
        <TabsContent value='make-payment' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>Pay your pending fees</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label>Select Invoice</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an invoice to pay' />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredInvoices
                      .filter((invoice) => invoice.status === 'Pending')
                      .map((invoice) => (
                        <SelectItem key={invoice.id} value={invoice.id}>
                          {invoice.id} - {invoice.description} ($
                          {invoice.amount.toFixed(2)})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Payment Method</Label>
                <div className='grid gap-4 md:grid-cols-2'>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className='flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent'
                    >
                      <Input
                        type='radio'
                        id={method.id}
                        name='paymentMethod'
                        className='h-4 w-4'
                      />
                      <Label
                        htmlFor={method.id}
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <method.icon className='h-5 w-5' />
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className='border rounded-md p-4 space-y-4'>
                <h3 className='font-medium'>Credit/Debit Card Details</h3>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='cardName'>Cardholder Name</Label>
                    <Input id='cardName' placeholder='Name on card' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cardNumber'>Card Number</Label>
                    <Input id='cardNumber' placeholder='1234 5678 9012 3456' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='expiryDate'>Expiry Date</Label>
                    <Input id='expiryDate' placeholder='MM/YY' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cvv'>CVV</Label>
                    <Input id='cvv' placeholder='123' />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <div>
                <p className='text-sm font-medium'>Total Amount</p>
                <p className='text-2xl font-bold'>$195.00</p>
              </div>
              <Button size='lg'>
                <CreditCard className='mr-2 h-4 w-4' />
                Complete Payment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
