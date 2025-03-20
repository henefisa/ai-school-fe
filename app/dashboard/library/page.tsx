'use client';

import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { BookOpenIcon, SearchIcon, BookIcon, FileTextIcon } from 'lucide-react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/auth';

// Mock data for books
const books = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Fiction',
    status: 'available',
    description:
      'A classic novel about racial injustice in the American South.',
    isbn: '978-0061120084',
    publicationDate: '1960-07-11',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Science Fiction',
    status: 'checked-out',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    isbn: '978-0451524935',
    publicationDate: '1949-06-08',
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Fiction',
    status: 'reserved',
    description: 'A novel about the American Dream in the Jazz Age.',
    isbn: '978-0743273565',
    publicationDate: '1925-04-10',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Romance',
    status: 'available',
    description: 'A romantic novel about societal expectations and marriage.',
    isbn: '978-0141439518',
    publicationDate: '1813-01-28',
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Fantasy',
    status: 'available',
    description:
      "A fantasy novel about a hobbit's journey to reclaim treasure from a dragon.",
    isbn: '978-0547928227',
    publicationDate: '1937-09-21',
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Fantasy',
    status: 'checked-out',
    description:
      'The first book in the Harry Potter series about a young wizard.',
    isbn: '978-0747532699',
    publicationDate: '1997-06-26',
  },
];

// Mock data for digital resources
const digitalResources = [
  {
    id: 1,
    title: 'Introduction to Algebra',
    author: 'Khan Academy',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Mathematics',
    type: 'Video',
    description: 'A comprehensive introduction to algebra concepts.',
  },
  {
    id: 2,
    title: 'World History: Ancient Civilizations',
    author: 'National Geographic',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'History',
    type: 'PDF',
    description:
      'An overview of ancient civilizations and their contributions.',
  },
  {
    id: 3,
    title: 'Biology: Cell Structure',
    author: 'Science Daily',
    cover: '/placeholder.svg?height=200&width=150',
    category: 'Science',
    type: 'Interactive',
    description: 'An interactive guide to cell structure and function.',
  },
];

// Categories for filtering
const categories = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Biography',
  'History',
  'Science',
  'Mathematics',
];

export default function LibraryPage() {
  const { user } = use(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('books');

  // Filter books based on search query and category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter digital resources based on search query and category
  const filteredDigitalResources = digitalResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'available':
        return <Badge className='bg-green-500'>Available</Badge>;
      case 'checked-out':
        return <Badge className='bg-red-500'>Checked Out</Badge>;
      case 'reserved':
        return <Badge className='bg-yellow-500'>Reserved</Badge>;
      default:
        return null;
    }
  };

  // Type badge component for digital resources
  const TypeBadge = ({ type }) => {
    switch (type) {
      case 'PDF':
        return <Badge className='bg-blue-500'>PDF</Badge>;
      case 'Video':
        return <Badge className='bg-purple-500'>Video</Badge>;
      case 'Interactive':
        return <Badge className='bg-orange-500'>Interactive</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Library</h1>
        <p className='text-muted-foreground'>
          Search for books, browse by category, and access digital resources.
        </p>
      </div>

      {/* Search and filter section */}
      <div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
        <div className='relative flex-1'>
          <SearchIcon className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by title, author, or ISBN...'
            className='pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex w-full space-x-2 md:w-auto'>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(user?.role === 'admin' || user?.role === 'librarian') && (
            <Button asChild>
              <Link href='/dashboard/library/manage'>Manage Library</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs for Books and Digital Resources */}
      <Tabs defaultValue='books' value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='books' className='flex items-center gap-2'>
            <BookIcon className='h-4 w-4' />
            Books
          </TabsTrigger>
          <TabsTrigger value='digital' className='flex items-center gap-2'>
            <FileTextIcon className='h-4 w-4' />
            Digital Resources
          </TabsTrigger>
          <TabsTrigger value='borrowed' className='flex items-center gap-2'>
            <BookOpenIcon className='h-4 w-4' />
            My Borrowed Items
          </TabsTrigger>
        </TabsList>

        {/* Books Tab Content */}
        <TabsContent value='books' className='space-y-6'>
          {filteredBooks.length === 0 ? (
            <div className='flex h-[400px] items-center justify-center rounded-md border border-dashed'>
              <div className='flex flex-col items-center space-y-2 text-center'>
                <BookIcon className='h-10 w-10 text-muted-foreground' />
                <h3 className='text-lg font-semibold'>No books found</h3>
                <p className='text-sm text-muted-foreground'>
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredBooks.map((book) => (
                <Card key={book.id} className='overflow-hidden'>
                  <div className='aspect-[3/4] w-full overflow-hidden'>
                    <img
                      src={book.cover || '/placeholder.svg'}
                      alt={book.title}
                      className='h-full w-full object-cover transition-all hover:scale-105'
                    />
                  </div>
                  <CardHeader className='p-4'>
                    <div className='flex justify-between'>
                      <CardTitle className='line-clamp-1 text-lg'>
                        {book.title}
                      </CardTitle>
                      <StatusBadge status={book.status} />
                    </div>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className='p-4 pt-0'>
                    <p className='line-clamp-2 text-sm text-muted-foreground'>
                      {book.description}
                    </p>
                  </CardContent>
                  <CardFooter className='p-4 pt-0'>
                    <Button asChild className='w-full'>
                      <Link href={`/dashboard/library/books/${book.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        {/* Digital Resources Tab Content */}
        <TabsContent value='digital' className='space-y-6'>
          {filteredDigitalResources.length === 0 ? (
            <div className='flex h-[400px] items-center justify-center rounded-md border border-dashed'>
              <div className='flex flex-col items-center space-y-2 text-center'>
                <FileTextIcon className='h-10 w-10 text-muted-foreground' />
                <h3 className='text-lg font-semibold'>
                  No digital resources found
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredDigitalResources.map((resource) => (
                <Card key={resource.id} className='overflow-hidden'>
                  <div className='aspect-[3/4] w-full overflow-hidden'>
                    <img
                      src={resource.cover || '/placeholder.svg'}
                      alt={resource.title}
                      className='h-full w-full object-cover transition-all hover:scale-105'
                    />
                  </div>
                  <CardHeader className='p-4'>
                    <div className='flex justify-between'>
                      <CardTitle className='line-clamp-1 text-lg'>
                        {resource.title}
                      </CardTitle>
                      <TypeBadge type={resource.type} />
                    </div>
                    <CardDescription>{resource.author}</CardDescription>
                  </CardHeader>
                  <CardContent className='p-4 pt-0'>
                    <p className='line-clamp-2 text-sm text-muted-foreground'>
                      {resource.description}
                    </p>
                  </CardContent>
                  <CardFooter className='p-4 pt-0'>
                    <Button asChild className='w-full'>
                      <Link href={`/dashboard/library/digital/${resource.id}`}>
                        Access Resource
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        {/* My Borrowed Items Tab Content */}
        <TabsContent value='borrowed' className='space-y-6'>
          <div className='rounded-md border'>
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>
                Currently Borrowed Items
              </h3>
              <p className='text-sm text-muted-foreground'>
                View and manage your currently borrowed books.
              </p>
            </div>
            <div className='border-t'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/50'>
                    <th className='p-4 text-left font-medium'>Title</th>
                    <th className='p-4 text-left font-medium'>Author</th>
                    <th className='p-4 text-left font-medium'>Borrowed Date</th>
                    <th className='p-4 text-left font-medium'>Due Date</th>
                    <th className='p-4 text-left font-medium'>Status</th>
                    <th className='p-4 text-left font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='p-4'>1984</td>
                    <td className='p-4'>George Orwell</td>
                    <td className='p-4'>2023-03-01</td>
                    <td className='p-4'>2023-03-15</td>
                    <td className='p-4'>
                      <Badge className='bg-red-500'>Overdue</Badge>
                    </td>
                    <td className='p-4'>
                      <Button size='sm' variant='outline'>
                        Renew
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>
                      Harry Potter and the Philosopher's Stone
                    </td>
                    <td className='p-4'>J.K. Rowling</td>
                    <td className='p-4'>2023-03-10</td>
                    <td className='p-4'>2023-03-24</td>
                    <td className='p-4'>
                      <Badge className='bg-yellow-500'>Due Soon</Badge>
                    </td>
                    <td className='p-4'>
                      <Button size='sm' variant='outline'>
                        Renew
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='rounded-md border'>
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>Borrowing History</h3>
              <p className='text-sm text-muted-foreground'>
                View your past borrowing history.
              </p>
            </div>
            <div className='border-t'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-muted/50'>
                    <th className='p-4 text-left font-medium'>Title</th>
                    <th className='p-4 text-left font-medium'>Author</th>
                    <th className='p-4 text-left font-medium'>Borrowed Date</th>
                    <th className='p-4 text-left font-medium'>Returned Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b'>
                    <td className='p-4'>To Kill a Mockingbird</td>
                    <td className='p-4'>Harper Lee</td>
                    <td className='p-4'>2023-02-01</td>
                    <td className='p-4'>2023-02-15</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>The Great Gatsby</td>
                    <td className='p-4'>F. Scott Fitzgerald</td>
                    <td className='p-4'>2023-01-10</td>
                    <td className='p-4'>2023-01-24</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-4'>Pride and Prejudice</td>
                    <td className='p-4'>Jane Austen</td>
                    <td className='p-4'>2022-12-05</td>
                    <td className='p-4'>2022-12-19</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
