'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Loader2,
  Download,
  Trash,
  Eye,
} from 'lucide-react';

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DEPARTMENTS_KEYS } from '@/apis/departments/keys';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  DepartmentStatusFilter,
  useListDepartments,
} from '@/apis/departments/list-departments';
import { DepartmentResponse } from '@/apis/departments/type';
import { useDeleteDepartment } from '@/apis/departments/delete';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getError } from '@/utils/getError';

export default function DepartmentsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(
    DepartmentStatusFilter.ALL
  );

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentResponse>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const pageSize = 10;

  const getStatusBoolean = () => {
    if (statusFilter === DepartmentStatusFilter.ACTIVE) return true;
    if (statusFilter === DepartmentStatusFilter.INACTIVE) return false;
    return undefined;
  };

  const { data, isLoading } = useListDepartments({
    page: currentPage,
    pageSize,
    q: searchQuery,
    status: getStatusBoolean(),
  });

  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  const deleteDepartmentMutation = useDeleteDepartment({
    queryKey: DEPARTMENTS_KEYS.listDepartments({
      page: currentPage,
      pageSize,
      q: searchQuery,
    }),
  });

  const handleConfirmDelete = async () => {
    if (!selectedDepartment?.id) return;

    try {
      await deleteDepartmentMutation.mutateAsync(selectedDepartment.id);
      toast({
        title: 'Department Deleted',
        description: 'Department has been deleted successfully.',
      });
      setShowConfirmDelete(false);
      setSelectedDepartment({} as DepartmentResponse);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          getError(error) ?? 'Failed to delete department. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (department: DepartmentResponse) => {
    setSelectedDepartment(department);
    setShowConfirmDelete(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Departments</h1>
        <Link href='/dashboard/departments/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add New Department
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departments Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Departments
              </label>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  id='search'
                  type='search'
                  placeholder='Search by name...'
                  className='pl-8'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className='space-y-2'>
              <label htmlFor='status' className='text-sm font-medium'>
                Status
              </label>
              <Select
                value={statusFilter}
                onValueChange={(value: DepartmentStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DepartmentStatusFilter.ALL}>
                    All Departments
                  </SelectItem>
                  <SelectItem value={DepartmentStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={DepartmentStatusFilter.INACTIVE}>
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Departments List</CardTitle>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex h-[300px] items-center justify-center'>
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
          ) : (
            <>
              <div className='rounded-md border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[200px]'>
                        Department Name
                      </TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Head of Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.results.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className='h-24 text-center'>
                          No departments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.results.map((department: DepartmentResponse) => (
                        <TableRow key={department.id}>
                          <TableCell className='font-medium'>
                            {department.name}
                          </TableCell>
                          <TableCell>{department.code}</TableCell>
                          <TableCell>{department.headId}</TableCell>
                          <TableCell>{department.email}</TableCell>
                          <TableCell>{department.phoneNumber}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                department.deletedAt ? 'destructive' : 'default'
                              }
                            >
                              {department.deletedAt ? 'Inactive' : 'Active'}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right flex gap-2 justify-end'>
                            <Link href={`departments/${department.id}`}>
                              <Button variant='default' size='sm'>
                                <Eye />
                              </Button>
                            </Link>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteClick(department)}
                            >
                              <Trash />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {data && totalPages > 0 && (
                <div className='mt-4 flex justify-center'>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm deletion</DialogTitle>
            {selectedDepartment && (
              <DialogDescription>
                Are you sure you want to delete <b>{selectedDepartment.name}</b>{' '}
                department? This action cannot be undone.
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
