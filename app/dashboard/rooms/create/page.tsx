'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateRoom } from '@/apis/rooms/create';
import { getError } from '@/utils/getError';
import { roomFormSchema, type RoomFormValues } from './schema';
import { defaultFormValues } from './default-values';
import { BasicInfoTab } from '@/components/rooms/create/basic-info-tab';
import { FeaturesTab } from '@/components/rooms/create/features-tab';
import { ScheduleTab } from '@/components/rooms/create/schedule-tab';
import { useToast } from '@/hooks/use-toast';
import { RoomPayload } from '@/apis/rooms/type';

export enum RoomTab {
  Basic = 'basic',
  Features = 'features',
  Schedule = 'schedule',
}

export default function CreateRoomPage() {
  const { toast } = useToast();
  const router = useRouter();
  const createRoomMutation = useCreateRoom();
  const [activeTab, setActiveTab] = useState<RoomTab>(RoomTab.Basic);

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: defaultFormValues,
  });

  const handleTabChange = (value: string) => {
    if (
      (activeTab === RoomTab.Features && value === RoomTab.Basic) ||
      (activeTab === RoomTab.Schedule &&
        (value === RoomTab.Basic || value === RoomTab.Features))
    ) {
      setActiveTab(value as RoomTab);
    }
  };

  const handleBasicNext = async () => {
    const isValid = await form.trigger('basicInfo');

    if (isValid) {
      setActiveTab(RoomTab.Features);
    }
  };

  const handleFeaturesNext = async () => {
    const isValid = await form.trigger('featuresInfo');

    if (isValid) {
      setActiveTab(RoomTab.Schedule);
    }
  };

  const handleFeaturesPrevious = () => {
    setActiveTab(RoomTab.Basic);
  };

  const handleSchedulePrevious = () => {
    setActiveTab(RoomTab.Features);
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value={RoomTab.Basic}>Basic Information</TabsTrigger>
              <TabsTrigger value={RoomTab.Features}>
                Features & Equipment
              </TabsTrigger>
              <TabsTrigger value={RoomTab.Schedule}>
                Operational Hours
              </TabsTrigger>
            </TabsList>

            <TabsContent value={RoomTab.Basic} className='space-y-4 pt-4'>
              <BasicInfoTab form={form} handleNext={handleBasicNext} />
            </TabsContent>

            <TabsContent value={RoomTab.Features} className='space-y-4 pt-4'>
              <FeaturesTab
                form={form}
                handleNext={handleFeaturesNext}
                handlePrevious={handleFeaturesPrevious}
              />
            </TabsContent>

            <TabsContent value={RoomTab.Schedule} className='space-y-4 pt-4'>
              <ScheduleTab
                form={form}
                handlePrevious={handleSchedulePrevious}
                handleSubmit={handleSubmitForm}
                isSubmitting={createRoomMutation.isPending}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
