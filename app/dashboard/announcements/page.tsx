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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, BellRing, Calendar, Filter } from 'lucide-react';

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample announcements
  const announcements = [
    {
      id: 1,
      title: 'School Closure - Spring Break',
      content:
        'The school will be closed for Spring Break from April 10-17, 2025. Classes will resume on April 18, 2025. We wish all students and families a restful and enjoyable break.',
      date: '2025-03-15',
      category: 'holiday',
      priority: 'high',
    },
    {
      id: 2,
      title: 'New Library Resources Available',
      content:
        "We've added new digital resources to our library. Students can now access e-books and research materials online through the school portal. Login credentials have been sent to all students via email.",
      date: '2025-03-12',
      category: 'academic',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Sports Day Announcement',
      content:
        'Annual Sports Day will be held on April 25, 2025. All parents are invited to attend. The event will start at 9:00 AM and conclude by 3:00 PM. Students should wear their PE uniforms and bring water bottles.',
      date: '2025-03-10',
      category: 'event',
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Parent-Teacher Conference Schedule',
      content:
        'Parent-Teacher Conferences will be held on March 20-21, 2025. Please check your email for your scheduled time slot. If you need to reschedule, please contact the school office at least 48 hours in advance.',
      date: '2025-03-08',
      category: 'meeting',
      priority: 'high',
    },
    {
      id: 5,
      title: 'Curriculum Update for Grade 10',
      content:
        'There has been an update to the Grade 10 Mathematics curriculum. The new topics will be covered starting next week. Updated study materials have been uploaded to the student portal.',
      date: '2025-03-05',
      category: 'academic',
      priority: 'medium',
    },
    {
      id: 6,
      title: 'School Bus Route Changes',
      content:
        'Due to road construction, there will be changes to Bus Routes 2 and 3 starting March 18, 2025. Updated routes and schedules have been sent to affected families via email.',
      date: '2025-03-03',
      category: 'transportation',
      priority: 'high',
    },
    {
      id: 7,
      title: 'After-School Activities Registration',
      content:
        'Registration for Spring after-school activities is now open. Please register through the school portal by March 25, 2025. Activities will begin on April 1, 2025.',
      date: '2025-03-01',
      category: 'extracurricular',
      priority: 'medium',
    },
  ];

  // Sample events
  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      date: '2025-03-20',
      time: '2:00 PM - 7:00 PM',
      location: 'School Auditorium',
      category: 'meeting',
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2025-04-05',
      time: '10:00 AM - 3:00 PM',
      location: 'School Gymnasium',
      category: 'academic',
    },
    {
      id: 3,
      title: 'Sports Day',
      date: '2025-04-25',
      time: '9:00 AM - 3:00 PM',
      location: 'School Sports Field',
      category: 'event',
    },
    {
      id: 4,
      title: 'Spring Concert',
      date: '2025-04-15',
      time: '6:00 PM - 8:00 PM',
      location: 'School Auditorium',
      category: 'event',
    },
    {
      id: 5,
      title: 'Career Day',
      date: '2025-05-10',
      time: '9:00 AM - 12:00 PM',
      location: 'School Gymnasium',
      category: 'academic',
    },
  ];

  // Filter announcements based on search query and category
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter events based on search query and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'academic', name: 'Academic' },
    { id: 'event', name: 'Events' },
    { id: 'meeting', name: 'Meetings' },
    { id: 'holiday', name: 'Holidays' },
    { id: 'extracurricular', name: 'Extracurricular' },
    { id: 'transportation', name: 'Transportation' },
  ];

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Announcements</h1>
          <p className='text-muted-foreground'>
            Stay updated with the latest school news and events
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search announcements...'
            className='w-full rounded-md pl-8'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Filter className='h-4 w-4 text-muted-foreground' />
          <select
            className='rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue='announcements'>
        <TabsList>
          <TabsTrigger value='announcements'>Announcements</TabsTrigger>
          <TabsTrigger value='events'>Upcoming Events</TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value='announcements' className='space-y-4'>
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-xl'>
                      {announcement.title}
                    </CardTitle>
                    <Badge
                      variant={
                        announcement.priority === 'high'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {announcement.priority === 'high'
                        ? 'Important'
                        : 'Announcement'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Posted on {new Date(announcement.date).toLocaleDateString()}{' '}
                    •
                    {categories.find((c) => c.id === announcement.category)
                      ?.name || announcement.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground'>
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <BellRing className='h-10 w-10 text-muted-foreground mb-4' />
                <p className='text-lg font-medium'>No announcements found</p>
                <p className='text-sm text-muted-foreground'>
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value='events' className='space-y-4'>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-xl'>{event.title}</CardTitle>
                    <Badge variant='outline'>
                      {categories.find((c) => c.id === event.category)?.name ||
                        event.category}
                    </Badge>
                  </div>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString()} • {event.time} •{' '}
                    {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-5 w-5 text-muted-foreground' />
                    <span className='text-sm'>
                      {Math.ceil(
                        (new Date(event.date).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days away
                    </span>
                  </div>
                  <Button variant='outline' size='sm'>
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className='flex flex-col items-center justify-center py-10'>
                <Calendar className='h-10 w-10 text-muted-foreground mb-4' />
                <p className='text-lg font-medium'>No events found</p>
                <p className='text-sm text-muted-foreground'>
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
