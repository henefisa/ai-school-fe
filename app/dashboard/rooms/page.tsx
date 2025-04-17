'use client';

import type React from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Search,
  Loader2,
  Eye,
  Trash,
  Download,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ROOMS_KEYS } from '@/apis/rooms/keys';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { RoomResponse, RoomStatus, SortField } from '@/apis/rooms/type';
import { useListRooms } from '@/apis/rooms/list-rooms';
import { useDeleteRoom } from '@/apis/rooms/delete';
import { getError } from '@/utils/getError';
import { useToast } from '@/hooks/use-toast';
import {
  roomTypeOptions,
  statusOptions,
} from '@/components/rooms/create/basic-info-tab';
import { SortOrder } from '@/apis/courses/type';

export default function RoomsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<RoomResponse>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const pageSize = 10;

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortOrder>('ASC');

  const getStatusFilter = () => {
    if (statusFilter === 'all') return undefined;
    return statusFilter as RoomStatus;
  };

  const filter = {
    page: currentPage,
    pageSize,
    name: searchQuery,
    status: getStatusFilter(),
    sortBy: sortField,
    sortOrder: sortDirection,
  };

  const { data, isLoading } = useListRooms(filter);

  const deleteRoom = useDeleteRoom({
    queryKey: ROOMS_KEYS.listRooms(filter),
  });

  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / 10), [data]);

  const handleConfirmDelete = async () => {
    if (!selectedRoom?.id) return;
    try {
      await deleteRoom.mutateAsync(selectedRoom.id);
      toast({
        title: 'Room Deleted',
        description: 'Room has been deleted successfully.',
      });
      setShowConfirmDelete(false);
      setSelectedRoom({} as RoomResponse);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          getError(error) ?? 'Failed to delete room. Please try again.',
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
      case RoomStatus.ACTIVE:
        return 'default';
      case RoomStatus.MAINTENANCE:
        return 'secondary';
      case RoomStatus.INACTIVE:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleDeleteClick = (department: RoomResponse) => {
    setSelectedRoom(department);
    setShowConfirmDelete(true);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Rooms</h1>
        <Link href='/dashboard/rooms/create'>
          <Button>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add New Room
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rooms Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='space-y-2'>
              <label htmlFor='search' className='text-sm font-medium'>
                Search Room
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
                onValueChange={(value: RoomStatus) => setStatusFilter(value)}
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Rooms</SelectItem>
                  <SelectItem value={RoomStatus.ACTIVE}>Active</SelectItem>
                  <SelectItem value={RoomStatus.MAINTENANCE}>
                    Maintenance
                  </SelectItem>
                  <SelectItem value={RoomStatus.INACTIVE}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Rooms List</CardTitle>
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
                      <SortableTableHead field='name'>Room</SortableTableHead>
                      <SortableTableHead field='building'>
                        Building
                      </SortableTableHead>
                      <SortableTableHead field='roomType'>
                        Type
                      </SortableTableHead>
                      <SortableTableHead field='capacity'>
                        Capacity
                      </SortableTableHead>
                      <TableHead>Features</TableHead>
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
                          No rooms found. Create your first room by clicking
                          "Add New Room".
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.results.map((room: RoomResponse) => (
                        <TableRow key={room.id}>
                          <TableCell>
                            <div className='flex flex-col'>
                              <span className='font-medium'>{room.name}</span>
                              <span className='text-sm text-muted-foreground'>
                                #{room.roomNumber}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{room.building}</TableCell>
                          <TableCell>
                            {
                              roomTypeOptions.find(
                                (option) => option.value === room.roomType
                              )?.label
                            }
                          </TableCell>
                          <TableCell>{room.capacity}</TableCell>
                          <TableCell>
                            <div className='flex flex-wrap gap-1'>
                              {room.hasProjector && (
                                <Badge variant='outline'>Projector</Badge>
                              )}
                              {room.hasWhiteboard && (
                                <Badge variant='outline'>Whiteboard</Badge>
                              )}
                              {room.features.slice(0, 2).map((feature, i) => (
                                <Badge key={i} variant='outline'>
                                  {feature}
                                </Badge>
                              ))}
                              {room.features.length > 2 && (
                                <Badge variant='outline'>
                                  +{room.features.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(room.status)}>
                              {
                                statusOptions.find(
                                  (option) => option.value === room.status
                                )?.label
                              }
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right'>
                            <div className='flex gap-2'>
                              <Link href={`rooms/${room.id}`}>
                                <Button variant='default' size='sm'>
                                  <Eye />
                                </Button>
                              </Link>
                              <Button
                                variant='destructive'
                                size='sm'
                                onClick={() => handleDeleteClick(room)}
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
            {selectedRoom && (
              <DialogDescription>
                Are you sure you want to delete <b>{selectedRoom.name}</b> room?
                This action cannot be undone.
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
