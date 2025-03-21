import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';

const events = [
  { title: 'Math Quiz', date: '2025-03-20', type: 'Academic' },
  { title: 'Science Fair', date: '2025-04-05', type: 'Event' },
  { title: 'Parent-Teacher Meeting', date: '2025-03-25', type: 'Meeting' },
];

export const CalendarTab = () => {
  return (
    <TabsContent value='calendar' className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>School Calendar</CardTitle>
          <CardDescription>Upcoming events and important dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {events.map((event, index) => (
              <div
                key={index}
                className='flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0'
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
                  <CalendarIcon className='h-5 w-5 text-primary' />
                </div>
                <div className='flex-1'>
                  <p className='font-medium'>{event.title}</p>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant='outline'>{event.type}</Badge>
              </div>
            ))}
          </div>
          <div className='mt-6 border rounded-lg p-4 text-center'>
            <p className='text-muted-foreground mb-4'>
              View the full school calendar for more events and important dates
            </p>
            <Button>
              <CalendarIcon className='mr-2 h-4 w-4' />
              View Full Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
