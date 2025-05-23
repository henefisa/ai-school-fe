'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Loader2,
  Mail,
  Phone,
  Download,
  Eye,
  Trash,
  ArrowUp,
  ArrowDown,
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
import { PARENTS_KEYS } from '@/apis/parents/keys';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useListParents } from '@/apis/parents/list-parents';
import { useDeleteParent } from '@/apis/parents/delete';
import { StudentStatusFilter as ParentStatusFilter } from '@/apis/students/list-students';
import { ParentInfo } from '@/apis/parents/type';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getDisplayName } from '@/utils/get-display-name';
import { getError } from '@/utils/getError';
import { cn } from '@/lib/utils';
import { getUrl } from '@/utils/getUrl';
import useDebounce from '@/hooks/use-debounce';

type SortField = 'name' | 'email' | 'occupation' | 'children' | 'status' | null;
type SortDirection = 'asc' | 'desc';

export default function ParentsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(
    ParentStatusFilter.ALL
  );
  const pageSize = 10;

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getStatusBoolean = () => {
    if (statusFilter === ParentStatusFilter.ACTIVE) return true;
    if (statusFilter === ParentStatusFilter.INACTIVE) return false;
    return undefined;
  };

  const [selectedParent, setSelectedParent] = useState<ParentInfo>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filter = {
    page: currentPage,
    pageSize,
    q: debouncedSearchQuery,
    status: getStatusBoolean(),
    // sortBy: sortField,
    // sortDirection: sortDirection,
  };

  const { data, isLoading } = useListParents(filter);

  const deleteParentMutation = useDeleteParent({
    queryKey: PARENTS_KEYS.listParents(filter),
  });

  const sortedData = useMemo(() => {
    if (!data?.results || !sortField) return data?.results;

    return [...data.results].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = getDisplayName(a).localeCompare(getDisplayName(b));
          break;
        case 'email':
          comparison = (a.email || '').localeCompare(b.email || '');
          break;
        case 'occupation':
          comparison = (a.occupation || '').localeCompare(b.occupation || '');
          break;
        case 'children':
          comparison = 0;
          break;
        case 'status':
          comparison = (a.deletedAt ? 1 : 0) - (b.deletedAt ? 1 : 0);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data?.results, sortField, sortDirection]);

  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  const handleDeleteClick = (parent: ParentInfo) => {
    setSelectedParent(parent);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedParent?.id) return;
    try {
      await deleteParentMutation.mutateAsync(selectedParent.id);
      setShowConfirmDelete(false);
      setSelectedParent({} as ParentInfo);

      toast({
        title: 'Parent Deleted',
        description: 'Parent has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Delete failed parent!',
        description:
          getError(error) ?? 'Failed to delete parent. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const SortableTableHead = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <TableHead
      className='cursor-pointer hover:bg-muted/50 transition-colors'
      onClick={() => handleSort(field)}
    >
      <div className='flex items-center'>
        {children}
        {sortField === field && (
          <span className='ml-2'>
            {sortDirection === 'asc' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowDown className='h-4 w-4' />
            )}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Parents</h1>
        <Link href='/dashboard/parents/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add New Parent
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parent Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Parents
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
                onValueChange={(value: ParentStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ParentStatusFilter.ALL}>
                    All Parents
                  </SelectItem>
                  <SelectItem value={ParentStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={ParentStatusFilter.INACTIVE}>
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
          <CardTitle>Parents List</CardTitle>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableTableHead field='name'>Parent</SortableTableHead>
                    <SortableTableHead field='email'>Contact</SortableTableHead>
                    <SortableTableHead field='occupation'>
                      Occupation
                    </SortableTableHead>
                    <SortableTableHead field='children'>
                      Children
                    </SortableTableHead>
                    <SortableTableHead field='status'>Status</SortableTableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!sortedData || sortedData?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className='h-24 text-center'>
                        No parents found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedData?.map((parent: ParentInfo) => (
                      <TableRow key={parent.id}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Avatar className={cn('size-14')}>
                              <AvatarImage
                                src={getUrl(parent.user?.photoUrl ?? '')}
                                alt={getDisplayName(parent)}
                              />
                              <AvatarFallback className='text-sm text-center'>
                                {getDisplayName(parent)}
                              </AvatarFallback>
                            </Avatar>
                            <p className='font-medium'>
                              {getDisplayName(parent)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex flex-col'>
                            <div className='flex items-center gap-1'>
                              <Mail className='h-3 w-3 text-muted-foreground' />
                              <span className='text-sm'>{parent.email}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Phone className='h-3 w-3 text-muted-foreground' />
                              <span className='text-sm'>
                                {parent.contactNumber1}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{parent.occupation}</TableCell>
                        <TableCell>
                          <Badge variant='outline'>4 students</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              parent.deletedAt ? 'destructive' : 'default'
                            }
                          >
                            {parent.deletedAt ? 'Inactive' : 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex gap-2 justify-end'>
                            {parent.id ? (
                              <Link href={`parents/${parent.id}`}>
                                <Button variant='default' size='sm'>
                                  <Eye />
                                </Button>
                              </Link>
                            ) : (
                              <Button variant='default' size='sm' disabled>
                                <Eye />
                              </Button>
                            )}
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteClick(parent)}
                            >
                              <Trash />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
        <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm deletion</DialogTitle>
              {selectedParent && (
                <DialogDescription>
                  Are you sure you want to delete{' '}
                  <b>{getDisplayName(selectedParent)}</b> parent? This action
                  cannot be undone.
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
      </Card>
    </div>
  );
}
