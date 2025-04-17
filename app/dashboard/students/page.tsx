'use client';

import { useDeleteStudent } from '@/apis/students/delete';
import { STUDENTS_KEYS } from '@/apis/students/keys';
import {
  StudentStatusFilter,
  useListStudents,
} from '@/apis/students/list-students';
import { StudentInfo } from '@/apis/students/type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDebounce from '@/hooks/use-debounce';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { getDisplayName } from '@/utils/get-display-name';
import { getError } from '@/utils/getError';
import { getUrl } from '@/utils/getUrl';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Download,
  Eye,
  PlusCircle,
  Search,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type SortField =
  | 'name'
  | 'grade'
  | 'gender'
  | 'status'
  | 'attendance'
  | 'avgGrade'
  | null;
type SortDirection = 'asc' | 'desc';

export default function StudentsPage() {
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(
    StudentStatusFilter.ALL
  );
  const pageSize = 10;

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const getStatusBoolean = () => {
    if (statusFilter === StudentStatusFilter.ACTIVE) return true;
    if (statusFilter === StudentStatusFilter.INACTIVE) return false;
    return undefined;
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filter = {
    page: currentPage,
    pageSize,
    q: debouncedSearchQuery,
    status: getStatusBoolean(),
  };

  const deleteStudentMutation = useDeleteStudent({
    queryKey: STUDENTS_KEYS.listStudents(filter),
  });
  const { data, isLoading } = useListStudents(filter);
  const [selectedStudent, setSelectedStudent] = useState<StudentInfo>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  const sortedStudents = useMemo(() => {
    if (!data?.results || !sortField) return data?.results;

    return [...data.results].sort((a, b) => {
      let valueA, valueB;

      switch (sortField) {
        case 'name':
          valueA = getDisplayName(a).toLowerCase();
          valueB = getDisplayName(b).toLowerCase();
          break;
        case 'grade':
          valueA = a.grade || '';
          valueB = b.grade || '';
          break;
        case 'gender':
          valueA = a.gender || '';
          valueB = b.gender || '';
          break;
        case 'status':
          valueA = a.deletedAt ? 'inactive' : 'active';
          valueB = b.deletedAt ? 'inactive' : 'active';
          break;
        case 'attendance':
          valueA = '95%';
          valueB = '95%';
          break;
        case 'avgGrade':
          valueA = 'A';
          valueB = 'A';
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data?.results, sortField, sortDirection]);

  const handleDeleteClick = (student: StudentInfo) => {
    setSelectedStudent(student);
    setShowConfirmDelete(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudent?.id) return;
    try {
      await deleteStudentMutation.mutateAsync(selectedStudent.id);
      setShowConfirmDelete(false);
      setSelectedStudent({} as StudentInfo);

      toast({
        title: 'Student deleted successfully!',
        description: 'The student has been removed from the system.',
      });
    } catch (error) {
      toast({
        title: 'Delete failed students!',
        description:
          getError(error) ??
          'An error occurred during deletion. Please try again.',
        variant: 'destructive',
      });
    }
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
              <ArrowUpIcon className='h-4 w-4' />
            ) : (
              <ArrowDownIcon className='h-4 w-4' />
            )}
          </span>
        )}
      </div>
    </TableHead>
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Students</h1>
          <p className='text-muted-foreground'>
            Manage student information, records, and performance.
          </p>
        </div>
        <Link href='students/create'>
          <Button className='sm:w-auto'>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add Student
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle>Student Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Students
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
                onValueChange={(value: StudentStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={StudentStatusFilter.ALL}>
                    All Students
                  </SelectItem>
                  <SelectItem value={StudentStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={StudentStatusFilter.INACTIVE}>
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
          <CardTitle>Students List</CardTitle>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <SortableTableHead field='name'>Name</SortableTableHead>
                <SortableTableHead field='grade'>Grade</SortableTableHead>
                <SortableTableHead field='gender'>Gender</SortableTableHead>
                <SortableTableHead field='status'>Status</SortableTableHead>
                <SortableTableHead field='attendance'>
                  Attendance
                </SortableTableHead>
                <SortableTableHead field='avgGrade'>
                  Avg. Grade
                </SortableTableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <Skeleton className='h-6 w-[100px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[60px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[80px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[70px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[60px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-[50px]' />
                    </TableCell>
                    <TableCell className='text-right'>
                      <Skeleton className='h-8 w-[60px] ml-auto' />
                    </TableCell>
                  </TableRow>
                ))
              ) : sortedStudents && sortedStudents.length ? (
                sortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className={cn('size-14')}>
                          <AvatarImage
                            src={getUrl(student.user?.photoUrl ?? '')}
                            alt={getDisplayName(student)}
                          />
                          <AvatarFallback className='text-center text-sm'>
                            {getDisplayName(student)}
                          </AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>{getDisplayName(student)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>
                      {student.gender
                        ? student.gender.charAt(0).toUpperCase() +
                          student.gender.slice(1).toLowerCase()
                        : ''}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          !student.deletedAt
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {!student.deletedAt ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell>A</TableCell>
                    <TableCell className='text-right'>
                      <div className='flex gap-2 justify-end'>
                        <Link href={`students/${student.id}`}>
                          <Button variant='default' size='sm'>
                            <Eye />
                          </Button>
                        </Link>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => handleDeleteClick(student)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No students found.
                  </TableCell>
                </TableRow>
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
                        handlePageChange(Math.min(totalPages, currentPage + 1))
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
        </CardContent>

        <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm deletion</DialogTitle>
              {selectedStudent && (
                <DialogDescription>
                  Are you sure you want to delete{' '}
                  <b>{getDisplayName(selectedStudent)}</b> student? This action
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
