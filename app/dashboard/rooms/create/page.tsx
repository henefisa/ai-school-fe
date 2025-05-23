'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCreateRoom } from '@/apis/rooms/create';
import { getError } from '@/utils/getError';
import { roomFormSchema, type RoomFormValues } from './schema';
import { defaultFormValues } from './default-values';
import { BasicInfoTab } from '@/components/rooms/create/basic-info-tab';
import { FeaturesTab } from '@/components/rooms/create/features-tab';
import { ScheduleTab } from '@/components/rooms/create/schedule-tab';
import { useToast } from '@/hooks/use-toast';
import { RoomPayload } from '@/apis/rooms/type';

export default function CreateRoomPage() {
  const { toast } = useToast();
  const router = useRouter();
  const createRoomMutation = useCreateRoom();

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = async (data: RoomFormValues) => {
    try {
      const { basicInfo, featuresInfo, operationalHours } = data;

      const roomData: RoomPayload = {
        ...basicInfo,
        ...featuresInfo,
        operationalHours,
      };

      await createRoomMutation.mutateAsync(roomData);

      toast({
        title: 'Room created successfully',
        description: `${basicInfo.name} has been added to the system.`,
      });

      router.push('/dashboard/rooms');
    } catch (error) {
      toast({
        title: 'Error creating room',
        description:
          getError(error) ||
          'There was a problem creating the room. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitForm = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      form.handleSubmit(onSubmit)();
    }
  };

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
        <h1 className='text-3xl font-bold tracking-tight'>Create New Room</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <BasicInfoTab form={form} isEdit={false} />
          <FeaturesTab form={form} />
          <ScheduleTab form={form} />
          <div className='flex justify-end'>
            <Button type='submit' disabled={createRoomMutation.isPending}>
              {createRoomMutation.isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating...
                </>
              ) : (
                'Create Room'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
