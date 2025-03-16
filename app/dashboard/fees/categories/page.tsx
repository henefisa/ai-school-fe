'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-react';

export default function FeeCategoriesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FeeCategory | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Sample fee categories data
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([
    {
      id: 1,
      name: 'Tuition Fee',
      description: 'Regular monthly tuition fee for all students',
      amount: 1500,
      applicableGrades: 'All Grades',
      frequency: 'Monthly',
      isActive: true,
    },
    {
      id: 2,
      name: 'Registration Fee',
      description: 'One-time registration fee for new students',
      amount: 5000,
      applicableGrades: 'All Grades',
      frequency: 'One-time',
      isActive: true,
    },
    {
      id: 3,
      name: 'Library Fee',
      description: 'Annual library maintenance and book acquisition fee',
      amount: 2000,
      applicableGrades: 'All Grades',
      frequency: 'Annual',
      isActive: true,
    },
    {
      id: 4,
      name: 'Laboratory Fee',
      description: 'Fee for science laboratory usage and materials',
      amount: 1200,
      applicableGrades: 'Grade 6-12',
      frequency: 'Annual',
      isActive: true,
    },
    {
      id: 5,
      name: 'Sports Fee',
      description: 'Fee for sports equipment and facilities maintenance',
      amount: 1000,
      applicableGrades: 'All Grades',
      frequency: 'Annual',
      isActive: true,
    },
    {
      id: 6,
      name: 'Technology Fee',
      description: 'Fee for computer labs and technology resources',
      amount: 1500,
      applicableGrades: 'Grade 3-12',
      frequency: 'Annual',
      isActive: true,
    },
    {
      id: 7,
      name: 'Transportation Fee',
      description: 'Optional fee for school bus transportation',
      amount: 2500,
      applicableGrades: 'All Grades',
      frequency: 'Monthly',
      isActive: true,
    },
  ]);

  // Filter categories based on search query
  const filteredCategories = feeCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.applicableGrades
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Handle create new category
  const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCategory: FeeCategory = {
      id: feeCategories.length + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      applicableGrades: formData.get('applicableGrades') as string,
      frequency: formData.get('frequency') as string,
      isActive: true,
    };
    setFeeCategories([...feeCategories, newCategory]);
    setIsCreateDialogOpen(false);
  };

  // Handle edit category
  const handleEditCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const formData = new FormData(e.currentTarget);
    const updatedCategory: FeeCategory = {
      ...selectedCategory,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      applicableGrades: formData.get('applicableGrades') as string,
      frequency: formData.get('frequency') as string,
    };

    setFeeCategories(
      feeCategories.map((category) =>
        category.id === selectedCategory.id ? updatedCategory : category,
      ),
    );
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
  };

  // Handle delete category
  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    setFeeCategories(
      feeCategories.filter((category) => category.id !== selectedCategory.id),
    );
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Fee Categories</h1>
          <p className='text-muted-foreground'>
            Manage fee categories and structures for the school.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className='mr-2 h-4 w-4' />
              Add Fee Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Fee Category</DialogTitle>
              <DialogDescription>
                Add a new fee category to the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCategory}>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='name'>Category Name</Label>
                  <Input id='name' name='name' required />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea id='description' name='description' />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='amount'>Amount (USD)</Label>
                  <Input
                    id='amount'
                    name='amount'
                    type='number'
                    min='0'
                    step='0.01'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='applicableGrades'>Applicable Grades</Label>
                  <Select name='applicableGrades' defaultValue='All Grades'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select applicable grades' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='All Grades'>All Grades</SelectItem>
                      <SelectItem value='Grade 1-5'>Grade 1-5</SelectItem>
                      <SelectItem value='Grade 6-8'>Grade 6-8</SelectItem>
                      <SelectItem value='Grade 9-12'>Grade 9-12</SelectItem>
                      <SelectItem value='Grade 3-12'>Grade 3-12</SelectItem>
                      <SelectItem value='Grade 6-12'>Grade 6-12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='frequency'>Frequency</Label>
                  <Select name='frequency' defaultValue='Annual'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select frequency' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='One-time'>One-time</SelectItem>
                      <SelectItem value='Monthly'>Monthly</SelectItem>
                      <SelectItem value='Quarterly'>Quarterly</SelectItem>
                      <SelectItem value='Semi-Annual'>Semi-Annual</SelectItem>
                      <SelectItem value='Annual'>Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Create Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle>Fee Categories</CardTitle>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search categories...'
              className='w-full pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount (USD)</TableHead>
                <TableHead>Applicable Grades</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='font-medium'>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>${category.amount.toFixed(2)}</TableCell>
                  <TableCell>{category.applicableGrades}</TableCell>
                  <TableCell>{category.frequency}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        category.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Dialog
                        open={
                          isEditDialogOpen &&
                          selectedCategory?.id === category.id
                        }
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (!open) setSelectedCategory(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className='h-4 w-4' />
                            <span className='sr-only'>Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Fee Category</DialogTitle>
                            <DialogDescription>
                              Make changes to the fee category.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleEditCategory}>
                            <div className='grid gap-4 py-4'>
                              <div className='grid gap-2'>
                                <Label htmlFor='edit-name'>Category Name</Label>
                                <Input
                                  id='edit-name'
                                  name='name'
                                  defaultValue={selectedCategory?.name}
                                  required
                                />
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor='edit-description'>
                                  Description
                                </Label>
                                <Textarea
                                  id='edit-description'
                                  name='description'
                                  defaultValue={selectedCategory?.description}
                                />
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor='edit-amount'>
                                  Amount (USD)
                                </Label>
                                <Input
                                  id='edit-amount'
                                  name='amount'
                                  type='number'
                                  min='0'
                                  step='0.01'
                                  defaultValue={selectedCategory?.amount}
                                  required
                                />
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor='edit-applicableGrades'>
                                  Applicable Grades
                                </Label>
                                <Select
                                  name='applicableGrades'
                                  defaultValue={
                                    selectedCategory?.applicableGrades
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select applicable grades' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value='All Grades'>
                                      All Grades
                                    </SelectItem>
                                    <SelectItem value='Grade 1-5'>
                                      Grade 1-5
                                    </SelectItem>
                                    <SelectItem value='Grade 6-8'>
                                      Grade 6-8
                                    </SelectItem>
                                    <SelectItem value='Grade 9-12'>
                                      Grade 9-12
                                    </SelectItem>
                                    <SelectItem value='Grade 3-12'>
                                      Grade 3-12
                                    </SelectItem>
                                    <SelectItem value='Grade 6-12'>
                                      Grade 6-12
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className='grid gap-2'>
                                <Label htmlFor='edit-frequency'>
                                  Frequency
                                </Label>
                                <Select
                                  name='frequency'
                                  defaultValue={selectedCategory?.frequency}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder='Select frequency' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value='One-time'>
                                      One-time
                                    </SelectItem>
                                    <SelectItem value='Monthly'>
                                      Monthly
                                    </SelectItem>
                                    <SelectItem value='Quarterly'>
                                      Quarterly
                                    </SelectItem>
                                    <SelectItem value='Semi-Annual'>
                                      Semi-Annual
                                    </SelectItem>
                                    <SelectItem value='Annual'>
                                      Annual
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type='button'
                                variant='outline'
                                onClick={() => {
                                  setIsEditDialogOpen(false);
                                  setSelectedCategory(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button type='submit'>Save Changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={
                          isDeleteDialogOpen &&
                          selectedCategory?.id === category.id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (!open) setSelectedCategory(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='outline'
                            size='icon'
                            className='text-red-500 hover:text-red-600'
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className='h-4 w-4' />
                            <span className='sr-only'>Delete</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Fee Category</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete the fee category "
                              {selectedCategory?.name}"? This action cannot be
                              undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              type='button'
                              variant='outline'
                              onClick={() => {
                                setIsDeleteDialogOpen(false);
                                setSelectedCategory(null);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type='button'
                              variant='destructive'
                              onClick={handleDeleteCategory}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className='h-24 text-center'>
                    No fee categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Types
interface FeeCategory {
  id: number;
  name: string;
  description: string;
  amount: number;
  applicableGrades: string;
  frequency: string;
  isActive: boolean;
}
