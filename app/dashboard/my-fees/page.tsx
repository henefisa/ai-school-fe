'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowRight, CreditCard, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MyFeesPage() {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Sample student fee data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-2025-001',
      feeCategory: 'Tuition Fee',
      amount: 1500,
      dueDate: '2025-04-15',
      issueDate: '2025-03-15',
      status: 'Paid',
      paymentDate: '2025-03-20',
      paymentMethod: 'Credit Card',
    },
    {
      id: 'INV-2025-006',
      feeCategory: 'Library Fee',
      amount: 2000,
      dueDate: '2025-05-15',
      issueDate: '2025-03-15',
      status: 'Pending',
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: 'INV-2025-022',
      feeCategory: 'Technology Fee',
      amount: 1500,
      dueDate: '2025-05-15',
      issueDate: '2025-03-15',
      status: 'Pending',
      paymentDate: null,
      paymentMethod: null,
    },
    {
      id: 'INV-2025-023',
      feeCategory: 'Sports Fee',
      amount: 1000,
      dueDate: '2025-05-15',
      issueDate: '2025-03-15',
      status: 'Pending',
      paymentDate: null,
      paymentMethod: null,
    },
  ]);

  // Calculate total pending amount
  const totalPendingAmount = invoices
    .filter((invoice) => invoice.status === 'Pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Handle payment submission
  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedInvoice) return;

    const formData = new FormData(e.currentTarget);
    const paymentMethod = formData.get('paymentMethod') as string;

    // Update invoice status
    setInvoices(
      invoices.map((invoice) => {
        if (invoice.id === selectedInvoice.id) {
          return {
            ...invoice,
            status: 'Paid',
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod,
          };
        }
        return invoice;
      }),
    );

    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsPaymentDialogOpen(false);
      setSelectedInvoice(null);
    }, 2000);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>My Fees</h1>
        <p className='text-muted-foreground'>
          View and manage your fee payments.
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Pending</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${totalPendingAmount.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              {
                invoices.filter((invoice) => invoice.status === 'Pending')
                  .length
              }{' '}
              pending invoices
            </p>
          </CardContent>
        </Card>
        <Card className='md:col-span-2'>
          <CardHeader className='pb-3'>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>
              Overview of your fee payments for the current academic year.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-1'>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm font-medium'>Tuition Fees</div>
              <div className='font-medium'>$1,500.00</div>
            </div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm font-medium'>Library Fee</div>
              <div className='font-medium'>$2,000.00</div>
            </div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm font-medium'>Technology Fee</div>
              <div className='font-medium'>$1,500.00</div>
            </div>
            <div className='flex items-center justify-between py-1'>
              <div className='text-sm font-medium'>Sports Fee</div>
              <div className='font-medium'>$1,000.00</div>
            </div>
            <div className='flex items-center justify-between border-t py-2'>
              <div className='text-sm font-medium'>Total</div>
              <div className='font-bold'>$6,000.00</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all'>All Invoices</TabsTrigger>
          <TabsTrigger value='pending'>Pending</TabsTrigger>
          <TabsTrigger value='paid'>Paid</TabsTrigger>
        </TabsList>
        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Fee Invoices</CardTitle>
              <CardDescription>
                View all your fee invoices and their payment status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className='font-medium'>
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.feeCategory}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            invoice.status === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Link href={`/dashboard/my-fees/${invoice.id}`}>
                            <Button variant='outline' size='icon'>
                              <Eye className='h-4 w-4' />
                              <span className='sr-only'>View</span>
                            </Button>
                          </Link>
                          <Button variant='outline' size='icon'>
                            <Download className='h-4 w-4' />
                            <span className='sr-only'>Download</span>
                          </Button>
                          {invoice.status === 'Pending' && (
                            <Dialog
                              open={
                                isPaymentDialogOpen &&
                                selectedInvoice?.id === invoice.id
                              }
                              onOpenChange={(open) => {
                                setIsPaymentDialogOpen(open);
                                if (!open) {
                                  setSelectedInvoice(null);
                                  setPaymentSuccess(false);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant='outline'
                                  onClick={() => setSelectedInvoice(invoice)}
                                >
                                  Pay Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make Payment</DialogTitle>
                                  <DialogDescription>
                                    Pay for invoice {selectedInvoice?.id} -{' '}
                                    {selectedInvoice?.feeCategory}
                                  </DialogDescription>
                                </DialogHeader>
                                {paymentSuccess ? (
                                  <div className='flex flex-col items-center justify-center py-6'>
                                    <div className='rounded-full bg-green-100 p-3'>
                                      <svg
                                        className='h-8 w-8 text-green-600'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M5 13l4 4L19 7'
                                        />
                                      </svg>
                                    </div>
                                    <p className='mt-4 text-center text-lg font-medium'>
                                      Payment successful!
                                    </p>
                                    <p className='text-center text-sm text-muted-foreground'>
                                      Your payment has been processed
                                      successfully.
                                    </p>
                                  </div>
                                ) : (
                                  <form onSubmit={handlePayment}>
                                    <div className='grid gap-4 py-4'>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='amount'>Amount</Label>
                                        <Input
                                          id='amount'
                                          value={`$${selectedInvoice?.amount.toFixed(2)}`}
                                          disabled
                                        />
                                      </div>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='paymentMethod'>
                                          Payment Method
                                        </Label>
                                        <Select
                                          name='paymentMethod'
                                          defaultValue='Credit Card'
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder='Select payment method' />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value='Credit Card'>
                                              Credit Card
                                            </SelectItem>
                                            <SelectItem value='Bank Transfer'>
                                              Bank Transfer
                                            </SelectItem>
                                            <SelectItem value='Mobile Payment'>
                                              Mobile Payment
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='cardNumber'>
                                          Card Number
                                        </Label>
                                        <Input
                                          id='cardNumber'
                                          placeholder='1234 5678 9012 3456'
                                          required
                                        />
                                      </div>
                                      <div className='grid grid-cols-2 gap-4'>
                                        <div className='grid gap-2'>
                                          <Label htmlFor='expiryDate'>
                                            Expiry Date
                                          </Label>
                                          <Input
                                            id='expiryDate'
                                            placeholder='MM/YY'
                                            required
                                          />
                                        </div>
                                        <div className='grid gap-2'>
                                          <Label htmlFor='cvv'>CVV</Label>
                                          <Input
                                            id='cvv'
                                            placeholder='123'
                                            required
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() =>
                                          setIsPaymentDialogOpen(false)
                                        }
                                      >
                                        Cancel
                                      </Button>
                                      <Button type='submit'>
                                        Pay $
                                        {selectedInvoice?.amount.toFixed(2)}
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                )}
                              </DialogContent>
                            </Dialog>
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
        <TabsContent value='pending' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Invoices that require payment.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((invoice) => invoice.status === 'Pending')
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className='font-medium'>
                          {invoice.id}
                        </TableCell>
                        <TableCell>{invoice.feeCategory}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.issueDate}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Link href={`/dashboard/my-fees/${invoice.id}`}>
                              <Button variant='outline' size='icon'>
                                <Eye className='h-4 w-4' />
                                <span className='sr-only'>View</span>
                              </Button>
                            </Link>
                            <Dialog
                              open={
                                isPaymentDialogOpen &&
                                selectedInvoice?.id === invoice.id
                              }
                              onOpenChange={(open) => {
                                setIsPaymentDialogOpen(open);
                                if (!open) {
                                  setSelectedInvoice(null);
                                  setPaymentSuccess(false);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant='default'
                                  onClick={() => setSelectedInvoice(invoice)}
                                >
                                  Pay Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make Payment</DialogTitle>
                                  <DialogDescription>
                                    Pay for invoice {selectedInvoice?.id} -{' '}
                                    {selectedInvoice?.feeCategory}
                                  </DialogDescription>
                                </DialogHeader>
                                {paymentSuccess ? (
                                  <div className='flex flex-col items-center justify-center py-6'>
                                    <div className='rounded-full bg-green-100 p-3'>
                                      <svg
                                        className='h-8 w-8 text-green-600'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M5 13l4 4L19 7'
                                        />
                                      </svg>
                                    </div>
                                    <p className='mt-4 text-center text-lg font-medium'>
                                      Payment successful!
                                    </p>
                                    <p className='text-center text-sm text-muted-foreground'>
                                      Your payment has been processed
                                      successfully.
                                    </p>
                                  </div>
                                ) : (
                                  <form onSubmit={handlePayment}>
                                    <div className='grid gap-4 py-4'>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='amount'>Amount</Label>
                                        <Input
                                          id='amount'
                                          value={`$${selectedInvoice?.amount.toFixed(2)}`}
                                          disabled
                                        />
                                      </div>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='paymentMethod'>
                                          Payment Method
                                        </Label>
                                        <Select
                                          name='paymentMethod'
                                          defaultValue='Credit Card'
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder='Select payment method' />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value='Credit Card'>
                                              Credit Card
                                            </SelectItem>
                                            <SelectItem value='Bank Transfer'>
                                              Bank Transfer
                                            </SelectItem>
                                            <SelectItem value='Mobile Payment'>
                                              Mobile Payment
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className='grid gap-2'>
                                        <Label htmlFor='cardNumber'>
                                          Card Number
                                        </Label>
                                        <Input
                                          id='cardNumber'
                                          placeholder='1234 5678 9012 3456'
                                          required
                                        />
                                      </div>
                                      <div className='grid grid-cols-2 gap-4'>
                                        <div className='grid gap-2'>
                                          <Label htmlFor='expiryDate'>
                                            Expiry Date
                                          </Label>
                                          <Input
                                            id='expiryDate'
                                            placeholder='MM/YY'
                                            required
                                          />
                                        </div>
                                        <div className='grid gap-2'>
                                          <Label htmlFor='cvv'>CVV</Label>
                                          <Input
                                            id='cvv'
                                            placeholder='123'
                                            required
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() =>
                                          setIsPaymentDialogOpen(false)
                                        }
                                      >
                                        Cancel
                                      </Button>
                                      <Button type='submit'>
                                        Pay $
                                        {selectedInvoice?.amount.toFixed(2)}
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='paid' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>Invoices that have been paid.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Fee Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices
                    .filter((invoice) => invoice.status === 'Paid')
                    .map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className='font-medium'>
                          {invoice.id}
                        </TableCell>
                        <TableCell>{invoice.feeCategory}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.issueDate}</TableCell>
                        <TableCell>{invoice.paymentDate}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className='text-right'>
                          <div className='flex justify-end gap-2'>
                            <Link href={`/dashboard/my-fees/${invoice.id}`}>
                              <Button variant='outline' size='icon'>
                                <Eye className='h-4 w-4' />
                                <span className='sr-only'>View</span>
                              </Button>
                            </Link>
                            <Button variant='outline' size='icon'>
                              <Download className='h-4 w-4' />
                              <span className='sr-only'>Download</span>
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

      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
          <CardDescription>
            Overview of the fee structure for the current academic year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>Tuition Fee</TableCell>
                <TableCell>Regular monthly tuition fee</TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell>Monthly</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Library Fee</TableCell>
                <TableCell>
                  Annual library maintenance and book acquisition fee
                </TableCell>
                <TableCell>$2,000.00</TableCell>
                <TableCell>Annual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Technology Fee</TableCell>
                <TableCell>
                  Fee for computer labs and technology resources
                </TableCell>
                <TableCell>$1,500.00</TableCell>
                <TableCell>Annual</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Sports Fee</TableCell>
                <TableCell>
                  Fee for sports equipment and facilities maintenance
                </TableCell>
                <TableCell>$1,000.00</TableCell>
                <TableCell>Annual</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant='outline' className='ml-auto'>
            View Full Fee Structure
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Types
interface Invoice {
  id: string;
  feeCategory: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate: string | null;
  paymentMethod: string | null;
}
