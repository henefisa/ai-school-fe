'use client';

import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getError } from '@/utils/getError';
import {
  roomFormSchema,
  type RoomFormValues,
} from '@/app/dashboard/rooms/create/schema';
import { defaultFormValues } from '@/app/dashboard/rooms/create/default-values';
import { BasicInfoTab } from '@/components/rooms/create/basic-info-tab';
import { FeaturesTab } from '@/components/rooms/create/features-tab';
import { ScheduleTab } from '@/components/rooms/create/schedule-tab';
import { useGetRoom } from '@/apis/rooms/get-room';
import { useEditRoom } from '@/apis/rooms/edit';
import { ROOMS_KEYS } from '@/apis/rooms/keys';
import { useToast } from '@/hooks/use-toast';

export default function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { toast } = useToast();
  const router = useRouter();
  const { data: room, isLoading } = useGetRoom(id);
  const editRoomMutation = useEditRoom({
    queryKey: ROOMS_KEYS.getRoom(id),
  });

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (room) {
      form.reset({
        basicInfo: {
          roomNumber: room.roomNumber,
          building: room.building,
          name: room.name,
          location: room.location,
          description: room.description,
          status: room.status,
          capacity: room.capacity,
          roomType: room.roomType,
          notes: room.notes || '',
        },
        featuresInfo: {
          hasProjector: room.hasProjector,
          hasWhiteboard: room.hasWhiteboard,
          features: room.features,
        },
        operationalHours: room.operationalHours,
      });
    }
  }, [room, form]);

  const onSubmit = async (data: RoomFormValues) => {
    const { basicInfo, featuresInfo, operationalHours } = data;
    const roomData = {
      ...basicInfo,
      ...featuresInfo,
      operationalHours,
    };

    try {
      await editRoomMutation.mutateAsync({
        id: id,
        input: roomData,
      });
      toast({
        title: 'Room updated successfully',
        description: `${basicInfo.name} has been updated in the system.`,
      });

      router.push(`/dashboard/rooms/${id}`);
    } catch (error) {
      toast({
        title: 'Error updating room',
        description:
          getError(error) ||
          'There was a problem updating the room. Please try again.',
        variant: 'destructive',
      });
    }
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
        <Card>
          <CardHeader>
            <CardTitle>Room Not Found</CardTitle>
            <CardDescription>
              The room you are trying to edit does not exist or has been
              deleted.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild onClick={() => router.push('/dashboard/rooms')}>
              <div>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Rooms
              </div>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='mb-6 flex items-center'>
        <Button
          variant='outline'
          size='sm'
          className='mr-2'
          onClick={() => router.back()}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
        <h1 className='text-3xl font-bold tracking-tight'>Edit Room</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <BasicInfoTab form={form} isEdit={true} />
          <FeaturesTab form={form} />
          <ScheduleTab form={form} />
          <div className='flex justify-end'>
            <Button type='submit' disabled={editRoomMutation.isPending}>
              {editRoomMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save Room'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
