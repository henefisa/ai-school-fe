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
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Search, Send, User, Users } from 'lucide-react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);
  const [messageText, setMessageText] = useState('');

  // Sample conversations
  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Teacher',
      avatar: '/placeholder.svg',
      lastMessage: 'Could you please send me the updated syllabus?',
      time: '10:30 AM',
      unread: true,
    },
    {
      id: 2,
      name: 'Michael & Sarah Johnson',
      role: 'Parents',
      avatar: '/placeholder.svg',
      lastMessage: "Thank you for the update on Emma's progress.",
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 3,
      name: 'David Martinez',
      role: 'Teacher',
      avatar: '/placeholder.svg',
      lastMessage: 'The staff meeting has been rescheduled to 3 PM.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: 4,
      name: 'Emma Johnson',
      role: 'Student',
      avatar: '/placeholder.svg',
      lastMessage: "I've submitted my assignment. Could you check it?",
      time: 'Mar 12',
      unread: false,
    },
    {
      id: 5,
      name: 'Grade 10A',
      role: 'Class Group',
      avatar: '/placeholder.svg',
      lastMessage: 'Reminder: Science project due next week.',
      time: 'Mar 10',
      unread: false,
    },
  ];

  // Sample messages for the selected conversation
  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      receiver: 'You',
      content: "Good morning! I hope you're doing well.",
      time: '10:15 AM',
      isMe: false,
    },
    {
      id: 2,
      sender: 'You',
      receiver: 'Sarah Johnson',
      content:
        "Good morning, Sarah! I'm doing great, thank you. How can I help you today?",
      time: '10:20 AM',
      isMe: true,
    },
    {
      id: 3,
      sender: 'Sarah Johnson',
      receiver: 'You',
      content:
        "I'm preparing for next week's classes and wanted to check if there have been any updates to the curriculum or syllabus.",
      time: '10:25 AM',
      isMe: false,
    },
    {
      id: 4,
      sender: 'Sarah Johnson',
      receiver: 'You',
      content: 'Could you please send me the updated syllabus?',
      time: '10:30 AM',
      isMe: false,
    },
  ];

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;

    // In a real application, this would add the message to the conversation
    console.log(`Sending message: ${messageText}`);
    setMessageText('');
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Messages</h1>
        <p className='text-muted-foreground'>
          Communicate with teachers, students, and parents.
        </p>
      </div>

      <Tabs defaultValue='direct' className='h-[calc(100vh-12rem)]'>
        <TabsList>
          <TabsTrigger value='direct'>Direct Messages</TabsTrigger>
          <TabsTrigger value='groups'>Group Messages</TabsTrigger>
          <TabsTrigger value='announcements'>Announcements</TabsTrigger>
        </TabsList>
        <TabsContent value='direct' className='h-full'>
          <Card className='h-full'>
            <div className='grid h-full md:grid-cols-7 lg:grid-cols-5'>
              <div className='col-span-2 lg:col-span-1 border-r'>
                <div className='p-4 border-b'>
                  <div className='relative'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='search'
                      placeholder='Search messages...'
                      className='w-full rounded-md pl-8'
                    />
                  </div>
                </div>
                <div className='overflow-y-auto h-[calc(100vh-16rem)]'>
                  {conversations
                    .filter((c) => c.role !== 'Class Group')
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${selectedConversation === conversation.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <Avatar>
                          <AvatarImage
                            src={conversation.avatar}
                            alt={conversation.name}
                          />
                          <AvatarFallback>
                            {conversation.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <p className='font-medium truncate'>
                              {conversation.name}
                            </p>
                            <span className='text-xs text-muted-foreground'>
                              {conversation.time}
                            </span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm text-muted-foreground truncate'>
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread && (
                              <Badge className='ml-2 h-2 w-2 rounded-full p-0' />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='col-span-5 lg:col-span-4 flex flex-col h-full'>
                {selectedConversation ? (
                  <>
                    <div className='p-4 border-b flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage
                            src={
                              conversations.find(
                                (c) => c.id === selectedConversation,
                              )?.avatar
                            }
                            alt={
                              conversations.find(
                                (c) => c.id === selectedConversation,
                              )?.name
                            }
                          />
                          <AvatarFallback>
                            {conversations
                              .find((c) => c.id === selectedConversation)
                              ?.name.split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>
                            {
                              conversations.find(
                                (c) => c.id === selectedConversation,
                              )?.name
                            }
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {
                              conversations.find(
                                (c) => c.id === selectedConversation,
                              )?.role
                            }
                          </p>
                        </div>
                      </div>
                      <div>
                        <Button variant='ghost' size='icon'>
                          <User className='h-5 w-5' />
                        </Button>
                      </div>
                    </div>
                    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] ${message.isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                            >
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='p-4 border-t'>
                      <div className='flex gap-2'>
                        <Textarea
                          placeholder='Type your message...'
                          className='min-h-10 resize-none'
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <div className='text-center'>
                      <h3 className='text-lg font-medium'>
                        No conversation selected
                      </h3>
                      <p className='text-muted-foreground'>
                        Select a conversation to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value='groups' className='h-full'>
          <Card className='h-full'>
            <div className='grid h-full md:grid-cols-7 lg:grid-cols-5'>
              <div className='col-span-2 lg:col-span-1 border-r'>
                <div className='p-4 border-b flex items-center justify-between'>
                  <div className='relative flex-1'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='search'
                      placeholder='Search groups...'
                      className='w-full rounded-md pl-8'
                    />
                  </div>
                  <Button variant='ghost' size='icon' className='ml-2'>
                    <Users className='h-5 w-5' />
                  </Button>
                </div>
                <div className='overflow-y-auto h-[calc(100vh-16rem)]'>
                  {conversations
                    .filter((c) => c.role === 'Class Group')
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted ${selectedConversation === conversation.id ? 'bg-muted' : ''}`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <Avatar>
                          <AvatarImage
                            src={conversation.avatar}
                            alt={conversation.name}
                          />
                          <AvatarFallback>
                            {conversation.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center justify-between'>
                            <p className='font-medium truncate'>
                              {conversation.name}
                            </p>
                            <span className='text-xs text-muted-foreground'>
                              {conversation.time}
                            </span>
                          </div>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm text-muted-foreground truncate'>
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread && (
                              <Badge className='ml-2 h-2 w-2 rounded-full p-0' />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='col-span-5 lg:col-span-4 flex flex-col h-full'>
                <div className='flex items-center justify-center h-full'>
                  <div className='text-center'>
                    <h3 className='text-lg font-medium'>Group Messages</h3>
                    <p className='text-muted-foreground'>
                      Select a group to view messages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value='announcements' className='h-full'>
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>
                Create and manage school-wide announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='border rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-medium'>End of Semester Exams</h3>
                    <Badge>Important</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mb-2'>
                    End of semester exams will begin on April 15, 2025. Please
                    ensure all coursework is submitted by April 10.
                  </p>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>Posted by: Admin</span>
                    <span>March 15, 2025</span>
                  </div>
                </div>
                <div className='border rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-medium'>Parent-Teacher Conference</h3>
                    <Badge variant='outline'>Event</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mb-2'>
                    The Parent-Teacher Conference is scheduled for March 20,
                    2025. Please check the calendar for your appointment time.
                  </p>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>Posted by: Admin</span>
                    <span>March 10, 2025</span>
                  </div>
                </div>
                <div className='border rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-medium'>Science Fair</h3>
                    <Badge variant='outline'>Event</Badge>
                  </div>
                  <p className='text-sm text-muted-foreground mb-2'>
                    The annual Science Fair will be held on April 5, 2025. All
                    students participating should submit their project proposals
                    by March 25.
                  </p>
                  <div className='flex items-center justify-between text-xs text-muted-foreground'>
                    <span>Posted by: Michael Williams</span>
                    <span>March 8, 2025</span>
                  </div>
                </div>
              </div>
              <div className='mt-6'>
                <Button>Create New Announcement</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
