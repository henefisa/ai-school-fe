'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeftIcon, ChevronRightIcon, PlusCircle } from 'lucide-react';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample events data
  const events = [
    {
      id: 1,
      date: '2025-03-15',
      title: 'Parent-Teacher Meeting',
      type: 'meeting',
    },
    { id: 2, date: '2025-03-18', title: 'Science Fair', type: 'event' },
    { id: 3, date: '2025-03-20', title: 'Math Exam - Grade 10', type: 'exam' },
    { id: 4, date: '2025-03-22', title: 'Sports Day', type: 'event' },
    { id: 5, date: '2025-03-25', title: 'Staff Meeting', type: 'meeting' },
    {
      id: 6,
      date: '2025-03-28',
      title: 'English Literature Exam - Grade 11',
      type: 'exam',
    },
    {
      id: 7,
      date: '2025-03-30',
      title: 'End of Month Review',
      type: 'meeting',
    },
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className='h-24 border border-muted p-1'></div>,
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter((event) => event.date === date);

      days.push(
        <div key={day} className='min-h-24 border border-muted p-1'>
          <div className='flex justify-between'>
            <span
              className={`text-sm font-medium ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : ''}`}
            >
              {day}
            </span>
          </div>
          <div className='mt-1 space-y-1'>
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`text-xs truncate rounded px-1 py-0.5 ${
                  event.type === 'meeting'
                    ? 'bg-blue-100 text-blue-800'
                    : event.type === 'exam'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                }`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Calendar</h1>
          <p className='text-muted-foreground'>
            View and manage school events, exams, and meetings.
          </p>
        </div>
        <Button className='sm:w-auto'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>{formatMonth(currentMonth)}</CardTitle>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='icon' onClick={prevMonth}>
                <ChevronLeftIcon className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='icon' onClick={nextMonth}>
                <ChevronRightIcon className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <CardDescription>
            School calendar with all scheduled events and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-7 gap-0'>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className='text-center font-medium py-2'>
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Events scheduled for the next two weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {events.map((event) => (
              <div
                key={event.id}
                className='flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0'
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-md bg-muted'>
                  <span className='text-lg font-semibold'>
                    {event.date.split('-')[2]}
                  </span>
                </div>
                <div className='space-y-1'>
                  <h4 className='text-base font-medium'>{event.title}</h4>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className='mx-2'>•</span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        event.type === 'meeting'
                          ? 'bg-blue-100 text-blue-800'
                          : event.type === 'exam'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
