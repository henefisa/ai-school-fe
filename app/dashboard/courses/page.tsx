'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Loader2,
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  CourseResponse,
  CourseStatus,
  SortField,
  SortOrder,
} from '@/apis/courses/type';
import {
  CourseStatusFilter,
  useListCourses,
} from '@/apis/courses/list-courses';
import { useDeleteCourse } from '@/apis/courses/delete';
import useDebounce from '@/hooks/use-debounce';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getError } from '@/utils/getError';

export default function CoursesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>(
    CourseStatusFilter.ALL
  );
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortOrder>('ASC');

  const pageSize = 10;

  const getStatus = () => {
    return statusFilter === 'ALL' ? '' : statusFilter;
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const filter = {
    page: currentPage,
    pageSize,
    name: debouncedSearchQuery ? debouncedSearchQuery : undefined,
    status: getStatus(),
    sortBy: sortField,
    sortOrder: sortField ? sortDirection : null,
  };

  const { data, isLoading } = useListCourses(filter);

  const deleteCourse = useDeleteCourse({
    queryKey: [filter],
  });

  const totalPages = useMemo(
    () => Math.ceil((data?.count || 0) / pageSize),
    [data]
  );

  const handleDeleteClick = (course: CourseResponse) => {
    setSelectedCourse(course);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourse?.id) return;

    try {
      await deleteCourse.mutateAsync(selectedCourse.id);
      toast({
        title: 'Course Deleted',
        description: 'Course has been deleted successfully.',
      });
      setShowConfirmDelete(false);
      setSelectedCourse({} as CourseResponse);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          getError(error) ?? 'Failed to delete course. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortDirection('ASC');
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
            {sortDirection === 'ASC' ? (
              <ArrowUp className='h-4 w-4' />
            ) : (
              <ArrowDown className='h-4 w-4' />
            )}
          </span>
        )}
      </div>
    </TableHead>
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case CourseStatus.ACTIVE:
        return 'default';
      case CourseStatus.INACTIVE:
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Courses</h1>
        <Link href='/dashboard/courses/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add New Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Courses
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
                onValueChange={(value: CourseStatusFilter) =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CourseStatusFilter.ALL}>
                    All Courses
                  </SelectItem>
                  <SelectItem value={CourseStatusFilter.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={CourseStatusFilter.INACTIVE}>
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
          <CardTitle>Courses List</CardTitle>
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
                      <SortableTableHead field='name'>
                        Course Name
                      </SortableTableHead>
                      <SortableTableHead field='code'>Code</SortableTableHead>
                      <SortableTableHead field='credits'>
                        Credits
                      </SortableTableHead>
                      <SortableTableHead field='departmentId'>
                        Department
                      </SortableTableHead>
                      <SortableTableHead field='required'>
                        Required
                      </SortableTableHead>
                      <SortableTableHead field='status'>
                        Status
                      </SortableTableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!data?.results || data.results.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className='h-24 text-center'>
                          No courses found. Create your first course by clicking
                          "Add New Course".
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.results.map((course: CourseResponse) => (
                        <TableRow key={course.id}>
                          <TableCell className='font-medium'>
                            {course.name}
                          </TableCell>
                          <TableCell>{course.code}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>{course.department?.name}</TableCell>
                          <TableCell>
                            {course.required ? 'Yes' : 'No'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusBadgeVariant(course.status)}
                            >
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right flex gap-2 justify-end'>
                            {course.id ? (
                              <Link href={`courses/${course.id}`}>
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
                              onClick={() => handleDeleteClick(course)}
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
            {selectedCourse && (
              <DialogDescription>
                Are you sure you want to delete <b>{selectedCourse.name}</b>{' '}
                course? This action cannot be undone.
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
