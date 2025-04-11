'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { UseFormReturn } from 'react-hook-form';
import type { RoomFormValues } from '@/app/dashboard/rooms/create/schema';

interface FeaturesTabProps {
  form: UseFormReturn<RoomFormValues>;
}

export function FeaturesTab({ form }: FeaturesTabProps) {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim() !== '') {
      const currentFeatures = form.getValues('featuresInfo.features');
      form.setValue('featuresInfo.features', [
        ...currentFeatures,
        newFeature.trim(),
      ]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues('featuresInfo.features');
    form.setValue(
      'featuresInfo.features',
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Features & Equipment</CardTitle>
        <CardDescription>
          Specify the features and equipment available in this room.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='featuresInfo.hasProjector'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Projector</FormLabel>
                  <FormDescription>
                    Room has a projector installed
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='featuresInfo.hasWhiteboard'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Whiteboard</FormLabel>
                  <FormDescription>
                    Room has a whiteboard installed
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-4'>
          <FormLabel>Additional Features</FormLabel>
          <FormDescription>
            Add any additional features or equipment available in the room.
          </FormDescription>

          <div className='flex space-x-2'>
            <Input
              placeholder='Enter a feature (e.g., Smart Board)'
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <Button type='button' onClick={addFeature}>
              <Plus className='h-4 w-4 mr-2' />
              Add
            </Button>
          </div>

          <div className='space-y-2'>
            {form.watch('featuresInfo.features').length === 0 ? (
              <p className='text-sm text-muted-foreground'>
                No features added yet.
              </p>
            ) : (
              form.watch('featuresInfo.features').map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-md border px-4 py-2'
                >
                  <span>{feature}</span>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className='h-4 w-4 text-destructive' />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
