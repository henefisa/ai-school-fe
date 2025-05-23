'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  Search,
  Filter,
  MoreHorizontal,
  Loader2,
  Eye,
  Trash,
  Download,
  ArrowDown,
  ArrowUp,
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
import { TEACHERS_KEYS } from '@/apis/teachers/keys';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudentStatusFilter as TeacherStatusFilter } from '@/apis/students/list-students';
import { useDeleteTeacher } from '@/apis/teachers/delete';
import { TeacherResponse } from '@/apis/teachers/type';
import { getDisplayName } from '@/utils/get-display-name';
import { useListTeachers } from '@/apis/teachers/list-teachers';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getError } from '@/utils/getError';
import useDebounce from '@/hooks/use-debounce';
import { getUrl } from '@/utils/getUrl';
import { cn } from '@/lib/utils';

type SortField = 'name' | 'department' | 'email' | 'hireDate' | 'status' | null;
type SortDirection = 'asc' | 'desc';

export default function TeachersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(
    TeacherStatusFilter.ALL
  );
  const pageSize = 10;

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getStatusBoolean = () => {
    if (statusFilter === TeacherStatusFilter.ACTIVE) return true;
    if (statusFilter === TeacherStatusFilter.INACTIVE) return false;
    return undefined;
  };

  const [selectedTeacher, setSelectedTeacher] = useState<TeacherResponse>();
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
  const { data, isLoading } = useListTeachers(filter);

  const deleteTeacherMutation = useDeleteTeacher({
    queryKey: TEACHERS_KEYS.listTeachers(filter),
  });

  const sortedTeachers = useMemo(() => {
    if (!data?.results || !sortField) return data?.results;

    return [...data.results].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (sortField) {
        case 'name':
          valueA = getDisplayName(a).toLowerCase();
          valueB = getDisplayName(b).toLowerCase();
          break;
        case 'department':
          valueA = a.departments[0]?.name?.toLowerCase() || '';
          valueB = b.departments[0]?.name?.toLowerCase() || '';
          break;
        case 'email':
          valueA = a.email?.toLowerCase() || '';
          valueB = b.email?.toLowerCase() || '';
          break;
        case 'hireDate':
          valueA = new Date(a.hireDate).getTime();
          valueB = new Date(b.hireDate).getTime();
          break;
        case 'status':
          valueA = a.deletedAt ? 'inactive' : 'active';
          valueB = b.deletedAt ? 'inactive' : 'active';
          break;
        default:
          return 0;
      }

      const compareResult = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [data?.results, sortField, sortDirection]);

  const totalPages = useMemo(
    () => Math.ceil((data?.count || 0) / pageSize),
    [data]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTeacher?.id) return;
    try {
      await deleteTeacherMutation.mutateAsync(selectedTeacher.id);
      setShowConfirmDelete(false);
      setSelectedTeacher({} as TeacherResponse);

      toast({
        title: 'Teacher Deleted',
        description: 'Teacher has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Delete failed teacher!',
        description:
          getError(error) ?? 'Failed to delete teacher. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (teacher: TeacherResponse) => {
    setSelectedTeacher(teacher);
    setShowConfirmDelete(true);
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
        <h1 className='text-3xl font-bold tracking-tight'>Teachers</h1>
        <Link href='/dashboard/teachers/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add New Teacher
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Teacher Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Teachers
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
                onValueChange={(value: TeacherStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TeacherStatusFilter.ALL}>
                    All Teachers
                  </SelectItem>
                  <SelectItem value={TeacherStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={TeacherStatusFilter.INACTIVE}>
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
          <CardTitle>Teachers List</CardTitle>
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
                    <SortableTableHead field='name'>Teacher</SortableTableHead>
                    <SortableTableHead field='department'>
                      Department
                    </SortableTableHead>
                    <SortableTableHead field='email'>Email</SortableTableHead>
                    <SortableTableHead field='hireDate'>
                      Hire Date
                    </SortableTableHead>
                    <SortableTableHead field='status'>Status</SortableTableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!sortedTeachers || sortedTeachers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className='h-24 text-center'>
                        No teachers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedTeachers?.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Avatar className={cn('size-14')}>
                              <AvatarImage
                                src={getUrl(teacher.user?.photoUrl ?? '')}
                                alt={getDisplayName(teacher)}
                              />
                              <AvatarFallback className='text-center text-sm'>
                                {getDisplayName(teacher)}
                              </AvatarFallback>
                            </Avatar>
                            <p className='font-medium'>
                              {getDisplayName(teacher)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.departments[0]?.name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>
                          {format(new Date(teacher.hireDate), 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              teacher.deletedAt ? 'destructive' : 'default'
                            }
                          >
                            {teacher.deletedAt ? 'Inactive' : 'Active'}
                          </Badge>
                        </TableCell>
                        <TableCell className='text-right'>
                          <div className='flex gap-2 justify-end'>
                            <Link href={`teachers/${teacher.id}`}>
                              <Button variant='default' size='sm'>
                                <Eye />
                              </Button>
                            </Link>
                            <Button
                              variant='destructive'
                              size='sm'
                              onClick={() => handleDeleteClick(teacher)}
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
              {data && data.count > 0 && (
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
              {selectedTeacher && (
                <DialogDescription>
                  Are you sure you want to delete{' '}
                  <b>{getDisplayName(selectedTeacher)}</b> teacher? This action
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
