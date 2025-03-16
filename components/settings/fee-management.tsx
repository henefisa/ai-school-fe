'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { toast } from '@/components/ui/use-toast';
import { PlusIcon, SearchIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';

// Mock data for fee categories
const mockFeeCategories = [
  {
    id: '1',
    name: 'Tuition Fee',
    amount: 5000,
    dueDate: new Date(2023, 8, 15),
    frequency: 'Monthly',
  },
  {
    id: '2',
    name: 'Library Fee',
    amount: 1000,
    dueDate: new Date(2023, 8, 30),
    frequency: 'Yearly',
  },
  {
    id: '3',
    name: 'Transportation Fee',
    amount: 1500,
    dueDate: new Date(2023, 8, 15),
    frequency: 'Monthly',
  },
  {
    id: '4',
    name: 'Examination Fee',
    amount: 2000,
    dueDate: new Date(2023, 11, 1),
    frequency: 'Semester',
  },
  {
    id: '5',
    name: 'Sports Fee',
    amount: 800,
    dueDate: new Date(2023, 8, 30),
    frequency: 'Yearly',
  },
];

export default function FeeManagement() {
  const [feeCategories, setFeeCategories] = useState(mockFeeCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);
  const [isEditFeeOpen, setIsEditFeeOpen] = useState(false);
  const [isDeleteFeeOpen, setIsDeleteFeeOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<
    (typeof mockFeeCategories)[0] | null
  >(null);

  const [newFee, setNewFee] = useState({
    name: '',
    amount: 0,
    dueDate: new Date(),
    frequency: 'Monthly',
  });

  const filteredFees = feeCategories.filter(
    (fee) =>
      fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.frequency.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddFee = () => {
    const id = (feeCategories.length + 1).toString();
    setFeeCategories([...feeCategories, { id, ...newFee }]);
    setNewFee({
      name: '',
      amount: 0,
      dueDate: new Date(),
      frequency: 'Monthly',
    });
    setIsAddFeeOpen(false);
    toast({
      title: 'Fee category added',
      description: `${newFee.name} has been added to the system.`,
    });
  };

  const handleEditFee = () => {
    if (!selectedFee) return;

    setFeeCategories(
      feeCategories.map((fee) =>
        fee.id === selectedFee.id ? { ...selectedFee } : fee,
      ),
    );
    setIsEditFeeOpen(false);
    toast({
      title: 'Fee category updated',
      description: `${selectedFee.name} has been updated.`,
    });
  };

  const handleDeleteFee = () => {
    if (!selectedFee) return;

    setFeeCategories(feeCategories.filter((fee) => fee.id !== selectedFee.id));
    setIsDeleteFeeOpen(false);
    toast({
      title: 'Fee category deleted',
      description: `${selectedFee.name} has been removed from the system.`,
    });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='relative w-full max-w-sm'>
          <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search fee categories...'
            className='pl-8'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className='mr-2 h-4 w-4' />
              Add Fee Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Fee Category</DialogTitle>
              <DialogDescription>
                Add a new fee category to the system.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Fee Name</Label>
                <Input
                  id='name'
                  value={newFee.name}
                  onChange={(e) =>
                    setNewFee({ ...newFee, name: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='amount'>Amount</Label>
                <Input
                  id='amount'
                  type='number'
                  value={newFee.amount.toString()}
                  onChange={(e) =>
                    setNewFee({
                      ...newFee,
                      amount: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='dueDate'>Due Date</Label>
                <DatePicker
                  selected={newFee.dueDate}
                  onSelect={(date) =>
                    date && setNewFee({ ...newFee, dueDate: date })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='frequency'>Frequency</Label>
                <select
                  id='frequency'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  value={newFee.frequency}
                  onChange={(e) =>
                    setNewFee({ ...newFee, frequency: e.target.value })
                  }
                >
                  <option value='Monthly'>Monthly</option>
                  <option value='Quarterly'>Quarterly</option>
                  <option value='Semester'>Semester</option>
                  <option value='Yearly'>Yearly</option>
                  <option value='One-time'>One-time</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setIsAddFeeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFee}>Add Fee Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  No fee categories found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className='font-medium'>{fee.name}</TableCell>
                  <TableCell>${fee.amount.toFixed(2)}</TableCell>
                  <TableCell>{fee.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell>{fee.frequency}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setSelectedFee(fee);
                          setIsEditFeeOpen(true);
                        }}
                      >
                        <Edit2Icon className='h-4 w-4' />
                        <span className='sr-only'>Edit</span>
                      </Button>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setSelectedFee(fee);
                          setIsDeleteFeeOpen(true);
                        }}
                      >
                        <Trash2Icon className='h-4 w-4' />
                        <span className='sr-only'>Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditFeeOpen} onOpenChange={setIsEditFeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fee Category</DialogTitle>
            <DialogDescription>
              Make changes to the fee category information.
            </DialogDescription>
          </DialogHeader>
          {selectedFee && (
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='edit-name'>Fee Name</Label>
                <Input
                  id='edit-name'
                  value={selectedFee.name}
                  onChange={(e) =>
                    setSelectedFee({ ...selectedFee, name: e.target.value })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-amount'>Amount</Label>
                <Input
                  id='edit-amount'
                  type='number'
                  value={selectedFee.amount.toString()}
                  onChange={(e) =>
                    setSelectedFee({
                      ...selectedFee,
                      amount: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-dueDate'>Due Date</Label>
                <DatePicker
                  selected={selectedFee.dueDate}
                  onSelect={(date) =>
                    date && setSelectedFee({ ...selectedFee, dueDate: date })
                  }
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-frequency'>Frequency</Label>
                <select
                  id='edit-frequency'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  value={selectedFee.frequency}
                  onChange={(e) =>
                    setSelectedFee({
                      ...selectedFee,
                      frequency: e.target.value,
                    })
                  }
                >
                  <option value='Monthly'>Monthly</option>
                  <option value='Quarterly'>Quarterly</option>
                  <option value='Semester'>Semester</option>
                  <option value='Yearly'>Yearly</option>
                  <option value='One-time'>One-time</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsEditFeeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFee}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteFeeOpen} onOpenChange={setIsDeleteFeeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Fee Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this fee category? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedFee && (
            <div className='py-4'>
              <p>
                You are about to delete <strong>{selectedFee.name}</strong>.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsDeleteFeeOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleDeleteFee}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
