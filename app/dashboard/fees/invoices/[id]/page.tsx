'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Printer, Send } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Sample invoice data
  const [invoice, setInvoice] = useState<Invoice>({
    id: params.id,
    studentId: 'ST-001',
    studentName: 'Emma Johnson',
    grade: 'Grade 10',
    parentName: 'Michael Johnson',
    parentEmail: 'michael.johnson@example.com',
    parentPhone: '+1 (555) 123-4567',
    feeCategory: 'Tuition Fee',
    amount: 1500,
    dueDate: '2025-04-15',
    issueDate: '2025-03-15',
    status: 'Pending',
    paymentDate: null,
    paymentMethod: null,
    transactionId: null,
    items: [
      {
        description: 'Monthly Tuition Fee - April 2025',
        amount: 1500,
      },
    ],
  });

  // Handle payment submission
  const handlePaymentSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const paymentMethod = formData.get('paymentMethod') as string;
    const transactionId = formData.get('transactionId') as string;

    setInvoice({
      ...invoice,
      status: 'Paid',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      transactionId,
    });

    setIsPaymentDialogOpen(false);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/dashboard/fees/invoices'>
            <Button variant='outline' size='icon'>
              <ArrowLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Button>
          </Link>
          <h1 className='text-3xl font-bold tracking-tight'>
            Invoice {invoice.id}
          </h1>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Printer className='mr-2 h-4 w-4' />
            Print
          </Button>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            Download
          </Button>
          {invoice.status !== 'Paid' && (
            <Button variant='outline'>
              <Send className='mr-2 h-4 w-4' />
              Send Reminder
            </Button>
          )}
          {invoice.status !== 'Paid' && (
            <Dialog
              open={isPaymentDialogOpen}
              onOpenChange={setIsPaymentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>Record Payment</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Record Payment</DialogTitle>
                  <DialogDescription>
                    Enter payment details for invoice {invoice.id}.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePaymentSubmission}>
                  <div className='grid gap-4 py-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='paymentMethod'>Payment Method</Label>
                      <Select name='paymentMethod' defaultValue='Credit Card'>
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
                          <SelectItem value='Cash'>Cash</SelectItem>
                          <SelectItem value='Check'>Check</SelectItem>
                          <SelectItem value='Mobile Payment'>
                            Mobile Payment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='transactionId'>Transaction ID</Label>
                      <Input
                        id='transactionId'
                        name='transactionId'
                        placeholder='Enter transaction ID'
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='amount'>Amount (USD)</Label>
                      <Input
                        id='amount'
                        name='amount'
                        type='number'
                        min='0'
                        step='0.01'
                        defaultValue={invoice.amount}
                        disabled
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setIsPaymentDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type='submit'>Record Payment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Invoice Number
                </p>
                <p className='font-medium'>{invoice.id}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Status
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    invoice.status === 'Paid'
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Issue Date
                </p>
                <p>{invoice.issueDate}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Due Date
                </p>
                <p>{invoice.dueDate}</p>
              </div>
            </div>
            {invoice.status === 'Paid' && (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Payment Date
                  </p>
                  <p>{invoice.paymentDate}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Payment Method
                  </p>
                  <p>{invoice.paymentMethod}</p>
                </div>
              </div>
            )}
            {invoice.status === 'Paid' && invoice.transactionId && (
              <div>
                <p className='text-sm font-medium text-muted-foreground'>
                  Transaction ID
                </p>
                <p>{invoice.transactionId}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Student ID
              </p>
              <p className='font-medium'>{invoice.studentId}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Student Name
              </p>
              <p>{invoice.studentName}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Grade</p>
              <p>{invoice.grade}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Parent/Guardian
              </p>
              <p>{invoice.parentName}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                Contact
              </p>
              <p>{invoice.parentEmail}</p>
              <p>{invoice.parentPhone}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='grid grid-cols-12 font-medium'>
              <div className='col-span-8'>Description</div>
              <div className='col-span-4 text-right'>Amount</div>
            </div>
            <Separator />
            {invoice.items.map((item, index) => (
              <div key={index} className='grid grid-cols-12'>
                <div className='col-span-8'>{item.description}</div>
                <div className='col-span-4 text-right'>
                  ${item.amount.toFixed(2)}
                </div>
              </div>
            ))}
            <Separator />
            <div className='grid grid-cols-12 font-medium'>
              <div className='col-span-8 text-right'>Total</div>
              <div className='col-span-4 text-right'>
                ${invoice.amount.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-start'>
          <p className='text-sm font-medium'>Payment Instructions</p>
          <p className='text-sm text-muted-foreground'>
            Please make payment by the due date. For any questions regarding
            this invoice, please contact the finance office at
            finance@school.edu or call (555) 123-4567.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// Types
interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  feeCategory: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  items: {
    description: string;
    amount: number;
  }[];
}
