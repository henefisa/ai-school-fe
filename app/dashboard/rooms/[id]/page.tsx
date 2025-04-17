'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  FileEdit,
  Trash2,
  Building,
  Users,
  Calendar,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { useGetRoom } from '@/apis/rooms/get-room';
import { useDeleteRoom } from '@/apis/rooms/delete';
import { RoomStatus } from '@/apis/rooms/type';
import { useToast } from '@/hooks/use-toast';
import {
  roomTypeOptions,
  statusOptions,
} from '@/components/rooms/create/basic-info-tab';
import { getError } from '@/utils/getError';

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: room, isLoading } = useGetRoom(id);
  const deleteRoom = useDeleteRoom();

  const handleDeleteRoom = async () => {
    try {
      setIsDeleting(true);
      await deleteRoom.mutateAsync(id);

      toast({
        title: 'Room deleted',
        description: `${room?.name} has been deleted successfully.`,
      });

      setIsDeleteDialogOpen(false);
      router.push('/dashboard/rooms');
    } catch (error) {
      toast({
        title: 'Error',
        description:
          getError(error) ?? 'Failed to delete room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadgeVariant = (status?: string) => {
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

  const formatTimeSlots = (timeSlots: { start: string; end: string }[]) => {
    if (!timeSlots || timeSlots.length === 0) return 'Closed';

    return timeSlots.map((slot, index) => (
      <div key={index} className='flex items-center space-x-2 text-sm'>
        <Clock className='h-4 w-4 text-muted-foreground' />
        <span>
          {slot.start} - {slot.end}
        </span>
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex items-center justify-center h-[60vh]'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className='container mx-auto py-6'>
        <div className='flex flex-col items-center justify-center h-[60vh]'>
          <h2 className='text-2xl font-bold mb-2'>Room Not Found</h2>
          <p className='text-muted-foreground mb-4'>
            The room you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href='/dashboard/rooms'>
              <ArrowLeft className='mr-2 h-4 w-4' /> Back to Rooms
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='icon' asChild>
            <Link href='/dashboard/rooms'>
              <ArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>{room.name}</h1>
            <p className='text-muted-foreground'>
              Room #{room.roomNumber}, {room.building}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' asChild>
            <Link href={`/dashboard/rooms/${id}/edit`}>
              <FileEdit className='mr-2 h-4 w-4' /> Edit Room
            </Link>
          </Button>
          <Button
            variant='destructive'
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className='mr-2 h-4 w-4' /> Delete Room
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>
              Detailed information about the room.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium'>Description</h3>
              <p className='text-muted-foreground mt-1'>{room.description}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex items-start gap-2'>
                <Building className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Building</h4>
                  <p className='text-muted-foreground'>{room.building}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Users className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Capacity</h4>
                  <p className='text-muted-foreground'>
                    {room.capacity} people
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Building className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Location</h4>
                  <p className='text-muted-foreground'>{room.location}</p>
                </div>
              </div>

              <div className='flex items-start gap-2'>
                <Calendar className='h-5 w-5 text-muted-foreground mt-0.5' />
                <div>
                  <h4 className='font-medium'>Room Type</h4>
                  <p className='text-muted-foreground'>
                    {
                      roomTypeOptions.find(
                        (option) => option.value === room.roomType
                      )?.label
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-baseline gap-2'>
              <h4 className='font-medium'>Status</h4>
              <Badge variant={getStatusBadgeVariant(room.status)}>
                {
                  statusOptions.find((option) => option.value === room.status)
                    ?.label
                }
              </Badge>
            </div>

            {room.notes && (
              <div className='flex flex-col gap-2'>
                <h4 className='font-medium'>Notes</h4>
                <p className='text-muted-foreground'>{room.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Equipment and features available in this room
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  {room.hasProjector ? (
                    <CheckCircle2 className='h-5 w-5 text-green-500' />
                  ) : (
                    <XCircle className='h-5 w-5 text-muted-foreground' />
                  )}
                  <span>Projector</span>
                </div>
                <div className='flex items-center gap-2'>
                  {room.hasWhiteboard ? (
                    <CheckCircle2 className='h-5 w-5 text-green-500' />
                  ) : (
                    <XCircle className='h-5 w-5 text-muted-foreground' />
                  )}
                  <span>Whiteboard</span>
                </div>
                <Separator />
                <h4 className='font-medium'>Additional Features</h4>
                {room.features.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {room.features.map((feature, index) => (
                      <Badge key={index} variant='outline'>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className='text-sm text-muted-foreground'>
                    No additional features
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operational Hours</CardTitle>
              <CardDescription>
                When this room is available for use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium capitalize'>Monday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.monday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Tuesday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.tuesday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Wednesday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.wednesday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Thursday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.thursday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Friday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.friday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Saturday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.saturday)}
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium capitalize'>Sunday</h4>
                    <div className='mt-1'>
                      {formatTimeSlots(room.operationalHours.sunday)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              room
              <strong> {room.name}</strong> and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRoom}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
